<?php

namespace App\Http\Controllers\Finance\Expense;

use App\Domain\Finance\Expense\DTOs\CreateExpenseDTO;
use App\Domain\Finance\Expense\DTOs\IndexExpenseDTO;
use App\Domain\Finance\Expense\DTOs\UpdateExpenseDTO;
use App\Domain\Finance\Expense\Models\Expense;
use App\Domain\Finance\Expense\Models\ExpenseInstallment;
use App\Domain\Finance\Expense\Services\ExpenseService;
use App\Http\Controllers\Controller;
use App\Http\Resources\Finance\Expense\ExpenseResource;
use Illuminate\Http\Request;
use App\Traits\Api\ApiResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ExpenseController extends Controller
{
    use ApiResponse, AuthorizesRequests;

    public function __construct(
        private ExpenseService $expenseService,
    ) {}

    public function index(Request $request) {
        $filters = $request->validate([
            'category' => 'nullable|string|in:Moradia,Alimentação,Transporte,Compras,Lazer,Saúde,Educação,Negócios,Finanças,Outros',
            'type' => 'nullable|string|in:single,installment',
            'total_amount' => 'nullable|numeric',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date',
            'per_page' => 'nullable|numeric'
        ]);
        $result = $this->expenseService->index(
            IndexExpenseDTO::fromRequest($filters),
        );

        if ($result instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            return response()->json([
                'success' => true,
                'data' => ExpenseResource::collection($result->items()),
                'meta' => [
                    'current_page' => $result->currentPage(),
                    'last_page'    => $result->lastPage(),
                    'per_page'     => $result->perPage(),
                    'total'        => $result->total(),
                ],
            ], 200);
        }

        return $this->successResponse(ExpenseResource::collection($result), 200);
    }

    public function show(Expense $expense) {
        $this->authorize('view', $expense);
        $expense->load('expenseInstallments');
        return $this->successResponse(new ExpenseResource($expense), 200);
    }

    public function store(Request $request) {
        $input = $request->validate([
            'description' => 'required|string|max:255',
            'category' => 'required|string|in:Moradia,Alimentação,Transporte,Compras,Lazer,Saúde,Educação,Negócios,Finanças,Outros',
            'type' => 'required|string|in:single,installment',
            'total_amount' => 'required|numeric|min:0.01',
            'installment_count' => 'nullable|integer|min:1|max:360',
            'first_due_date' => 'required|date',
        ]);
        $result = $this->expenseService->create(
            CreateExpenseDTO::fromRequest($input),
        );
        return $this->successResponse(new ExpenseResource($result), 201);
    }

    public function updateInstallment(ExpenseInstallment $expenseInstallment) {
        $this->authorize('view', $expenseInstallment->expense);
        $this->expenseService->updateInstallment($expenseInstallment);
        return $this->successResponse('Installment updated successfully.', 200);
    }

    public function update(Expense $expense, Request $request) {
        $this->authorize('view', $expense);
        $input = $request->validate([
            'description' => 'required|string|max:255',
            'category' => 'required|string|in:Moradia,Alimentação,Transporte,Compras,Lazer,Saúde,Educação,Negócios,Finanças,Outros',
            'total_amount' => 'required|numeric|min:0.01',
        ]);

        $result = $this->expenseService->update(
            $expense,
            UpdateExpenseDTO::fromRequest($input),
        );

        return $this->successResponse(new ExpenseResource($result), 200);
    }

    public function destroy(Expense $expense) {
        $this->authorize('view', $expense);
        $this->expenseService->delete($expense);
        return $this->successResponse(null, 204);
    }
}
