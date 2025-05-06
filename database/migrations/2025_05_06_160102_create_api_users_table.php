<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('api_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained('roles');
            
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('mothers_last_name', 50)->nullable();
            $table->string('email', 70)->unique();
            $table->string('password', 120);
            $table->date('birth_date')->nullable();
            $table->boolean('verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        // Tabla para password reset tokens de api_users
        Schema::create('api_user_password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Tabla para sesiones de api_users
        Schema::create('api_user_sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('api_user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_user_sessions');
        Schema::dropIfExists('api_user_password_reset_tokens');
        Schema::dropIfExists('api_users');
    }
};