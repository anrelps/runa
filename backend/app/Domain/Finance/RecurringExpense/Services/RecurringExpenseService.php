<?php

namespace App\Domain\Finance\RecurringExpense\Services;

use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseEntryDTO;
use App\Domain\Finance\RecurringExpense\DTOs\IndexRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\UpdateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpense;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpenseEntry;
use App\Domain\Finance\RecurringExpense\Repositories\Contracts\RecurringExpenseRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class RecurringExpenseService {

    public function __construct(
        private RecurringExpenseRepositoryInterface $recurringExpenseRepository,
    ) {}

    public function index(IndexRecurringExpenseDTO $dto): LengthAwarePaginator {
        $recurringExpenses = $this->recurringExpenseRepository->index($dto);
        return $recurringExpenses;
    }

    public function create(CreateRecurringExpenseDTO $dto): RecurringExpense {
        $recurringExpense = $this->recurringExpenseRepository->create($dto);
        return $recurringExpense;
    }

    public function createEntry(CreateRecurringExpenseEntryDTO $dto): RecurringExpenseEntry {
        $recurringExpenseEntry = $this->recurringExpenseRepository->createEntry($dto);
        return $recurringExpenseEntry;
    }

    public function update(RecurringExpense $recurringExpense, UpdateRecurringExpenseDTO $dto): RecurringExpense {
        return $this->recurringExpenseRepository->update($recurringExpense, $dto);
    }

    public function delete(RecurringExpense $recurringExpense): void {
        $this->recurringExpenseRepository->delete($recurringExpense);
    }
}
