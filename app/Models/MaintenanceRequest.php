<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    protected $table      = 'maintenance_request';
    protected $primaryKey = 'maintenance_request_id';
    public $timestamps    = false;

    protected $fillable = [
        'user_id', 'location_id', 'issue_category',
        'issue_name', 'equipment_name', 'issue_description',
        'date_submitted', 'status',
    ];

    // User who submitted the request
    public function user()
    {
        return $this->belongsTo(UserInformation::class, 'user_id');
    }

    // Location where the issue was reported
    public function location()
    {
        return $this->belongsTo(FacilityLocationDetails::class, 'location_id');
    }

    // Uploaded images for this request
    public function images()
    {
        return $this->hasMany(MaintenanceImage::class, 'maintenance_request_id');
    }

    // Maintenance records (completed work logs)
    public function records()
    {
        return $this->hasMany(MaintenanceRecord::class, 'maintenance_request_id');
    }

    // Status history updates
    public function statusUpdates()
    {
        return $this->hasMany(RequestStatusUpdate::class, 'maintenance_request_id');
    }
}