<?php

namespace App\Http\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserService {

    public function register(array $requestUser) {
        try {
            DB::beginTransaction();
            $user = User::create($requestUser);
            DB::commit();
            return response()->json([
                'message' => 'success_register_user',
                'user' => $user
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'error_register_user'
            ], 400);
        }
    }
}