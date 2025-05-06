<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar si el rol de admin existe
        $adminRole = Role::where('name', 'admin')->first();

        if (!$adminRole) {
            $this->command->error('El rol "admin" no existe. Creándolo...');
            $adminRole = Role::create([
                'name' => 'admin',
                'description' => 'Administrator'
            ]);
        }

        // Crear usuario administrador
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@a.com'],
            [
                'role_id' => $adminRole->id,
                'first_name' => 'Admin',
                'last_name_fat' => 'System',
                'last_name_mot' => null,
                'password' => Hash::make('admin'),
                'verified' => true,
                'verified_at' => Carbon::now(),
                'birth_date' => '1990-01-01'
            ]
        );

        if ($adminUser->wasRecentlyCreated) {
            $this->command->info('Usuario administrador creado exitosamente:');
            $this->command->line('- Email: admin@a.com');
            $this->command->line('- Password: admin');
        } else {
            $this->command->info('El usuario administrador ya existía en la base de datos.');
        }
    }
}