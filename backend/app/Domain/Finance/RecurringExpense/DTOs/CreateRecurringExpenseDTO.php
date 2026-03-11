<?php

namespace App\Domain\Finance\RecurringExpense\DTOs;

class CreateRecurringExpenseDTO {
    public function __construct(
        public readonly int $user_id,
        public readonly string $description,
        public readonly float $amount,
        public readonly int $due_day,
        public readonly int $active,
    ) {}

    public static function fromRequest(array $data) {
        return new self (
            user_id: $data['user_id'],
            description: $data['description'],
            amount: $data['amount'],
            due_day: $data['due_day'],
            active: $data['active'],
        );
    }
}
