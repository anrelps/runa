<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('first_due_date');
            $table->index('category');
        });

        Schema::table('transactions', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('date');
            $table->index('type');
            $table->index(['user_id', 'date']);
        });

        Schema::table('recurring_expenses', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('active');
        });
    }

    public function down(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['first_due_date']);
            $table->dropIndex(['category']);
        });

        Schema::table('transactions', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['date']);
            $table->dropIndex(['type']);
            $table->dropIndex(['user_id', 'date']);
        });

        Schema::table('recurring_expenses', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['active']);
        });
    }
};
