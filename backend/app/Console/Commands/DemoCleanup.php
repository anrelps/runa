<?php

namespace App\Console\Commands;

use App\Domain\User\Services\DemoService;
use Illuminate\Console\Command;

class DemoCleanup extends Command
{
    protected $signature = 'demo:cleanup';
    protected $description = 'Delete expired demo user accounts and their data';

    public function handle(DemoService $demoService): void
    {
        $count = $demoService->cleanupExpired();
        $this->info("Deleted {$count} expired demo account(s).");
    }
}
