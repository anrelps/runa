<?php

namespace App\Domain\Finance\Expense\Repositories\Eloquent;

use App\Domain\Finance\Expense\DTOs\CreateExpenseDTO;
use App\Domain\Finance\Expense\DTOs\CreateInstallmentDTO;
use App\Domain\Finance\Expense\DTOs\IndexExpenseDTO;
use App\Domain\Finance\Expense\DTOs\UpdateExpenseDTO;
use App\Domain\Finance\Expense\Models\Expense;
use App\Domain\Finance\Expense\Models\ExpenseInstallment;
use App\Domain\Finance\Expense\Repositories\Contracts\ExpenseRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class ExpenseRepository implements ExpenseRepositoryInterface {

    public function __construct(
        private Expense $expenseModel,
        private ExpenseInstallment $expenseInstallmentModel,
    ) {}

    public function index(IndexExpenseDTO $dto): LengthAwarePaginator {
        $user_id = Auth::user()->id;
        $expenses = $this->expenseModel
            ->where('user_id', $user_id)
            ->when(isset($dto->category), function($q) use ($dto) {
                $q->where('category', $dto->category);
            })
            ->when(isset($dto->type), function($q) use ($dto) {
                $q->where('type', $dto->type);
            })
            ->when(isset($dto->total_amount), function($q) use ($dto) {
                $q->where('total_amount', '>=', $dto->total_amount);
            })
            ->when(isset($dto->from_date), function($q) use ($dto) {
                $q->where('created_at',  '>=', $dto->from_date);
            })
            ->when(isset($dto->to_date), function($q) use ($dto) {
                $q->where('created_at',  '<=', $dto->to_date);
            })
            ->orderBy('first_due_date', 'DESC')
<<<<<<< Updated upstream
            ->when(isset($dto->per_page), function($q) use ($dto) {
                $q->paginate($dto->per_page);
            })
            ->when(!isset($dto->per_page), function($q) use ($dto) {
                $q->get();
            });
=======
            ->paginate(12);
>>>>>>> Stashed changes
        return $expenses;
    }

    public function create(CreateExpenseDTO $dto): Expense {
        $user_id = Auth::user()->id;
        return $this->expenseModel->create([
            'user_id' => $user_id,
            'description' => $dto->description,
            'category' => $dto->category,
            'type' => $dto->type,
            'total_amount' => $dto->total_amount,
            'installment_count' => $dto->installment_count,
            'first_due_date' => $dto->first_due_date,
        ]);
    }

    public function createInstallment(CreateInstallmentDTO $dto): ExpenseInstallment {
        return $this->expenseInstallmentModel->create([
            'expense_id' => $dto->expense_id,
            'installment_number' => $dto->installment_number,
            'amount' => $dto->amount,
            'due_date' => $dto->due_date,
        ]);
    }

    public function updateInstallment(ExpenseInstallment $expenseInstallment): ExpenseInstallment {
        $expenseInstallment->update([
            'paid_at' => !is_null($expenseInstallment->paid_at) ? null : Carbon::now(),
        ]);
        $expenseInstallment->load('expense');
        return $expenseInstallment;
    }

    public function update(Expense $expense, UpdateExpenseDTO $dto): Expense {
        $expense->update([
            'description' => $dto->description,
            'category' => $dto->category,
            'total_amount' => $dto->total_amount,
        ]);
        return $expense;
    }

    public function delete(Expense $expense): void {
        $expense->delete();
    }
}
