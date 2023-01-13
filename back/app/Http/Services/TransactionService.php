<?php

namespace App\Http\Services;

use App\Repositories\Contracts\TransactionRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionService {

    protected TransactionRepositoryInterface $transactionRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function getByUser(int $userId = null) {
        try {
            $transactionUserId = $userId ?? auth('api')->user()->id;
            $transactions = $this->transactionRepository->findByUserId($transactionUserId);
            return $transactions;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return [];
        }
    }

    public function register(int $userId, int $value, string $type, $bank_check_id = null, $purchase_id = null) {
        try {
            DB::beginTransaction();
            $this->transactionRepository->store([
                'value' => $value,
                'type' => $type,
                'bank_check_id' => $bank_check_id,
                'purchase_id' => $purchase_id,
                'user_id' => $userId,
            ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }
    }
}