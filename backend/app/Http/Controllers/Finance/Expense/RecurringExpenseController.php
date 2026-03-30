<?php

namespace App\Http\Controllers\Finance\Expense;

use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseEntryDTO;
use App\Domain\Finance\RecurringExpense\DTOs\IndexRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\UpdateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpense;
use App\Domain\Finance\RecurringExpense\Services\RecurringExpenseService;
use App\Http\Controllers\Controller;
use App\Http\Resources\Finance\Expense\RecurringExpenseResource;
use App\Traits\Api\ApiResponse;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class RecurringExpenseController extends Controller
{
    use ApiResponse, AuthorizesRequests;

    public function __construct(
        private RecurringExpenseService $recurringExpenseService,
    ) {}

    public function index(Request $request) {
        try {
            $filters = $request->validate([
                'description' => 'nullable|string',
                'min_amount' => 'nullable|numeric',
                'max_amount' => 'nullable|numeric',
                'from_due_day' => 'nullable|numeric',
                'to_due_day' => 'nullable|numeric',
                'is_active' => 'nullable|numeric',
            ]);
            $result = $this->recurringExpenseService->index(
                IndexRecurringExpenseDTO::fromRequest($filters),
            );
            return $this->successResponse(RecurringExpenseResource::collection($result), 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function show(RecurringExpense $recurringExpense) {
        try {
            $this->authorize('view', $recurringExpense);
            return $this->successResponse(new RecurringExpenseResource($recurringExpense), 200);
        }
        catch(AuthorizationException $e) {
            return $this->errorResponse('You cannot access this recurring exception.', 403);
        }
        catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function store(Request $request) {
        try {
            $input = $request->validate([
                'description' => 'required|string',
                'amount' => 'required|numeric',
                'due_day' => 'required|numeric',
                'active' => 'required|numeric',
            ]);
            $result = $this->recurringExpenseService->create(
                CreateRecurringExpenseDTO::fromRequest($input),
            );
            return $this->successResponse(new RecurringExpenseResource($result), 201);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function createEntry(Request $request) {
        try {
            $input = $request->validate([
                'recurring_expense_id' => 'required|numeric|exists:recurring_expenses,id',
                'reference_month' => 'required|string',
                'amount' => 'required|numeric',
                'paid_at' => 'required|date',
            ]);
            $this->recurringExpenseService->createEntry(
                CreateRecurringExpenseEntryDTO::fromRequest($input),
            );
            return $this->successResponse('Payment done successfully.', 201);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function update(RecurringExpense $recurringExpense, Request $request) {
        try {
            $input = $request->validate([
                'description' => 'required|string',
                'amount' => 'required|numeric',
                'due_day' => 'required|numeric',
                'active' => 'required|numeric',
            ]);
            $result = $this->recurringExpenseService->update(
                $recurringExpense,
                UpdateRecurringExpenseDTO::fromRequest($input),
            );
            return $this->successResponse(new RecurringExpenseResource($result), 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function destroy(RecurringExpense $recurringExpense) {
        try {
            $this->recurringExpenseService->delete($recurringExpense);
            return $this->successResponse('Recurring Expense Deleted Successfully.', 204);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}