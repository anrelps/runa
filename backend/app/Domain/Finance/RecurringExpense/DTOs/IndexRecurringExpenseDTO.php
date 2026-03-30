<?php

namespace App\Domain\Finance\RecurringExpense\DTOs;

class IndexRecurringExpenseDTO {
    public function __construct(
        public readonly ?string $description,
        public readonly ?float $min_amount,
        public readonly ?float $max_amount,
        public readonly ?int $from_due_day,
        public readonly ?int $to_due_day,
        public readonly ?int $is_active,
        public readonly ?int $per_page,
    ) {}

    public static function fromRequest(array $data) {
        return new self(
            description: $data['description'] ?? null,
            min_amount: $data['min_amount'] ?? null,
            max_amount: $data['max_amount'] ?? null,
            from_due_day: $data['from_due_day'] ?? null,
            to_due_day: $data['to_due_day'] ?? null,
            is_active: $data['is_active'] ?? null,
            per_page: $data['per_page'] ?? null,
        );
    }
}
