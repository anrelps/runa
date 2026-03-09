<?php

namespace App\Domain\Finance\Expense\DTOs;

class UpdateExpenseDTO {
    public function __construct(
        public readonly string $description,
        public readonly string $category,
        public readonly float $total_amount,
    ) {}

    public static function fromRequest(array $data) {
        return new self(
            description: $data['description'],
            category: $data['category'],
            total_amount: $data['total_amount'],
        );
    }
}
