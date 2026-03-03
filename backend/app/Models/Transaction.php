<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = "transactions";

    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'description',
        'category',
        'date',
        'transactionable_type',
        'transactionable_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function transactionable() {
        return $this->morphTo();
    }
}
