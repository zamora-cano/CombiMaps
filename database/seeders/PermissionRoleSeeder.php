<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Mapeo de permisos por rol
     * 
     * @var array
     */
    protected $rolePermissionMap = [
        'admin' => [
            'create-users',
            'edit-users',
            'delete-users',
            'view-users',
            'manage-roles',
            'manage-permissions'
        ],
        'user' => [
            'view-profile',
            'edit-profile'
        ]
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar que existan roles y permisos
        if (Role::count() === 0 || Permission::count() === 0) {
            $this->command->error('Primero debe crear roles y permisos!');
            return;
        }

        $this->assignMappedPermissions();
        
        // Solo en desarrollo, asignar algunos permisos aleatorios adicionales
        if (app()->environment('local')) {
            $this->assignRandomPermissions();
        }
    }

    /**
     * Asigna permisos según el mapeo definido
     */
    protected function assignMappedPermissions(): void
    {
        foreach ($this->rolePermissionMap as $roleName => $permissionNames) {
            $role = Role::where('name', $roleName)->first();

            if (!$role) {
                $this->command->warn("El rol {$roleName} no existe, omitiendo...");
                continue;
            }

            $permissions = Permission::whereIn('name', $permissionNames)->get();
            
            if ($permissions->isEmpty()) {
                $this->command->warn("No se encontraron permisos para el rol {$roleName}, omitiendo...");
                continue;
            }

            $role->permissions()->syncWithoutDetaching($permissions);
            $this->command->info("Asignados {$permissions->count()} permisos al rol {$roleName}");
        }
    }

    /**
     * Asigna permisos aleatorios adicionales (solo para desarrollo)
     */
    protected function assignRandomPermissions(): void
    {
        $roles = Role::all();
        $permissions = Permission::all();
        $minPermissions = min(3, $permissions->count()); // Asegurar no pedir más de los disponibles

        foreach ($roles as $role) {
            $currentPermissions = $role->permissions->pluck('id');
            $availablePermissions = $permissions->whereNotIn('id', $currentPermissions);
            
            if ($availablePermissions->isEmpty()) {
                continue;
            }

            $count = min(rand(1, 3), $availablePermissions->count());
            $randomPermissions = $availablePermissions->random($count);
            
            $role->permissions()->syncWithoutDetaching($randomPermissions);
            
            $this->command->info("Asignados {$count} permisos aleatorios adicionales al rol {$role->name}");
        }
    }
}