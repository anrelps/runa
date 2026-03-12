<?php

use App\Http\Controllers\Finance\Expense\ExpenseController;
use App\Http\Controllers\Finance\Expense\RecurringExpenseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\AuthController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::prefix('/user')->group(function() {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/profile', [AuthController::class, 'getProfile']);
        });

        Route::apiResource('/expenses', ExpenseController::class);

        Route::prefix('/recurring-expenses')->group(function() {
            Route::apiResource('/', RecurringExpenseController::class);
            Route::post('/{recurringExpense}/entries/create', [RecurringExpenseController::class, 'createEntry']);
        });
    });
});
