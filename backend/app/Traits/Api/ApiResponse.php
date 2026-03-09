<?php

namespace App\Traits\Api;

trait ApiResponse {

    public function successResponse(mixed $data, int $status = 200) {
        return response()->json([
            'success' => true,
            'data' => $data,
        ], $status);
    }

    public function errorResponse(string $message, int $status = 500) {
        return response()->json([
            'success' => false,
            'error' => $message,
        ], $status);
    }
}
