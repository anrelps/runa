<?php

namespace App\Domain\Finance\Expense\DTOs;

class IndexExpenseDTO {
    public function __construct(
        public readonly ?string $category,
        public readonly ?string $type,
        public readonly ?float $total_amount,
        public readonly ?string $from_date,
        public readonly ?string $to_date,
        public readonly ?int $per_page,
    ) {}

    public static function fromRequest(array $data) {
        return new self(
            category: $data['category'] ?? null,
            type: $data['type'] ?? null,
            total_amount: $data['total_amount'] ?? null,
            from_date: $data['from_date'] ?? null,
            to_date: $data['to_date'] ?? null,
            per_page: $data['per_page'] ?? null,
        );
    }
}