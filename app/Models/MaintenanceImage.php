<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceImage extends Model
{
    protected $table = 'maintenance_image';
    protected $primaryKey = 'image_id';
    public $timestamps = false;

    public function request() {
        return $this->belongsTo(MaintenanceRequest::class, 'maintenance_request_id');
    }
}
