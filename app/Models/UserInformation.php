<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class UserInformation extends Authenticatable
{
    protected $table = 'user_information';

    protected $primaryKey = 'user_id';

    public $timestamps = false;

    protected $fillable = [
        'name',
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

}
