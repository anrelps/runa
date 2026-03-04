<?php

namespace App\Domain\User\Repositories\Contracts;

use App\Domain\User\DTOs\RegisterUserDTO;
use App\Domain\User\Models\User;

interface UserRepositoryInterface {
    public function findByEmail(string $email): ?User;
    public function create(RegisterUserDTO $dto): User;
}
