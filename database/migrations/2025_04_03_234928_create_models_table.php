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
        Schema::create('models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('color_scheme_id')->constrained();
            $table->string('name', 50)->unique();
            $table->text('description')->nullable();
            $table->string('file_3d', 255);
            $table->string('preview_url', 255)->nullable();
            $table->string('author', 100)->nullable();
            $table->decimal('scale', 5, 2)->default(1.0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('models');
    }
};
