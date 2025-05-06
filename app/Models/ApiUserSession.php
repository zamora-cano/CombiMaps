<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApiUserSession extends Model
{
    protected $table = 'api_user_sessions';
    
    public $timestamps = false;
    
    protected $casts = [
        'last_activity' => 'datetime',
    ];
    
    protected $fillable = [
        'id',
        'api_user_id',
        'ip_address',
        'user_agent',
        'payload',
        'last_activity'
    ];
    
    public function apiUser()
    {
        return $this->belongsTo(ApiUser::class);
    }
}