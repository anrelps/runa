<?php

namespace App\Domain\Finance\Transaction\ValueObjects;

readonly class TransactionHistory {
    public function __construct(
        public float $totalIncome,
        public float $totalExpense,
    ) {}

    public function getBalance() {
        return $this->totalIncome - $this->totalExpense;
    }

    public function getFormattedBalance(): string
    {
        return 'R$ ' . number_format($this->getBalance(), 2, ',', '.');
    }
}