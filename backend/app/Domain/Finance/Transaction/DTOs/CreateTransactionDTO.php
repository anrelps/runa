<?php

namespace App\Domain\Finance\Transaction\DTOs;

class CreateTransactionDTO {
    public function __construct(
        public readonly string $type,
        public readonly float $amount,
        public readonly string $description,
        public readonly string $category,
        public readonly string $date,
        public readonly ?string $transactionable_type,
        public readonly ?int $transactionable_id,
    ) {}

    public static function fromRequest(array $data) {
        return new self(
            type: $data["type"],
            amount: $data["amount"],
            description: $data["description"],
            category: $data["category"],
            date: $data["date"],
            transactionable_type: $data["transactionable_type"] ?? null,
            transactionable_id: $data["transactionable_id"] ?? null,
        );
    }
}
