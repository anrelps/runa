<?php

namespace Database\Factories;

use App\Domain\Finance\Transaction\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        return [
            'type' => 'expense',
            'amount' => $this->faker->randomFloat(2, 20, 800),
            'description' => $this->faker->randomElement([
                'Mercado', 'Restaurante', 'Farmácia', 'Gasolina', 'Uber',
                'Lanche', 'Delivery', 'Padaria', 'Hortifruti', 'Supermercado',
            ]),
            'category' => $this->faker->randomElement([
                'Alimentação', 'Transporte', 'Saúde', 'Lazer',
            ]),
            'date' => now()->format('Y-m-d'),
        ];
    }

    public function income(): static
    {
        return $this->state([
            'type' => 'income',
            'description' => 'Salário mensal',
            'category' => 'Renda',
            'amount' => $this->faker->randomFloat(2, 3000, 8000),
        ]);
    }

    public function expense(): static
    {
        return $this->state(['type' => 'expense']);
    }
}
