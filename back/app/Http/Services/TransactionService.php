<?php

namespace App\Http\Services;

use App\Models\Transactions;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionService {

    public function getByUser(int $userId = null) {
        try {
            $transactionUserId = $userId ?? auth('api')->user()->id;
            $transactions = Transactions::with('user', 'purchase', 'check')->where('user_id', $transactionUserId)->paginate();
            return $transactions;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return [];
        }
    }

    public function register(int $userId, int $value, string $type, $check_id = null, $purchase_id = null) {
        try {
            DB::beginTransaction();
            Transactions::create([
                'value' => $value,
                'type' => $type,
                'check_id' => $check_id,
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