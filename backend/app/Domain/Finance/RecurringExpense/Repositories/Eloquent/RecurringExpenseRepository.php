<?php

namespace App\Domain\Finance\RecurringExpense\Repositories\Eloquent;

use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseEntryDTO;
use App\Domain\Finance\RecurringExpense\DTOs\IndexRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\UpdateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpense;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpenseEntry;
use App\Domain\Finance\RecurringExpense\Repositories\Contracts\RecurringExpenseRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class RecurringExpenseRepository implements RecurringExpenseRepositoryInterface {

    public function __construct(
        private RecurringExpense $recurringExpenseModel,
        private RecurringExpenseEntry $recurringExpenseEntryModel,
    ) {}

    public function index(IndexRecurringExpenseDTO $dto): LengthAwarePaginator {
        $user_id = Auth::user()->id;
        $recurringExpenses = $this->recurringExpenseModel
            ->where('user_id', $user_id)
            ->when(isset($dto->description), function($q) use ($dto) {
                $q->where('description', 'LIKE', "%{$dto->description}%");
            })
            ->when(isset($dto->min_amount), function($q) use ($dto) {
                $q->where('amount', '>=', $dto->min_amount);
            })
            ->when(isset($dto->max_amount), function($q) use ($dto) {
                $q->where('amount', '<=', $dto->max_amount);
            })
            ->when(isset($dto->from_due_day), function($q) use ($dto) {
                $q->where('due_day', '>=', $dto->from_due_day);
            })
            ->when(isset($dto->to_due_day), function($q) use ($dto) {
                $q->where('due_day', '<=', $dto->to_due_day);
            })
            ->when(isset($dto->is_active), function($q) use ($dto) {
                $q->where('active', 1);
            })
            ->orderBy('due_day', 'ASC')
            ->paginate(20);
        return $recurringExpenses;
    }

    public function create(CreateRecurringExpenseDTO $dto): RecurringExpense {
        $user_id = Auth::user()->id;
        return $this->recurringExpenseModel->create([
            'user_id' => $user_id,
            'description' => $dto->description,
            'amount' => $dto->amount,
            'due_day' => $dto->due_day,
            'active' => $dto->active,
        ]);
    }

    public function createEntry(CreateRecurringExpenseEntryDTO $dto): RecurringExpenseEntry {
        return $this->recurringExpenseEntryModel->create([
            'recurring_expense_id' => $dto->recurring_expense_id,
            'reference_month' => $dto->reference_month,
            'amount' => $dto->amount,
            'paid_at' => $dto->paid_at,
        ]);
    }

    public function update(RecurringExpense $recurringExpense, UpdateRecurringExpenseDTO $dto): RecurringExpense {
        $recurringExpense->update([
            'description' => $dto->description,
            'amount' => $dto->amount,
            'due_day' => $dto->due_day,
            'active' => $dto->active,
        ]);
        return $recurringExpense;
    }

    public function delete(RecurringExpense $recurringExpense): void {
        $recurringExpense->delete();
    }
}
