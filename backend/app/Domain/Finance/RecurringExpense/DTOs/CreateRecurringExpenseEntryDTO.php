<?php

namespace App\Domain\Finance\RecurringExpense\DTOs;

class CreateRecurringExpenseEntryDTO {
    public function __construct(
        public readonly int $recurring_expense_id,
        public readonly string $reference_month,
        public readonly float $amount,
        public readonly string $paid_at,
    ) {}

    public static function fromRequest(array $data) {
        return new self(
            recurring_expense_id: $data['recurring_expense_id'],
            reference_month: $data['reference_month'],
            amount: $data['amount'],
            paid_at: $data['paid_at'],
        );
    }
}
