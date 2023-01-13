<?php

namespace App\Repositories;

use App\Models\Balance;
use App\Repositories\Contracts\BalanceRepositoryInterface;

class BalanceRepositoryEloquent implements BalanceRepositoryInterface
{
	private $model;

	public function __construct(Balance $model)
	{
		$this->model = $model;
	} 

    public function findByUserId(int $userId)
	{
		return $this->model->with('user')->where('user_id', $userId)->first();
	}   

    public function store(array $balance)
	{
		return $this->model->create($balance);
	}   

    public function update(Balance $balance, array $balanceData)
	{
        return $balance->update($balanceData);
	}   
}
