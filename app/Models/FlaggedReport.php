<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlaggedReport extends Model
{
    protected $table      = 'flagged_reports';
    protected $primaryKey = 'flag_id';
    public $timestamps    = false;

    protected $fillable = [
        'maintenance_request_id', 'flagged_by', 'flag_reason',
        'flag_description', 'status', 'reviewed_by',
        'reviewed_at', 'admin_note', 'date_flagged',
    ];

    // The request that was flagged
    public function request()
    {
        return $this->belongsTo(MaintenanceRequest::class, 'maintenance_request_id', 'maintenance_request_id');
    }

    // User who submitted the flag
    public function flaggedBy()
    {
        return $this->belongsTo(UserInformation::class, 'flagged_by', 'user_id');
    }

    // Admin who reviewed the flag
    public function reviewedBy()
    {
        return $this->belongsTo(UserInformation::class, 'reviewed_by', 'user_id');
    }
}