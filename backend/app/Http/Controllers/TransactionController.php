<?php

namespace App\Http\Controllers;

use App\Domain\Finance\Transaction\DTOs\CreateTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\IndexTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\TransactionHistoryDTO;
use App\Domain\Finance\Transaction\Models\Transaction;
use App\Domain\Finance\Transaction\Services\TransactionService;
use App\Http\Controllers\Controller;
use App\Http\Resources\Finance\Transaction\TransactionResource;
use App\Traits\Api\ApiResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    use ApiResponse, AuthorizesRequests;

    public function __construct(
        private TransactionService $transactionService,
    ) {}

    public function index(Request $request) {
        $input = $request->validate([
            'type' => 'nullable|string|in:income,expense',
            'min_amount' => 'nullable|numeric',
            'max_amount' => 'nullable|numeric',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date',
            'per_page' => 'nullable|integer|min:1|max:500',
        ]);
        $result = $this->transactionService->index(
            IndexTransactionDTO::fromRequest($input),
        );
        return $this->successResponse(TransactionResource::collection($result), 200);
    }

    public function transactionHistory(Request $request) {
        $input = $request->validate([
            'type' => 'nullable|string|in:income,expense',
            'min_amount' => 'nullable|numeric',
            'max_amount' => 'nullable|numeric',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date',
        ]);
        $result = $this->transactionService->transactionHistory(
            TransactionHistoryDTO::fromRequest($input),
        );
        return $this->successResponse([
            'total_income' => $result->totalIncome,
            'total_expense' => $result->totalExpense,
            'balance' => $result->getBalance(),
            'formatted_balance' => $result->getFormattedBalance(),
        ], 200);
    }

    public function store(Request $request) {
        $input = $request->validate([
            'type' => 'required|string|in:income,expense',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'required|string|max:255',
            'category' => 'required|string|in:Moradia,Alimentação,Transporte,Compras,Lazer,Saúde,Educação,Negócios,Finanças,Outros',
            'date' => 'required|date',
            'transactionable_type' => [
                'nullable',
                'string',
                'in:App\Domain\Finance\Expense\Models\ExpenseInstallment,App\Domain\Finance\RecurringExpense\Models\RecurringExpenseEntry',
            ],
            'transactionable_id' => 'nullable|numeric|required_with:transactionable_type',
        ]);
        $result = $this->transactionService->create(
            new CreateTransactionDTO(
                $input['type'],
                $input['amount'],
                $input['description'],
                $input['category'],
                $input['date'],
                $input['transactionable_type'] ?? null,
                $input['transactionable_id'] ?? null,
            ),
        );
        return $this->successResponse(new TransactionResource($result), 201);
    }

    public function show(Transaction $transaction) {
        $this->authorize('view', $transaction);
        return $this->successResponse(new TransactionResource($transaction), 200);
    }

    public function update(Request $request, Transaction $transaction) {
        $this->authorize('update', $transaction);
        $input = $request->validate([
            'amount' => 'nullable|numeric',
            'description' => 'nullable|string',
            'date' => 'nullable|string',
        ]);
        $result = $this->transactionService->update($transaction, $input);
        return $this->successResponse(new TransactionResource($result), 200);
    }

    public function destroy(Transaction $transaction) {
        $this->authorize('delete', $transaction);
        $this->transactionService->delete($transaction);
        return $this->successResponse(null, 204);
    }
}
