<?php

namespace App\Http\Controllers\User;

use App\Domain\User\Services\DemoService;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\JsonResponse;

class DemoController extends Controller
{
    public function __construct(
        private DemoService $demoService,
    ) {}

    public function create(): JsonResponse
    {
        $result = $this->demoService->createDemoSession();

        return response()->json([
            'user' => new UserResource($result['user']),
            'token' => $result['token'],
        ], 201);
    }
}
