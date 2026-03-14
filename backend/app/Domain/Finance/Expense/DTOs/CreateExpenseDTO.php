<?php

namespace App\Domain\Finance\Expense\DTOs;

class CreateExpenseDTO {
    public function __construct(
        public readonly string $description,
        public readonly string $category,
        public readonly string $type,
        public readonly float $total_amount,
        public readonly int $installment_count,
        public readonly string $first_due_date,
    ) {}

    public static function fromRequest(array $data) {
        return new self(
            description: $data['description'],
            category: $data['category'],
            type: $data['type'],
            total_amount: $data['total_amount'],
            installment_count: $data['installment_count'] ?? 0,
            first_due_date: $data['first_due_date'],
        );
    }
}
