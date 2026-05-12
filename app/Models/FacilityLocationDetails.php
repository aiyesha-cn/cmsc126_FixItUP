<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacilityLocationDetails extends Model
{
    protected $table      = 'facility_location_details';
    protected $primaryKey = 'location_id';
    public $timestamps    = false;

    protected $fillable = [
        'location_name',
        'building_name',
        'room_details',
        'location_description',
    ];

    // Requests submitted at this location
    public function maintenanceRequests()
    {
        return $this->hasMany(MaintenanceRequest::class, 'location_id');
    }

    // Maintenance records completed at this location
    public function records()
    {
        return $this->hasMany(MaintenanceRecord::class, 'location_id');
    }
}