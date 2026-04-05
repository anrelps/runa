<?php

namespace App\Domain\Finance\RecurringExpense\Services;

use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseEntryDTO;
use App\Domain\Finance\RecurringExpense\DTOs\IndexRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\UpdateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpense;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpenseEntry;
use App\Domain\Finance\RecurringExpense\Repositories\Contracts\RecurringExpenseRepositoryInterface;
use App\Domain\Finance\Transaction\DTOs\CreateTransactionDTO;
use App\Domain\Finance\Transaction\Services\TransactionService;
class RecurringExpenseService {

    public function __construct(
        private RecurringExpenseRepositoryInterface $recurringExpenseRepository,
        private TransactionService $transactionService,
    ) {}

    public function index(IndexRecurringExpenseDTO $dto) {
        $recurringExpenses = $this->recurringExpenseRepository->index($dto);
        return $recurringExpenses;
    }

    public function create(CreateRecurringExpenseDTO $dto): RecurringExpense {
        $recurringExpense = $this->recurringExpenseRepository->create($dto);
        return $recurringExpense;
    }

    public function createEntry(CreateRecurringExpenseEntryDTO $dto): RecurringExpenseEntry {
        $recurringExpenseEntry = $this->recurringExpenseRepository->createEntry($dto);
        $this->transactionService->create(
            new CreateTransactionDTO(
                'expense',
                $recurringExpenseEntry->amount,
                "Pagamento recorrente de {$recurringExpenseEntry->recurringExpense->description}",
                'Recurring Expense',
                $recurringExpenseEntry->paid_at,
                RecurringExpenseEntry::class,
                $recurringExpenseEntry->id,
            )
        );
        return $recurringExpenseEntry;
    }

    public function update(RecurringExpense $recurringExpense, UpdateRecurringExpenseDTO $dto): RecurringExpense {
        return $this->recurringExpenseRepository->update($recurringExpense, $dto);
    }

    public function delete(RecurringExpense $recurringExpense): void {
        $this->recurringExpenseRepository->delete($recurringExpense);
    }
}
