<?php

namespace App\Repositories\Contracts;

use App\Models\BankCheck;

interface BankCheckRepositoryInterface
{
    public function findOne(int $id);
	public function findByUserAndStatus(string $status, int $userId = null);
    public function store(array $bankCheck);
    public function update(BankCheck $bankCheck, array $bankCheckData);
}