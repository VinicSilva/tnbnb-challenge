<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Repositories\Contracts\UserRepositoryInterface', 
            'App\Repositories\UserRepositoryEloquent'
        );
        $this->app->bind(
            'App\Repositories\Contracts\BalanceRepositoryInterface', 
            'App\Repositories\BalanceRepositoryEloquent'
        );
        $this->app->bind(
            'App\Repositories\Contracts\TransactionRepositoryInterface', 
            'App\Repositories\TransactionRepositoryEloquent'
        );
        $this->app->bind(
            'App\Repositories\Contracts\PurchaseRepositoryInterface', 
            'App\Repositories\PurchaseRepositoryEloquent'
        );
        $this->app->bind(
            'App\Repositories\Contracts\BankCheckRepositoryInterface', 
            'App\Repositories\BankCheckRepositoryEloquent'
        );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
