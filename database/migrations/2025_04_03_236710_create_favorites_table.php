<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('route_id')->constrained();
            $table->timestamps();

            $table->unique(['user_id', 'route_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('favorites');
    }
};
