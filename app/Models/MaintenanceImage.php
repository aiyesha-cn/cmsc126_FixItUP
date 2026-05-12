<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceImage extends Model
{
    protected $table      = 'maintenance_image';
    protected $primaryKey = 'image_id';
    public $timestamps    = false;

    protected $fillable = [
        'maintenance_request_id',
        'image_path',
        'image_description',
        'is_primary',
        'uploaded_at',
    ];

    // The request this image belongs to
    public function request()
    {
        return $this->belongsTo(MaintenanceRequest::class, 'maintenance_request_id');
    }
}