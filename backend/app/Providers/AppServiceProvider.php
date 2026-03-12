<?php

namespace App\Providers;

use App\Domain\Finance\Expense\Repositories\Contracts\ExpenseRepositoryInterface;
use App\Domain\Finance\Expense\Repositories\Eloquent\ExpenseRepository;
use App\Domain\Finance\RecurringExpense\Repositories\Contracts\RecurringExpenseRepositoryInterface;
use App\Domain\Finance\RecurringExpense\Repositories\Eloquent\RecurringExpenseRepository;
use App\Domain\User\Repositories\Contracts\UserRepositoryInterface;
use App\Domain\User\Repositories\Eloquent\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(ExpenseRepositoryInterface::class, ExpenseRepository::class);
        $this->app->bind(RecurringExpenseRepositoryInterface::class, RecurringExpenseRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
