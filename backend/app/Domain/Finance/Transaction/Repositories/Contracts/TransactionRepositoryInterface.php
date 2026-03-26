<?php

namespace App\Domain\Finance\Transaction\Repositories\Contracts;

use App\Domain\Finance\Transaction\DTOs\CreateTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\IndexTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\TransactionHistoryDTO;
use App\Domain\Finance\Transaction\Models\Transaction;
use App\Domain\Finance\Transactions\ValueObjects\TransactionHistory;
use Illuminate\Pagination\LengthAwarePaginator;

interface TransactionRepositoryInterface {
    public function index(IndexTransactionDTO $dto): LengthAwarePaginator;
    public function transactionHistory(TransactionHistoryDTO $dto): TransactionHistory;
    public function create(CreateTransactionDTO $dto): Transaction;
}