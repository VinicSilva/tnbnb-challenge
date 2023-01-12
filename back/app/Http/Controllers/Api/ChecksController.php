<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\ChecksService;
use App\Models\Checks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChecksController extends Controller
{
    protected ChecksService $checksService;

    public function __construct(ChecksService $checksService)
    {
        $this->checksService = $checksService;
    }

    public function getByUser(Request $request) {
        $status = $request->query('status');
        $userId = auth('api')->user()->id ?? null;
    	return $this->checksService->get($status, $userId);
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
        $checkData = array_merge(
            $validator->validated(),
            [
                'image' => $image,
                'user_id' => auth('api')->user()->id,
                'status' => Checks::PENDING
            ]
        );
    	return $this->checksService->register($checkData);
    }
}
