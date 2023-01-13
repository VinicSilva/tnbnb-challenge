<?php

namespace App\Http\Services;

use App\Repositories\Contracts\UserRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserService {

    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(array $requestUser) {
        try {
            DB::beginTransaction();
            $user = $this->userRepository->store($requestUser);
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