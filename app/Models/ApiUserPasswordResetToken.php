<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApiUserPasswordResetToken extends Model
{
    protected $table = 'api_user_password_reset_tokens';
    
    public $timestamps = false;
    
    protected $fillable = [
        'email',
        'token',
        'created_at'
    ];
}