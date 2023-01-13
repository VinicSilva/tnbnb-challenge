<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\BankCheckService;
use App\Models\BankCheck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BankCheckController extends Controller
{
    protected BankCheckService $bankCheckService;

    public function __construct(BankCheckService $bankCheckService)
    {
        $this->bankCheckService = $bankCheckService;
    }

    public function getByUser(Request $request) {
        $status = $request->query('status');
        $userId = auth('api')->user()->id ?? null;
    	return $this->bankCheckService->get($status, $userId);
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'value' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,jpg,png',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'invalid_fields_register_check',
                'error' => $validator->errors()->toJson()
            ], 400);
        }

        $image = $request->file('image')->store('image', 'public');
        $bankCheckData = array_merge(
            $validator->validated(),
            [
                'image' => $image,
                'user_id' => auth('api')->user()->id,
                'status' => BankCheck::PENDING
            ]
        );
    	return $this->bankCheckService->register($bankCheckData);
    }
}
