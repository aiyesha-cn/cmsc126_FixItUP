<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacilityLocationDetals extends Model
{
    protected $table = 'facility_location_details';
    protected $primaryKey = 'location_id';
    public $timestamps = false;

    public function maintenanceRequests() {
        return $this->hasMany(MaintenanceRequest::class, 'location_id');
    }

    public function records() {
        return $this->hasMany(MaintenanceRecord::class, 'location_id');
    }
}