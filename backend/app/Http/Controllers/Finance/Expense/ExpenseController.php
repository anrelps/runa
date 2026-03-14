<?php

namespace App\Http\Controllers\Finance\Expense;

use App\Domain\Finance\Expense\DTOs\CreateExpenseDTO;
use App\Domain\Finance\Expense\DTOs\IndexExpenseDTO;
use App\Domain\Finance\Expense\DTOs\UpdateExpenseDTO;
use App\Domain\Finance\Expense\Models\Expense;
use App\Domain\Finance\Expense\Models\ExpenseInstallment;
use App\Domain\Finance\Expense\Services\ExpenseService;
use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use Illuminate\Http\Request;
use App\Traits\Api\ApiResponse;
use Exception;

class ExpenseController extends Controller
{
    use ApiResponse;

    public function __construct(
        private ExpenseService $expenseService,
    ) {}

    public function index(Request $request) {
        try {
            $filters = $request->validate([
                'category' => 'nullable|string',
                'type' => 'nullable|string',
                'total_amount' => 'nullable|numeric',
                'from_date' => 'nullable|date',
                'to_date' => 'nullable|date',
            ]);
            $result = $this->expenseService->index(
                IndexExpenseDTO::fromRequest($filters),
            );
            return $this->successResponse(ExpenseResource::collection($result), 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function store(Request $request) {
        try {
            $input = $request->validate([
                'description' => 'required|string',
                'category' => 'required|string',
                'type' => 'required|string',
                'total_amount' => 'required|numeric',
                'installment_count' => 'nullable|numeric',
                'first_due_date' => 'required|date',
            ]);
            $result = $this->expenseService->create(
                CreateExpenseDTO::fromRequest($input),
            );
            return $this->successResponse(new ExpenseResource($result), 201);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function updateInstallment(ExpenseInstallment $expenseInstallment) {
        try {
            $this->expenseService->updateInstallment($expenseInstallment);
            return $this->successResponse('Installment updated successfully.', 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function update(Expense $expense, Request $request) {
        try {
            $input = $request->validate([
                'description' => 'required|string',
                'category' => 'required|string',
                'total_amount' => 'required|numeric',
            ]);

            $result = $this->expenseService->update(
                $expense,
                UpdateExpenseDTO::fromRequest($input),
            );

            return $this->successResponse(new ExpenseResource($result), 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function destroy(Expense $expense) {
        try {
            $this->expenseService->delete($expense);
            return $this->successResponse(null, 204);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
