<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecurringExpense extends Model
{
    protected $table = "recurring_expenses";

    protected $fillable = [
        'user_id',
        'description',
        'amount',
        'due_day',
        'active',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function recurringExpenseEntries() {
        return $this->hasMany(RecurringExpenseEntry::class);
    }
}
