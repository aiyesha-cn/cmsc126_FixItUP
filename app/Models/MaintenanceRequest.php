<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    protected $table = 'maintenance_request';
    protected $primaryKey = 'maintenance_request_id';
    public $timestamps = false;

    public function user() {
        return $this->belongsTo(UserInformation::class, 'user_id');
    }

    public function location() {
        return $this->belongsTo(FacilityLocation::class, 'location_id');
    }

    public function images() {
        return $this->hasMany(MaintenanceImage::class, 'maintenance_request_id');
    }

    public function records() {
        return $this->hasMany(MaintenanceRecord::class, 'maintenance_request_id');
    }

    public function statusUpdates() {
        return $this->hasMany(RequestStatusUpdate::class, 'maintenance_request_id');
    }
}
