<?php

namespace Database\Seeders;

use App\Domain\Finance\Expense\Models\Expense;
use App\Domain\Finance\Expense\Models\ExpenseInstallment;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpense;
use App\Domain\Finance\RecurringExpense\Models\RecurringExpenseEntry;
use App\Domain\Finance\Transaction\Models\Transaction;
use App\Domain\User\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    public function run(User $user): void
    {
        $this->seedRecurringExpenses($user);
        $this->seedInstallmentExpenses($user);
        $this->seedSingleExpenses($user);
        $this->seedTransactions($user);
    }

    private function seedRecurringExpenses(User $user): void
    {
        $subscriptions = [
            ['description' => 'Netflix', 'amount' => 39.90, 'due_day' => 15, 'category' => 'Lazer'],
            ['description' => 'Spotify', 'amount' => 21.90, 'due_day' => 10, 'category' => 'Lazer'],
            ['description' => 'Academia', 'amount' => 89.90, 'due_day' => 5, 'category' => 'Saúde'],
            ['description' => 'Internet', 'amount' => 109.90, 'due_day' => 20, 'category' => 'Moradia'],
            ['description' => 'Plano Celular', 'amount' => 59.90, 'due_day' => 8, 'category' => 'Moradia'],
        ];

        foreach ($subscriptions as $sub) {
            $recurring = RecurringExpense::create([
                'user_id' => $user->id,
                'description' => $sub['description'],
                'amount' => $sub['amount'],
                'due_day' => $sub['due_day'],
                'active' => true,
            ]);

            for ($i = 5; $i >= 0; $i--) {
                $month = now()->subMonths($i);
                $paidDay = min($sub['due_day'], $month->daysInMonth);
                $paidAt = $month->copy()->setDay($paidDay);

                RecurringExpenseEntry::create([
                    'recurring_expense_id' => $recurring->id,
                    'reference_month' => $month->format('Y-m'),
                    'amount' => $sub['amount'],
                    'paid_at' => $paidAt,
                ]);

                Transaction::create([
                    'user_id' => $user->id,
                    'type' => 'expense',
                    'amount' => $sub['amount'],
                    'description' => $sub['description'],
                    'category' => $sub['category'],
                    'date' => $paidAt->format('Y-m-d'),
                ]);
            }
        }
    }

    private function seedInstallmentExpenses(User $user): void
    {
        $purchases = [
            ['description' => 'Notebook Dell', 'category' => 'Compras', 'total' => 4800.00, 'installments' => 12, 'months_ago' => 5],
            ['description' => 'iPhone 15', 'category' => 'Compras', 'total' => 5999.00, 'installments' => 12, 'months_ago' => 3],
            ['description' => 'TV Samsung 55"', 'category' => 'Compras', 'total' => 2400.00, 'installments' => 6, 'months_ago' => 4],
        ];

        foreach ($purchases as $purchase) {
            $installmentAmount = round($purchase['total'] / $purchase['installments'], 2);
            $startDate = now()->subMonths($purchase['months_ago'])->startOfMonth();

            $expense = Expense::create([
                'user_id' => $user->id,
                'description' => $purchase['description'],
                'category' => $purchase['category'],
                'type' => 'installment',
                'total_amount' => $purchase['total'],
                'installment_count' => $purchase['installments'],
                'first_due_date' => $startDate->format('Y-m-d'),
            ]);

            for ($i = 0; $i < $purchase['installments']; $i++) {
                $dueDate = $startDate->copy()->addMonths($i)->setDay(10);
                $isPast = $dueDate->isPast();
                $paidAt = $isPast ? $dueDate->copy()->addDays(rand(0, 2)) : null;

                ExpenseInstallment::create([
                    'expense_id' => $expense->id,
                    'installment_number' => $i + 1,
                    'amount' => $installmentAmount,
                    'due_date' => $dueDate->format('Y-m-d'),
                    'paid_at' => $paidAt,
                ]);

                if ($isPast) {
                    $num = $i + 1;
                    $total = $purchase['installments'];
                    Transaction::create([
                        'user_id' => $user->id,
                        'type' => 'expense',
                        'amount' => $installmentAmount,
                        'description' => "{$purchase['description']} ({$num}/{$total})",
                        'category' => $purchase['category'],
                        'date' => $dueDate->format('Y-m-d'),
                    ]);
                }
            }
        }
    }

    private function seedSingleExpenses(User $user): void
    {
        $expensesByCategory = [
            ['category' => 'Alimentação', 'items' => ['Mercado', 'Feira', 'Açougue'], 'range' => [80, 350]],
            ['category' => 'Transporte', 'items' => ['Gasolina', 'Estacionamento', 'IPVA'], 'range' => [60, 300]],
            ['category' => 'Saúde', 'items' => ['Farmácia', 'Consulta médica', 'Exames'], 'range' => [40, 400]],
            ['category' => 'Lazer', 'items' => ['Cinema', 'Show', 'Viagem'], 'range' => [50, 500]],
            ['category' => 'Moradia', 'items' => ['Manutenção', 'Limpeza', 'Utensílios'], 'range' => [30, 200]],
        ];

        for ($month = 5; $month >= 0; $month--) {
            $date = now()->subMonths($month);

            foreach ($expensesByCategory as $cat) {
                $description = $cat['items'][array_rand($cat['items'])];
                $amount = fake()->randomFloat(2, $cat['range'][0], $cat['range'][1]);

                Expense::create([
                    'user_id' => $user->id,
                    'description' => $description,
                    'category' => $cat['category'],
                    'type' => 'single',
                    'total_amount' => $amount,
                    'installment_count' => 0,
                    'first_due_date' => $date->copy()->setDay(rand(1, min(28, $date->daysInMonth)))->format('Y-m-d'),
                ]);
            }
        }
    }

    private function seedTransactions(User $user): void
    {
        $salary = fake()->randomFloat(2, 4500, 7000);

        for ($month = 5; $month >= 0; $month--) {
            $date = now()->subMonths($month);

            // Monthly salary
            Transaction::create([
                'user_id' => $user->id,
                'type' => 'income',
                'amount' => $salary,
                'description' => 'Salário mensal',
                'category' => 'Renda',
                'date' => $date->copy()->setDay(5)->format('Y-m-d'),
            ]);

            // Occasional freelance income
            if (rand(0, 1)) {
                Transaction::create([
                    'user_id' => $user->id,
                    'type' => 'income',
                    'amount' => fake()->randomFloat(2, 300, 1500),
                    'description' => 'Freelance',
                    'category' => 'Renda Extra',
                    'date' => $date->copy()->setDay(rand(10, 25))->format('Y-m-d'),
                ]);
            }

            // Daily expense transactions (4–6 per month)
            $expenseItems = [
                ['description' => 'Restaurante', 'category' => 'Alimentação', 'range' => [25, 120]],
                ['description' => 'Delivery', 'category' => 'Alimentação', 'range' => [30, 80]],
                ['description' => 'Uber', 'category' => 'Transporte', 'range' => [15, 60]],
                ['description' => 'Lanche', 'category' => 'Alimentação', 'range' => [10, 40]],
                ['description' => 'Farmácia', 'category' => 'Saúde', 'range' => [20, 150]],
                ['description' => 'Padaria', 'category' => 'Alimentação', 'range' => [10, 35]],
            ];

            $count = rand(4, 6);
            shuffle($expenseItems);

            foreach (array_slice($expenseItems, 0, $count) as $item) {
                Transaction::create([
                    'user_id' => $user->id,
                    'type' => 'expense',
                    'amount' => fake()->randomFloat(2, $item['range'][0], $item['range'][1]),
                    'description' => $item['description'],
                    'category' => $item['category'],
                    'date' => $date->copy()->setDay(rand(1, min(28, $date->daysInMonth)))->format('Y-m-d'),
                ]);
            }
        }
    }
}
