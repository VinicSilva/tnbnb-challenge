<?php

namespace App\Http\Services;

use App\Models\Checks;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChecksService {

    public function get(string $status, int $userId = null) {
        try {
            $checks = Checks::with('user')->where('status', $status);
            if ($userId) {
                $checks = $checks->where('user_id', $userId);
            }
            return $checks->orderBy('created_at', 'desc')->paginate();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return [];
        }
    }

    public function changeStatus(int $checkId, string $status) {
        try {
            DB::beginTransaction();
            $findCheck = Checks::find($checkId);
            if (!$findCheck) {
                return response()->json([
                    'message' => 'check_not_found'
                ], 404);
            }
            $findCheck->update(['status' => $status]);
            DB::commit();
            return response()->json([
                'message' => 'success_update_check_status'
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'error_update_check_status'
            ], 500);
        }
    }

    public function register(array $check) {
        try {
            DB::beginTransaction();
            $check['value'] = formatPriceToSaveInDb($check['value']);
            Checks::create($check);
            DB::commit();
            return response()->json([
                'message' => 'success_register_check'
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'error_register_check'
            ], 500);
        }
    }
}