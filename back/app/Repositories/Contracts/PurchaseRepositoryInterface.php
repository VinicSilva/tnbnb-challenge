<?php

namespace App\Repositories\Contracts;

interface PurchaseRepositoryInterface
{
	public function findByUserId(int $userId);
    public function store(array $purchase);
}