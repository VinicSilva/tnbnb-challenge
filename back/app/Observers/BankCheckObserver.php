<?php

namespace App\Observers;

use App\Http\Services\BalanceService;
use App\Http\Services\TransactionService;
use App\Models\BankCheck;
use App\Models\Transaction;
use Exception;
use Illuminate\Support\Facades\Log;

class BankCheckObserver
{
    protected BalanceService $balanceService;
    protected TransactionService $transactionService;

    public function __construct(BalanceService $balanceService, TransactionService $transactionService)
    {
        $this->balanceService = $balanceService;
        $this->transactionService = $transactionService;
    }

    /**
     * Handle the BankCheck "created" event.
     *
     * @param  \App\Models\BankCheck  $bankCheck
     * @return void
     */
    public function created(BankCheck $bankCheck)
    {
        //
    }

    /**
     * Handle the BankCheck "updated" event.
     *
     * @param  \App\Models\BankCheck  $bankCheck
     * @return void
     */
    public function updated(BankCheck $bankCheck)
    {
        if ($bankCheck->status === BankCheck::ACCEPTED) {
            try {
                $this->balanceService->changeIncomeValue($bankCheck->user_id, $bankCheck->value);
                $this->transactionService->register($bankCheck->user_id, $bankCheck->value, Transaction::INCOME, $bankCheck->id);
            } catch (Exception $e) {
                Log::error($e->getMessage());
            }
        }
    }

    /**
     * Handle the BankCheck "deleted" event.
     *
     * @param  \App\Models\BankCheck  $bankCheck
     * @return void
     */
    public function deleted(BankCheck $bankCheck)
    {
        //
    }

    /**
     * Handle the BankCheck "restored" event.
     *
     * @param  \App\Models\BankCheck  $bankCheck
     * @return void
     */
    public function restored(BankCheck $bankCheck)
    {
        //
    }

    /**
     * Handle the BankCheck "force deleted" event.
     *
     * @param  \App\Models\BankCheck  $bankCheck
     * @return void
     */
    public function forceDeleted(BankCheck $bankCheck)
    {
        //
    }
}
