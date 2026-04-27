<?php

use App\Http\Controllers\Finance\Expense\ExpenseController;
use App\Http\Controllers\Finance\Expense\RecurringExpenseController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\DemoController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/demo', [DemoController::class, 'create']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::prefix('/user')->group(function() {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/profile', [AuthController::class, 'getProfile']);
        });

        Route::apiResource('/expenses', ExpenseController::class);
        Route::put('/expenses/update-installment/{expenseInstallment}', [ExpenseController::class, 'updateInstallment']);

        Route::apiResource('/recurring-expenses', RecurringExpenseController::class);
        Route::post('/recurring-expenses/{recurringExpense}/entries/create', [RecurringExpenseController::class, 'createEntry']);

        Route::prefix('/transactions')->controller(TransactionController::class)->group(function() {
            Route::get('/', 'index');
            Route::get('/history', 'transactionHistory');
            Route::post('/', 'store');
            Route::get('/{transaction}', 'show');
            Route::put('/{transaction}', 'update');
            Route::delete('/{transaction}', 'destroy');
        });
    });
});
