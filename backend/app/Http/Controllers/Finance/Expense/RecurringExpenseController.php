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
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class RecurringExpenseController extends Controller
{
    use ApiResponse, AuthorizesRequests;

    public function __construct(
        private RecurringExpenseService $recurringExpenseService,
    ) {}

    public function index(Request $request) {
        $filters = $request->validate([
            'description' => 'nullable|string',
            'min_amount' => 'nullable|numeric',
            'max_amount' => 'nullable|numeric',
            'from_due_day' => 'nullable|numeric',
            'to_due_day' => 'nullable|numeric',
            'is_active' => 'nullable|numeric',
            'per_page' => 'nullable|numeric',
        ]);
        $result = $this->recurringExpenseService->index(
            IndexRecurringExpenseDTO::fromRequest($filters),
        );
        return $this->successResponse(RecurringExpenseResource::collection($result), 200);
    }

    public function show(RecurringExpense $recurringExpense) {
        $this->authorize('view', $recurringExpense);
        return $this->successResponse(new RecurringExpenseResource($recurringExpense), 200);
    }

    public function store(Request $request) {
        $input = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'due_day' => 'required|integer|min:1|max:31',
            'active' => 'required|boolean',
        ]);
        $result = $this->recurringExpenseService->create(
            CreateRecurringExpenseDTO::fromRequest($input),
        );
        return $this->successResponse(new RecurringExpenseResource($result), 201);
    }

    public function createEntry(Request $request) {
        $input = $request->validate([
            'recurring_expense_id' => 'required|numeric|exists:recurring_expenses,id',
            'reference_month' => 'required|string',
            'amount' => 'required|numeric|min:0.01',
            'paid_at' => 'required|date',
        ]);
        $this->recurringExpenseService->createEntry(
            CreateRecurringExpenseEntryDTO::fromRequest($input),
        );
        return $this->successResponse('Payment done successfully.', 201);
    }

    public function update(RecurringExpense $recurringExpense, Request $request) {
        $this->authorize('view', $recurringExpense);
        $input = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'due_day' => 'required|integer|min:1|max:31',
            'active' => 'required|boolean',
        ]);
        $result = $this->recurringExpenseService->update(
            $recurringExpense,
            UpdateRecurringExpenseDTO::fromRequest($input),
        );
        return $this->successResponse(new RecurringExpenseResource($result), 200);
    }

    public function destroy(RecurringExpense $recurringExpense) {
        $this->authorize('view', $recurringExpense);
        $this->recurringExpenseService->delete($recurringExpense);
        return $this->successResponse('Recurring Expense Deleted Successfully.', 204);
    }
}
