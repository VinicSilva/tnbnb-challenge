<?php

namespace App\Observers;

use App\Http\Services\BalanceService;
use App\Http\Services\TransactionService;
use App\Models\Purchases;
use App\Models\Transactions;
use Exception;
use Illuminate\Support\Facades\Log;

class PurchaseObserver
{
    protected BalanceService $balanceService;
    protected TransactionService $transactionService;

    public function __construct(BalanceService $balanceService, TransactionService $transactionService)
    {
        $this->balanceService = $balanceService;
        $this->transactionService = $transactionService;
    }
    
    /**
     * Handle the Purchases "created" event.
     *
     * @param  \App\Models\Purchases  $purchases
     * @return void
     */
    public function created(Purchases $purchases)
    {
        try {
            $this->balanceService->changeExpenseValue($purchases->user_id, $purchases->value);
            $this->transactionService->register($purchases->user_id, $purchases->value, Transactions::EXPENSE, null, $purchases->id);
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }

    /**
     * Handle the Purchases "updated" event.
     *
     * @param  \App\Models\Purchases  $purchases
     * @return void
     */
    public function updated(Purchases $purchases)
    {
        //
    }

    /**
     * Handle the Purchases "deleted" event.
     *
     * @param  \App\Models\Purchases  $purchases
     * @return void
     */
    public function deleted(Purchases $purchases)
    {
        //
    }

    /**
     * Handle the Purchases "restored" event.
     *
     * @param  \App\Models\Purchases  $purchases
     * @return void
     */
    public function restored(Purchases $purchases)
    {
        //
    }

    /**
     * Handle the Purchases "force deleted" event.
     *
     * @param  \App\Models\Purchases  $purchases
     * @return void
     */
    public function forceDeleted(Purchases $purchases)
    {
        //
    }
}
