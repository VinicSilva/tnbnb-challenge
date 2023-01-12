<?php

namespace App\Observers;

use App\Http\Services\BalanceService;
use App\Http\Services\TransactionService;
use App\Models\Checks;
use App\Models\Transactions;
use Exception;
use Illuminate\Support\Facades\Log;

class CheckObserver
{
    protected BalanceService $balanceService;
    protected TransactionService $transactionService;

    public function __construct(BalanceService $balanceService, TransactionService $transactionService)
    {
        $this->balanceService = $balanceService;
        $this->transactionService = $transactionService;
    }

    /**
     * Handle the Checks "created" event.
     *
     * @param  \App\Models\Checks  $checks
     * @return void
     */
    public function created(Checks $checks)
    {
        Log::info('cuida');
    }

    /**
     * Handle the Checks "updated" event.
     *
     * @param  \App\Models\Checks  $checks
     * @return void
     */
    public function updated(Checks $checks)
    {
        Log::info('UPDATED');
        if ($checks->status === Checks::ACCEPTED) {
            try {
                $this->balanceService->changeIncomeValue($checks->user_id, $checks->value);
                $this->transactionService->register($checks->user_id, $checks->value, Transactions::INCOME, $checks->id);
            } catch (Exception $e) {
                Log::error($e->getMessage());
            }
        }
    }

    /**
     * Handle the Checks "deleted" event.
     *
     * @param  \App\Models\Checks  $checks
     * @return void
     */
    public function deleted(Checks $checks)
    {
        //
    }

    /**
     * Handle the Checks "restored" event.
     *
     * @param  \App\Models\Checks  $checks
     * @return void
     */
    public function restored(Checks $checks)
    {
        //
    }

    /**
     * Handle the Checks "force deleted" event.
     *
     * @param  \App\Models\Checks  $checks
     * @return void
     */
    public function forceDeleted(Checks $checks)
    {
        //
    }
}
