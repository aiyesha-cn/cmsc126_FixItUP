<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class UserInformation extends Authenticatable
{
    protected $table = 'user_information';

    protected $primaryKey = 'user_id';

    public $timestamps = false;

    protected $fillable = [
        'user_first_name',
        'user_last_name',
        'role',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function getNameAttribute(): string
    {
        return $this->user_first_name . ' ' . $this->user_last_name;
    }

}
