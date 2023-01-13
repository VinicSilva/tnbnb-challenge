<?php

namespace App\Http\Services;

use App\Models\Transaction;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionService {

    public function getByUser(int $userId = null) {
        try {
            $transactionUserId = $userId ?? auth('api')->user()->id;
            $transactions = Transaction::with('user', 'purchase', 'bank_check')->where('user_id', $transactionUserId)->orderBy('created_at', 'desc')->paginate();
            return $transactions;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return [];
        }
    }

    public function register(int $userId, int $value, string $type, $bank_check_id = null, $purchase_id = null) {
        try {
            DB::beginTransaction();
            Transaction::create([
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