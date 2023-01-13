<?php

namespace App\Repositories\Contracts;

use App\Models\Balance;

interface BalanceRepositoryInterface
{
	public function findByUserId(int $userId);
    public function store(array $balance);
    public function update(Balance $balance, array $balanceData);
}