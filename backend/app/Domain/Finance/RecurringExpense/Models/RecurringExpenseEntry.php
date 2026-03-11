<?php

namespace App\Domain\Finance\RecurringExpense\Models;

use Illuminate\Database\Eloquent\Model;

class RecurringExpenseEntry extends Model
{
    protected $table = "recurring_expenses_entries";

    protected $fillable = [
        'recurring_expense_id',
        'reference_month',
        'amount',
        'paid_at',
    ];

    public function recurringExpense() {
        return $this->belongsTo(RecurringExpense::class);
    }

    public function transaction() {
        return $this->morphOne(Transaction::class, 'transactionable');
    }
}
