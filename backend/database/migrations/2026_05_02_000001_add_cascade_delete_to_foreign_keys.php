<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('recurring_expenses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('expense_installments', function (Blueprint $table) {
            $table->dropForeign(['expense_id']);
            $table->foreign('expense_id')->references('id')->on('expenses')->onDelete('cascade');
        });

        Schema::table('recurring_expenses_entries', function (Blueprint $table) {
            $table->dropForeign(['recurring_expense_id']);
            $table->foreign('recurring_expense_id')->references('id')->on('recurring_expenses')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('recurring_expenses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('expense_installments', function (Blueprint $table) {
            $table->dropForeign(['expense_id']);
            $table->foreign('expense_id')->references('id')->on('expenses');
        });

        Schema::table('recurring_expenses_entries', function (Blueprint $table) {
            $table->dropForeign(['recurring_expense_id']);
            $table->foreign('recurring_expense_id')->references('id')->on('recurring_expenses');
        });
    }
};
