<?php

namespace App\Repositories;

use App\Models\Purchase;
use App\Repositories\Contracts\PurchaseRepositoryInterface;

class PurchaseRepositoryEloquent implements PurchaseRepositoryInterface
{
	private $model;

	public function __construct(Purchase $model)
	{
		$this->model = $model;
	} 

    public function store(array $purchase)
	{
		return $this->model->create($purchase);
	} 
    
    public function findByUserId(int $userId)
	{
		return $this->model->with('user')->where('user_id', $userId)->orderBy('created_at', 'desc')->paginate();
	} 
}
