<?php

namespace App\Http\Services;

use App\Models\Balance;
use App\Repositories\Contracts\BalanceRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BalanceService {

    protected BalanceRepositoryInterface $balanceRepository;

    public function __construct(BalanceRepositoryInterface $balanceRepository)
    {
        $this->balanceRepository = $balanceRepository;
    }

    public function get(int $userId = null) {
        try {
            $balanceUserId = $userId ?? auth('api')->user()->id;
            $balance = $this->balanceRepository->findByUserId($balanceUserId);
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
            $this->balanceRepository->store(['user_id' => $balanceUserId]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }
    }

    public function changeIncomeValue(int $userId, int $incomeValue) {
        try {
            DB::beginTransaction();
            $findBalance = $this->balanceRepository->findByUserId($userId);
            if (!$findBalance) {
                return response()->json([
                    'message' => 'balance_not_found'
                ], 404);
            }
            $incomeValue = $incomeValue + $findBalance->income_value; 
            $this->balanceRepository->update($findBalance, ['income_value' => $incomeValue]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }
    }

    public function changeExpenseValue(int $userId, int $expenseValue) {
        try {
            DB::beginTransaction();
            $findBalance = $this->balanceRepository->findByUserId($userId);
            if (!$findBalance) {
                return response()->json([
                    'message' => 'balance_not_found'
                ], 404);
            }
            $expenseValue = $expenseValue + $findBalance->expense_value; 
            $this->balanceRepository->update($findBalance, ['expense_value' => $expenseValue]);
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