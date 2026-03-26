<?php

namespace App\Http\Controllers\Finance\Transaction;

use App\Domain\Finance\Transaction\DTOs\CreateTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\IndexTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\TransactionHistoryDTO;
use App\Domain\Finance\Transaction\Services\TransactionService;
use App\Http\Controllers\Controller;
use App\Http\Resources\Finance\Transaction\TransactionResource;
use App\Traits\Api\ApiResponse;
use Exception;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    use ApiResponse;

    public function __construct(
        private TransactionService $transactionService,
    ) {}

    public function index(Request $request) {
        try {
            $input = $request->validate([
                'type' => 'nullable|string',
                'min_amount' => 'nullable|numeric',
                'max_amount' => 'nullable|numeric',
                'from_date' => 'nullable|date',
                'to_date' => 'nullable|date',
            ]);
            $result = $this->transactionService->index(
                IndexTransactionDTO::fromRequest($input),
            );
            return $this->successResponse(TransactionResource::collection($result), 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function transactionHistory(Request $request) {
        try {
            $input = $request->validate([
                'type' => 'nullable|string',
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
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function store(Request $request) {
        try {
            $input = $request->validate([
                'type' => 'required|string',
                'amount' => 'required|numeric',
                'description' => 'required|string',
                'category' => 'required|string',
                'date' => 'required|string',
                'transactionable_type' => 'nullable|string',
                'transactionable_id' => 'nullable|numeric',
            ]);
            $result = $this->transactionService->create(
                CreateTransactionDTO::fromRequest($input),
            );
            return $this->successResponse(new TransactionResource($result), 201);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}