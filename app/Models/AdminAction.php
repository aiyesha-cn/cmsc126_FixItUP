<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminAction extends Model
{
    protected $table      = 'admin_actions';
    protected $primaryKey = 'action_id';
    public $timestamps    = false;

    protected $fillable = [
        'admin_id', 'action_type', 'target_type',
        'target_id', 'action_note', 'performed_at',
    ];

    // Admin who performed the action
    public function admin()
    {
        return $this->belongsTo(UserInformation::class, 'admin_id', 'user_id');
    }
}