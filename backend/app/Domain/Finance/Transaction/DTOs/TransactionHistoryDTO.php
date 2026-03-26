<?php

namespace App\Domain\Finance\Transaction\DTOs;

class TransactionHistoryDTO {

    public function __construct(
        public readonly ?string $type,
        public readonly ?float $min_amount,
        public readonly ?float $max_amount,
        public readonly ?string $from_date,
        public readonly ?string $to_date,
    ) {}

    public static function fromRequest(array $data): TransactionHistoryDTO {
        return new self (
            type: $data['type'] ?? null,
            min_amount: $data['min_amount'] ?? null,
            max_amount: $data['max_amount'] ?? null,
            from_date: $data['from_date'] ?? null,
            to_date: $data['to_date'] ?? null,
        );
    }
}