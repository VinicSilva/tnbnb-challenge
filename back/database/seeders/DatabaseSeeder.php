<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(1)->create([
            'name' => 'Admin bnb',
            'username' => 'adminbnb',
            'type' => 'admin',
            'password' => Hash::make('123456'),
            'email' => 'admin@bnb.com',
        ]);
    }
}
