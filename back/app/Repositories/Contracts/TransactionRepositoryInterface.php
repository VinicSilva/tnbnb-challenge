<?php

namespace App\Repositories\Contracts;

interface TransactionRepositoryInterface
{
	public function findByUserId(int $userId);
    public function store(array $transaction);
}