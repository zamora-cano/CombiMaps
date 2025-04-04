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
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('model_id')->nullable()->constrained();
            $table->string('name', 100);
            $table->string('description', 200)->nullable();
            $table->string('origin', 100);
            $table->string('destination', 100);
            $table->decimal('base_price', 10, 2);
            $table->boolean('is_night')->default(false);
            $table->boolean('active')->default(true);
            $table->string('icon', 30)->nullable();
            $table->string('color_hex', 7);
            $table->boolean('premium_only')->default(false);
            $table->foreignId('creator_id')->constrained('users');
            $table->foreignId('editor_id')->nullable()->constrained('users');
            $table->foreignId('deleter_id')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routes');
    }
};
