<?php

namespace Database\Seeders;

use App\Models\UserInformation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        UserInformation::firstOrCreate(
            ['email' => 'admin@up.edu.ph'],
            [
                'user_first_name' => 'Admin',
                'user_last_name'  => 'User',
                'role'            => 'Administration',
                'password'        => bcrypt('123456'), 
            ]
        );
    }
}