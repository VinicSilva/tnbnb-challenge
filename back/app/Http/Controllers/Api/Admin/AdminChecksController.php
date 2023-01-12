<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\ChecksService;
use App\Models\Checks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminChecksController extends Controller
{
    protected ChecksService $checksService;

    public function __construct(ChecksService $checksService)
    {
        $this->checksService = $checksService;
    }

    public function getPendings() {
        $status = Checks::PENDING;
    	return $this->checksService->get($status);
    }

    public function changeStatus(int $checkId, Request $request) {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:accepted,rejected',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'invalid_fields_change_check_status',
                'error' => $validator->errors()->toJson()
            ], 400);
        }
        $status = $validator->validated()['status'];
    	return $this->checksService->changeStatus($checkId, $status);
    }
}
