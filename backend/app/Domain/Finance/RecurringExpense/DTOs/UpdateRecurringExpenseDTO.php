<?php

namespace App\Domain\Finance\RecurringExpense\DTOs;

class UpdateRecurringExpenseDTO {
    public function __construct(
        public readonly string $description,
        public readonly float $amount,
        public readonly int $due_day,
        public readonly int $active,
    ) {}

    public static function fromRequest(array $data) {
        return new self (
            description: $data['description'],
            amount: $data['amount'],
            due_day: $data['due_day'],
            active: $data['active'],
        );
    }
}
