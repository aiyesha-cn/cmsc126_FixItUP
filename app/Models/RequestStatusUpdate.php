<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestStatusUpdate extends Model
{
    protected $table = 'request_status_upadate'; // keep this EXACT
    protected $primaryKey = 'status_id';
    public $timestamps = false;

    public function request() {
        return $this->belongsTo(MaintenanceRequest::class, 'maintenance_request_id');
    }

    public function location() {
        return $this->belongsTo(FacilityLocation::class, 'location_id');
    }

    public function updatedBy() {
        return $this->belongsTo(UserInformation::class, 'updated_by');
    }
}
