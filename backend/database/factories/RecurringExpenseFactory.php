<?php

namespace Database\Factories;

use App\Domain\Finance\RecurringExpense\Models\RecurringExpense;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecurringExpenseFactory extends Factory
{
    protected $model = RecurringExpense::class;

    private static array $subscriptions = [
        ['description' => 'Netflix', 'amount' => 39.90],
        ['description' => 'Spotify', 'amount' => 21.90],
        ['description' => 'Academia', 'amount' => 89.90],
        ['description' => 'Internet', 'amount' => 109.90],
        ['description' => 'Plano Celular', 'amount' => 59.90],
        ['description' => 'Amazon Prime', 'amount' => 19.90],
        ['description' => 'Disney+', 'amount' => 43.90],
        ['description' => 'iCloud', 'amount' => 9.90],
    ];

    public function definition(): array
    {
        $sub = $this->faker->randomElement(self::$subscriptions);

        return [
            'description' => $sub['description'],
            'amount' => $sub['amount'],
            'due_day' => $this->faker->numberBetween(1, 28),
            'active' => true,
        ];
    }
}
