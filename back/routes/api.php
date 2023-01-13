<?php

use App\Http\Controllers\Api\Admin\AdminBankCheckController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BalanceController;
use App\Http\Controllers\Api\BankCheckController;
use App\Http\Controllers\Api\PurchaseController;
use App\Http\Controllers\Api\TransactionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group([
    'middleware' => ['api.jwt'],
], function () {
    Route::group([
        'middleware' => ['api.rule.admin'],
        'prefix' => 'admin/bank_checks'
    ], function () {
        Route::get('/', [AdminBankCheckController::class, 'getPendings']);
        Route::put('change/status/{id}', [AdminBankCheckController::class, 'changeStatus']);
    });

    Route::group([
        'middleware' => ['api.rule.customer'],
    ], function () {
        Route::get('balance', [BalanceController::class, 'get']);
        Route::get('transactions', [TransactionController::class, 'getByUser']);
        Route::get('purchases', [PurchaseController::class, 'getByUser']);
        Route::post('purchase', [PurchaseController::class, 'register']);
        Route::get('bank_checks', [BankCheckController::class, 'getByUser']); 
        Route::post('bank_check', [BankCheckController::class, 'register']);        
    });

    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'userProfile']);    
});