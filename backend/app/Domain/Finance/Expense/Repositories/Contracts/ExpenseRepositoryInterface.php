<?php

namespace App\Domain\Finance\Expense\Repositories\Contracts;

use App\Domain\Finance\Expense\DTOs\CreateExpenseDTO;
use App\Domain\Finance\Expense\DTOs\CreateInstallmentDTO;
use App\Domain\Finance\Expense\DTOs\IndexExpenseDTO;
use App\Domain\Finance\Expense\DTOs\UpdateExpenseDTO;
use App\Domain\Finance\Expense\Models\Expense;
use App\Domain\Finance\Expense\Models\ExpenseInstallment;
use Illuminate\Pagination\LengthAwarePaginator;

interface ExpenseRepositoryInterface {
    public function index(IndexExpenseDTO $dto): LengthAwarePaginator;
    public function create(CreateExpenseDTO $dto): Expense;
    public function createInstallment(CreateInstallmentDTO $dto): ExpenseInstallment;
    public function update(Expense $expense, UpdateExpenseDTO $dto): Expense;
    public function delete(Expense $expense): void;
}
