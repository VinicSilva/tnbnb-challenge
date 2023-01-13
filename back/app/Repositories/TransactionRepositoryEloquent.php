<?php

namespace App\Repositories;

use App\Models\Transaction;
use App\Repositories\Contracts\TransactionRepositoryInterface;

class TransactionRepositoryEloquent implements TransactionRepositoryInterface
{
	private $model;

	public function __construct(Transaction $model)
	{
		$this->model = $model;
	} 

    public function store(array $transaction)
	{
		return $this->model->create($transaction);
	} 
    
    public function findByUserId(int $userId)
	{
		return $this->model->with('user', 'purchase', 'bank_check')->where('user_id', $userId)->orderBy('created_at', 'desc')->paginate();
	} 
}
