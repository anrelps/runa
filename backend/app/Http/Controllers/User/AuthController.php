<?php

namespace App\Http\Controllers\User;

use App\Domain\User\DTOs\LoginUserDTO;
use App\Domain\User\DTOs\RegisterUserDTO;
use App\Domain\User\Services\UserService;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private UserService $userService,
    ) {}

    public function register(Request $request): JsonResponse {
        $input = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $result = $this->userService->register(
            RegisterUserDTO::fromRequest($input),
        );

        return response()->json([
            'user' => new UserResource($result['user']),
            'token' => $result['token'],
        ], 201);
    }

    public function login(Request $request): JsonResponse {
        $input = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $result = $this->userService->login(
            LoginUserDTO::fromRequest($input)
        );

        return response()->json([
            'user' => new UserResource($result['user']),
            'token' => $result['token'],
        ], 200);
    }

    public function logout() {
        $this->userService->logout();
        return response()->json(null, 204);
    }

    public function getProfile(Request $request) {
        return response()->json([
            'user' => new UserResource($request->user()),
        ], 200);
    }
}
