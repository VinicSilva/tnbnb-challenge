<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\BankCheckService;
use App\Models\BankCheck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminBankCheckController extends Controller
{
    protected BankCheckService $bankCheckService;

    public function __construct(BankCheckService $bankCheckService)
    {
        $this->bankCheckService = $bankCheckService;
    }

    public function getPendings() {
        $status = BankCheck::PENDING;
    	return $this->bankCheckService->get($status);
    }

    public function changeStatus(int $bankCheckId, Request $request) {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:accepted,rejected',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'invalid_fields_change_bank_check_status',
                'error' => $validator->errors()->toJson()
            ], 400);
        }
        $status = $validator->validated()['status'];
    	return $this->bankCheckService->changeStatus($bankCheckId, $status);
    }
}
