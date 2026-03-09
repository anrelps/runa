<?php

namespace App\Domain\Finance\Expense\DTOs;

class CreateInstallmentDTO {
    public function __construct(
        public readonly int $expense_id,
        public readonly int $installment_number,
        public readonly float $amount,
        public readonly string $due_date,
    ) {}

    public static function fromRequest(array $data) {
        return new self (
            expense_id: $data['expense_id'],
            installment_number: $data['installment_number'],
            amount: $data['amount'],
            due_date: $data['due_date'],
        );
    }
}
