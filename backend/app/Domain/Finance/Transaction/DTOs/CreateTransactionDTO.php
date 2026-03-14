<?php

namespace App\Domain\Finance\Transaction\DTOs;

class CreateTransactionDTO {
    public function __construct(
        public readonly string $type,
        public readonly float $amount,
        public readonly string $description,
        public readonly string $category,
        public readonly string $date,
        public readonly string $transactionable_type,
        public readonly int $transactionable_id,
    ) {}
}
