<?php

namespace App\Http\Services;

use App\Models\Purchase;
use App\Repositories\Contracts\PurchaseRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PurchaseService {

    protected PurchaseRepositoryInterface $purchaseRepository;

    public function __construct(PurchaseRepositoryInterface $purchaseRepository)
    {
        $this->purchaseRepository = $purchaseRepository;
    }

    public function getByUser(int $userId = null) {
        try {
            $purchaseUserId = $userId ?? auth('api')->user()->id;
            $purchases = $this->purchaseRepository->findByUserId($purchaseUserId);
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
            $this->purchaseRepository->store($purchase);
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