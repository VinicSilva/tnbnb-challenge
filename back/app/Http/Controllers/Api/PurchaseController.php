<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\PurchaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PurchaseController extends Controller
{
    protected PurchaseService $purchaseService;

    public function __construct(PurchaseService $purchaseService)
    {
        $this->purchaseService = $purchaseService;
    }

    public function getByUser() {
    	return $this->purchaseService->getByUser();
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'value' => 'required|string',
            'description' => 'required|string',
            'purchase_date' => 'required|date',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'invalid_fields_register_purchase',
                'error' => $validator->errors()->toJson()
            ], 400);
        }
        $purchaseData = array_merge(
            $validator->validated(),
            ['user_id' => auth('api')->user()->id]
        );
    	return $this->purchaseService->register($purchaseData);
    }
}
