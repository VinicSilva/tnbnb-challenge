<?php

namespace App\Http\Services;

use App\Models\Balance;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BalanceService {

    public function get(int $userId = null) {
        try {
            $balanceUserId = $userId ?? auth('api')->user()->id;
            $balance = Balance::with('user')->where('user_id', $balanceUserId)->first();
            return $this->formatUserBalance($balance);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return [];
        }
    }

    public function register(int $userId = null) {
        try {
            DB::beginTransaction();
            $balanceUserId = $userId ?? auth('api')->user()->id;
            Balance::create([
                'income_value' => 0,
                'expense_value' => 0,
                'user_id' => $balanceUserId,
            ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }
    }

    public function changeIncomeValue(int $userId, int $incomeValue) {
        try {
            DB::beginTransaction();
            Balance::where('user_id', $userId)->update(['income_value' => $incomeValue]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }
    }

    public function changeExpenseValue(int $userId, int $expenseValue) {
        try {
            DB::beginTransaction();
            Balance::where('user_id', $userId)->update(['expense_value' => $expenseValue]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }
    }

    private function formatUserBalance(Balance $balance) {
        $balance->balance = $balance->income_value - $balance->expense_value;
        return $balance;
    }
}