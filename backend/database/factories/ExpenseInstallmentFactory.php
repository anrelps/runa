<?php

namespace Database\Factories;

use App\Domain\Finance\Expense\Models\ExpenseInstallment;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseInstallmentFactory extends Factory
{
    protected $model = ExpenseInstallment::class;

    public function definition(): array
    {
        return [
            'installment_number' => 1,
            'amount' => $this->faker->randomFloat(2, 50, 500),
            'due_date' => now()->format('Y-m-d'),
            'paid_at' => now(),
        ];
    }

    public function unpaid(): static
    {
        return $this->state(['paid_at' => null]);
    }
}
