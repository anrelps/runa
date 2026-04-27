<?php

namespace Database\Factories;

use App\Domain\Finance\RecurringExpense\Models\RecurringExpenseEntry;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecurringExpenseEntryFactory extends Factory
{
    protected $model = RecurringExpenseEntry::class;

    public function definition(): array
    {
        return [
            'reference_month' => now()->format('Y-m'),
            'amount' => $this->faker->randomFloat(2, 10, 200),
            'paid_at' => now(),
        ];
    }

    public function unpaid(): static
    {
        return $this->state(['paid_at' => null]);
    }
}
