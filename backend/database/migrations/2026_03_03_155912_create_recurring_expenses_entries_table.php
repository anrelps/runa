<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recurring_expenses_entries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recurring_expense_id');
            $table->char('reference_month', 7);
            $table->decimal('amount', 20, 6);
            $table->timestamp('paid_at');
            $table->timestamps();

            $table->foreign('recurring_expense_id')->references('id')->on('recurring_expenses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recurring_expenses_entries');
    }
};
