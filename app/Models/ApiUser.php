<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class ApiUser extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'api_users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role_id',
        'first_name',
        'last_name',
        'mothers_last_name',
        'email',
        'password',
        'birth_date',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'verified' => 'boolean',
        'verified_at' => 'datetime',
        'birth_date' => 'date',
    ];

    /**
     * Get the role that belongs to the api user.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the email address for password reset.
     */
    public function getEmailForPasswordReset()
    {
        return $this->email;
    }

    /**
     * Send the password reset notification.
     */
    public function sendPasswordResetNotification($token)
    {
        // Implementa tu lógica de notificación aquí
        // Puedes crear un notificador específico para ApiUser
    }

    /**
     * Get the sessions for the api user.
     */
    public function sessions()
    {
        return $this->hasMany(ApiUserSession::class, 'api_user_id');
    }
}