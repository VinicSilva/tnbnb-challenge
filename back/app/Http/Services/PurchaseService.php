<?php

namespace App\Http\Services;

use App\Models\Purchases;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PurchaseService {

    public function getByUser(int $userId = null) {
        try {
            $purchaseUserId = $userId ?? auth('api')->user()->id;
            $purchases = Purchases::with('user')->where('user_id', $purchaseUserId)->paginate();
            return $purchases;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return [];
        }
    }

    public function register(array $purchase) {
        try {
            DB::beginTransaction();
            $purchase['value'] = formatPriceToSaveInDb($purchase['value']);
            Purchases::create($purchase);
            DB::commit();
            return response()->json([
                'message' => 'success_register_purchase'
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'error_register_purchase'
            ], 500);
        }
    }
}