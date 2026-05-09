<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceRecord extends Model
{
    protected $table = 'maintenance_records';
    protected $primaryKey = 'record_id';
    public $timestamps = false;

    public function request() {
        return $this->belongsTo(MaintenanceRequest::class, 'maintenance_request_id');
    }

    public function location() {
        return $this->belongsTo(FacilityLocation::class, 'location_id');
    }
}
