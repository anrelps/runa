<?php

namespace App\Domain\User\Services;

use App\Domain\User\Models\User;
use Database\Seeders\DemoSeeder;
use Illuminate\Support\Str;

class DemoService
{
    public function createDemoSession(): array
    {
        $user = User::create([
            'name' => 'Usuário',
            'email' => 'demo_' . Str::uuid() . '@runa.demo',
            'password' => bcrypt(Str::random(32)),
            'demo_expires_at' => now()->addHours(2),
        ]);

        (new DemoSeeder())->run($user);

        $token = explode('|', $user->createToken('demoToken')->plainTextToken)[1];

        return ['user' => $user, 'token' => $token];
    }

    public function cleanupExpired(): int
    {
        $expired = User::whereNotNull('demo_expires_at')
            ->where('demo_expires_at', '<=', now())
            ->get();

        foreach ($expired as $user) {
            $user->tokens()->delete();
            $user->delete();
        }

        return $expired->count();
    }
}
