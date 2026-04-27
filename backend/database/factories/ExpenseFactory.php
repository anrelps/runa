<?php

namespace Database\Factories;

use App\Domain\Finance\Expense\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseFactory extends Factory
{
    protected $model = Expense::class;

    private static array $items = [
        ['description' => 'Notebook Dell', 'category' => 'Tecnologia'],
        ['description' => 'iPhone 15', 'category' => 'Tecnologia'],
        ['description' => 'TV Samsung 55"', 'category' => 'Casa'],
        ['description' => 'Geladeira', 'category' => 'Casa'],
        ['description' => 'Ar condicionado', 'category' => 'Casa'],
        ['description' => 'Cadeira ergonômica', 'category' => 'Casa'],
        ['description' => 'Passagem aérea', 'category' => 'Lazer'],
        ['description' => 'Curso online', 'category' => 'Educação'],
        ['description' => 'Headphone', 'category' => 'Tecnologia'],
        ['description' => 'Monitor', 'category' => 'Tecnologia'],
    ];

    public function definition(): array
    {
        $item = $this->faker->randomElement(self::$items);

        return [
            'description' => $item['description'],
            'category' => $item['category'],
            'type' => 'single',
            'total_amount' => $this->faker->randomFloat(2, 100, 5000),
            'installment_count' => 0,
            'first_due_date' => now()->format('Y-m-d'),
        ];
    }

    public function single(): static
    {
        return $this->state(['type' => 'single', 'installment_count' => 0]);
    }

    public function installment(int $count): static
    {
        return $this->state(['type' => 'installment', 'installment_count' => $count]);
    }
}
