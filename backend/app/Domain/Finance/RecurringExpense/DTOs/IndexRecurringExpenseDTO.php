<?php

namespace App\Domain\Finance\RecurringExpense\DTOs;

class IndexRecurringExpenseDTO {
    public function __construct(
        public readonly string $description,
        public readonly float $min_amount,
        public readonly float $max_amount,
        public readonly int $from_due_day,
        public readonly int $to_due_day,
        public readonly int $is_active,
    ) {}

    public static function fromRequest(array $data) {
        return new self(
            description: $data['description'],
            min_amount: $data['min_amount'],
            max_amount: $data['max_amount'],
            from_due_day: $data['from_due_day'],
            to_due_day: $data['to_due_day'],
            is_active: $data['is_active'],
        );
    }
}
