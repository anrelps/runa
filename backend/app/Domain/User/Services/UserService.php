<?php

namespace App\Domain\User\Services;

use App\Domain\User\DTOs\LoginUserDTO;
use App\Domain\User\DTOs\RegisterUserDTO;
use App\Domain\User\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserService {

    public function __construct(
        private UserRepositoryInterface $userRepository,
    ) {}

    public function register(RegisterUserDTO $dto) {
        $user = $this->userRepository->create($dto);
        $token = explode('|', $user->createToken('accessToken')->plainTextToken)[1];
        return ['user' => $user, 'token' => $token];
    }

    public function login(LoginUserDTO $dto) {
        if(!Auth::attempt(['email' => $dto->email, 'password' => $dto->password])) {
            throw ValidationException::withMessages([
                'email' => ['Incorrect Email or Password.'],
            ]);
        }

        $user = $this->userRepository->findByEmail($dto->email);
        $token = explode('|', $user->createToken('accessToken')->plainTextToken)[1];

        return ['user' => $user, 'token' => $token];
    }
}
