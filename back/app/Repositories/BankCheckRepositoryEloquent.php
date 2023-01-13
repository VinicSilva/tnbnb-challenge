<?php

namespace App\Repositories;

use App\Models\BankCheck;
use App\Repositories\Contracts\BankCheckRepositoryInterface;

class BankCheckRepositoryEloquent implements BankCheckRepositoryInterface
{
	private $model;

	public function __construct(BankCheck $model)
	{
		$this->model = $model;
	} 

    public function findByUserAndStatus(string $status, int $userId = null)
	{
		$checkModel = $this->model->with('user')->where('status', $status);
		if ($checkModel) {
			$checkModel = $checkModel->where('user_id', $userId);
		}
		return $this->model->orderBy('created_at', 'desc')->paginate();
	}   

	public function findOne(int $id)
	{
		return $this->model->find($id);
	} 

    public function store(array $bankCheck)
	{
		return $this->model->create($bankCheck);
	}   

    public function update(BankCheck $bankCheck, array $bankCheckData)
	{
        return $bankCheck->update($bankCheckData);
	}   
}
