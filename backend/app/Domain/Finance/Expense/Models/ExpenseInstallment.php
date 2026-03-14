<?php

namespace App\Domain\Finance\Expense\Models;

use App\Domain\Finance\Transaction\Models\Transaction;
use Illuminate\Database\Eloquent\Model;

class ExpenseInstallment extends Model
{
    protected $table = "expense_installments";

    protected $fillable = [
        'expense_id',
        'installment_number',
        'amount',
        'due_date',
        'paid_at',
    ];

    public function expense() {
        return $this->belongsTo(Expense::class);
    }

    public function transaction() {
        return $this->morphOne(Transaction::class, 'transactionable');
    }
}
