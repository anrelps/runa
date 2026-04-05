<?php

namespace App\Domain\Finance\Transaction\Services;

use App\Domain\Finance\Transaction\DTOs\CreateTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\IndexTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\TransactionHistoryDTO;
use App\Domain\Finance\Transaction\Models\Transaction;
use App\Domain\Finance\Transaction\Repositories\Contracts\TransactionRepositoryInterface;
use App\Domain\Finance\Transaction\ValueObjects\TransactionHistory;
use Illuminate\Pagination\LengthAwarePaginator;

class TransactionService {

    public function __construct(
        private TransactionRepositoryInterface $transactionRepository,
    ) {}

    public function index(IndexTransactionDTO $dto): LengthAwarePaginator {
        $transactions = $this->transactionRepository->index($dto);
        return $transactions;
    }

    public function transactionHistory(TransactionHistoryDTO $dto): TransactionHistory {
        $transactions = $this->transactionRepository->transactionHistory($dto);
        return $transactions;
    }

    public function create(CreateTransactionDTO $dto): Transaction {
        $transaction = $this->transactionRepository->create($dto);
        return $transaction;
    }

    public function show(int $id): Transaction {
        return $this->transactionRepository->show($id);
    }

    public function update(Transaction $transaction, array $data): Transaction {
        return $this->transactionRepository->update($transaction, $data);
    }

    public function delete(Transaction $transaction): void {
        $this->transactionRepository->delete($transaction);
    }
}