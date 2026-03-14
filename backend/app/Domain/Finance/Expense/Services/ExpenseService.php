<?php

namespace App\Domain\Finance\Expense\Services;

use App\Domain\Finance\Expense\DTOs\CreateExpenseDTO;
use App\Domain\Finance\Expense\DTOs\CreateInstallmentDTO;
use App\Domain\Finance\Expense\DTOs\IndexExpenseDTO;
use App\Domain\Finance\Expense\DTOs\UpdateExpenseDTO;
use App\Domain\Finance\Expense\Models\Expense;
use App\Domain\Finance\Expense\Models\ExpenseInstallment;
use App\Domain\Finance\Expense\Repositories\Contracts\ExpenseRepositoryInterface;
use App\Domain\Finance\Transaction\DTOs\CreateTransactionDTO;
use App\Domain\Finance\Transaction\Services\TransactionService;
use Carbon\Carbon;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExpenseService {

    public function __construct(
        private ExpenseRepositoryInterface $expenseRepository,
        private TransactionService $transactionService,
    ) {}

    public function index(IndexExpenseDTO $dto): LengthAwarePaginator {
        $expenses = $this->expenseRepository->index($dto);
        return $expenses;
    }

    public function create(CreateExpenseDTO $dto): Expense {
        try {
            if($dto->type === 'single' && $dto->installment_count > 0) throw new Exception('Single type expense cannot have installments');
            DB::beginTransaction();
            $expense = $this->expenseRepository->create($dto);
            if($dto->installment_count == 0) {
                $this->transactionService->create(
                    new CreateTransactionDTO (
                        'expense',
                        $expense->total_amount,
                        "Gasto de R$ $expense->total_amount em: $expense->description",
                        $expense->category,
                        $expense->created_at,
                        Expense::class,
                        $expense->id,
                    ),
                );
            }
            if($dto->installment_count > 0) {
                $amount = $expense->total_amount / $dto->installment_count;
                for($i = 0; $i < $dto->installment_count; $i++) {
                    $data = [
                        'expense_id' => $expense->id,
                        'installment_number' => $i + 1,
                        'amount' => $amount,
                        'due_date' => Carbon::parse($expense->first_due_date)->addMonth($i)->toDateString(),
                    ];
                    $installmentDTO = new CreateInstallmentDTO(
                        $data['expense_id'],
                        $data['installment_number'],
                        $data['amount'],
                        $data['due_date']
                    );
                    $this->expenseRepository->createInstallment($installmentDTO);
                }
            }
            DB::commit();
            return $expense;
        } catch(Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }

    public function updateInstallment(ExpenseInstallment $expenseInstallment): ExpenseInstallment {
        $installment = $this->expenseRepository->updateInstallment($expenseInstallment);
        if(!is_null($installment->paid_at)) {
            $this->transactionService->create(
                new CreateTransactionDTO(
                    'expense',
                    $installment->amount,
                    "Pagamento da parcela {$installment->installment_number} de {$installment->expense->description}",
                    $installment->expense->category,
                    $installment->paid_at,
                    ExpenseInstallment::class,
                    $installment->id,
                )
            );
        }
        return $installment;
    }

    public function update(Expense $expense, UpdateExpenseDTO $dto): Expense {
        $expenseUpdated = $this->expenseRepository->update($expense, $dto);
        return $expenseUpdated;
    }

    public function delete(Expense $expense): void {
        $this->expenseRepository->delete($expense);
    }
}
