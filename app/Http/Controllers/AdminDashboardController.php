<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\UserInformation;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_users'    => UserInformation::count(),
                'open_requests'  => 0,
                'resolved_today' => 0,
                'pending_review' => 0,
            ],
            'recent_requests' => [],
        ]);
    }
}