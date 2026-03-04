<?php

namespace App\Domain\User\Repositories\Eloquent;

use App\Domain\User\DTOs\RegisterUserDTO;
use App\Domain\User\Models\User;
use App\Domain\User\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface {
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function create(RegisterUserDTO $dto): User
    {
        return User::create([
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => bcrypt($dto->password),
        ]);
    }
}
