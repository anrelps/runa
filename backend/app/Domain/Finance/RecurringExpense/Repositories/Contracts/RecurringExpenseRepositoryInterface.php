<?php

namespace App\Domain\Finance\RecurringExpense\Repositories\Contracts;

use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\CreateRecurringExpenseEntryDTO;
use App\Domain\Finance\RecurringExpense\DTOs\IndexRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\DTOs\UpdateRecurringExpenseDTO;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpense;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpenseEntry;
use Illuminate\Pagination\LengthAwarePaginator;

interface RecurringExpenseRepositoryInterface {
    public function index(IndexRecurringExpenseDTO $dto): LengthAwarePaginator;
    public function create(CreateRecurringExpenseDTO $dto): RecurringExpense;
    public function createEntry(CreateRecurringExpenseEntryDTO $dto): RecurringExpenseEntry;
    public function update(RecurringExpense $recurringExpense, UpdateRecurringExpenseDTO $dto): RecurringExpense;
    public function delete(RecurringExpense $recurringExpense): void;
}
