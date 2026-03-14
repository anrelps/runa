<?php

namespace App\Domain\Finance\Transaction\Repositories\Eloquent;

use App\Domain\Finance\Transaction\DTOs\CreateTransactionDTO;
use App\Domain\Finance\Transaction\DTOs\IndexTransactionDTO;
use App\Domain\Finance\Transaction\Models\Transaction;
use App\Domain\Finance\Transaction\Repositories\Contracts\TransactionRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class TransactionRepository implements TransactionRepositoryInterface {

    public function __construct(
        private Transaction $transactionModel,
    ) {}

    public function index(IndexTransactionDTO $dto): LengthAwarePaginator {
        $user_id = Auth::user()->id;
        return $this->transactionModel
            ->where('user_id', $user_id)
            ->when(isset($dto->type), function($q) use ($dto) {
                $q->where('type', $dto->type);
            })
            ->when(isset($dto->min_amount), function($q) use ($dto) {
                $q->where('amount', '>=', $dto->min_amount);
            })
            ->when(isset($dto->max_amount), function($q) use ($dto) {
                $q->where('amount', '<=', $dto->max_amount);
            })
            ->when(isset($dto->from_date), function($q) use ($dto) {
                $q->whereDate('date', '>=', $dto->from_date);
            })
            ->when(isset($dto->to_date), function($q) use ($dto) {
                $q->whereDate('date', '<=', $dto->to_date);
            })
            ->orderBy('date', 'DESC')
            ->paginate(20);
    }

    public function create(CreateTransactionDTO $dto): Transaction {
        $user_id = Auth::user()->id;
        return $this->transactionModel->create([
            'user_id' => $user_id,
            'type' => $dto->type,
            'amount' => $dto->amount,
            'description' => $dto->description,
            'category' => $dto->category,
            'date' => $dto->date,
            'transactionable_type' => $dto->transactionable_type,
            'transactionable_id' => $dto->transactionable_id,
        ]);
    }
}
