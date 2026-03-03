<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $table = "expenses";

    protected $fillable = [
        'user_id',
        'description',
        'category',
        'type',
        'total_amount',
        'installment_count',
        'first_due_date',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function expenseInstallments() {
        return $this->hasMany(ExpenseInstallment::class);
    }
}
