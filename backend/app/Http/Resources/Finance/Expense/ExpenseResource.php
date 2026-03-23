<?php

namespace App\Http\Resources\Finance\Expense;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'description' => $this->description,
            'category' => $this->category,
            'type' => $this->type,
            'total_amount' => $this->total_amount,
            'installment_count' => $this->installment_count,
            'first_due_date' => $this->first_due_date,
            'created_at' => $this->created_at,
        ];
    }
}