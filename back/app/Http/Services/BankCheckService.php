<?php

namespace App\Http\Services;

use App\Models\BankCheck;
use App\Repositories\Contracts\BankCheckRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BankCheckService {

    protected BankCheckRepositoryInterface $bankCheckRepository;

    public function __construct(BankCheckRepositoryInterface $bankCheckRepository)
    {
        $this->bankCheckRepository = $bankCheckRepository;
    }

    public function get(string $status, int $userId = null) {
        try {
            $bankChecks = BankCheck::with('user')->where('status', $status);
            if ($userId) {
                $bankChecks = $bankChecks->where('user_id', $userId);
            }
            return $bankChecks->orderBy('created_at', 'desc')->paginate();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return [];
        }
    }

    public function changeStatus(int $bankCheckId, string $status) {
        try {
            DB::beginTransaction();
            $findBankCheck = $this->bankCheckRepository->findOne($bankCheckId);
            if (!$findBankCheck) {
                return response()->json([
                    'message' => 'bank_check_not_found'
                ], 404);
            }
            $this->bankCheckRepository->update($findBankCheck, ['status' => $status]);
            DB::commit();
            return response()->json([
                'message' => 'success_update_bank_check_status'
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'error_update_bank_check_status'
            ], 500);
        }
    }

    public function register(array $bankCheck) {
        try {
            DB::beginTransaction();
            $bankCheck['value'] = formatPriceToSaveInDb($bankCheck['value']);
            $this->bankCheckRepository->store($bankCheck);
            DB::commit();
            return response()->json([
                'message' => 'success_register_bank_check'
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'error_register_bank_check'
            ], 500);
        }
    }
}