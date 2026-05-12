<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestStatusUpdate extends Model
{
    protected $table      = 'request_status_update';
    protected $primaryKey = 'status_id';
    public $timestamps    = false;

    protected $fillable = [
        'maintenance_request_id', 'status',
        'updated_by', 'update_note', 'date_updated',
    ];

    // The request this status update belongs to
    public function request()
    {
        return $this->belongsTo(MaintenanceRequest::class, 'maintenance_request_id');
    }

    // Location reference on the status update
    public function location()
    {
        return $this->belongsTo(FacilityLocationDetails::class, 'location_id');
    }

    // Admin or user who made the update
    public function updatedBy()
    {
        return $this->belongsTo(UserInformation::class, 'updated_by');
    }
}