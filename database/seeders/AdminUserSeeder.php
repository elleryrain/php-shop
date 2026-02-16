<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@shop.local'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin12345'),
                'is_admin' => true,
            ]
        );
    }
}
