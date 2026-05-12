<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\UserInformation;
use App\Models\MaintenanceRequest;
use App\Models\FlaggedReport;
use App\Models\AdminAction;

class AdminDashboardController extends Controller
{
    // Dashboard overview — stats, roles, locations, flags, activity
    public function index()
    {
        $stats = [
            'total_requests' => MaintenanceRequest::count(),
            'pending'        => MaintenanceRequest::where('status', 'Pending')->count(),
            'in_progress'    => MaintenanceRequest::where('status', 'Work-In-Progress')->count(),
            'resolved'       => MaintenanceRequest::where('status', 'Fixed')->count(),
        ];

        $users_by_role = UserInformation::select('role', DB::raw('count(*) as count'))
            ->groupBy('role')
            ->get()
            ->map(fn($r) => ['role' => $r->role, 'count' => $r->count]);

        $top_locations = MaintenanceRequest::with('location')
            ->whereIn('status', ['Pending', 'Work-In-Progress'])
            ->get()
            ->groupBy('location_id')
            ->map(fn($group) => [
                'location' => $group->first()->location?->location_name . ' - ' . $group->first()->location?->building_name,
                'open'     => $group->count(),
            ])
            ->sortByDesc('open')
            ->values()
            ->take(5);

        $pending_flags = FlaggedReport::with('request')
            ->where('status', 'Pending')
            ->latest('date_flagged')
            ->take(5)
            ->get()
            ->map(fn($f) => [
                'flag_id'      => 'FLAG-' . str_pad($f->flag_id, 3, '0', STR_PAD_LEFT),
                'issue_name'   => $f->request?->issue_name,
                'flag_reason'  => $f->flag_reason,
                'date_flagged' => $f->date_flagged,
            ]);

        $recent_activity = AdminAction::with('admin')
            ->latest('performed_at')
            ->take(5)
            ->get()
            ->map(fn($a) => [
                'action' => $a->action_type,
                'target' => $a->target_type . '-' . $a->target_id,
                'by'     => $a->admin?->user_first_name . ' ' . $a->admin?->user_last_name,
                'time'   => $a->performed_at,
            ]);

        return Inertia::render('Admin/Dashboard', compact(
            'stats', 'users_by_role', 'top_locations', 'pending_flags', 'recent_activity'
        ));
    }

    // All maintenance requests list
    public function Requests()
    {
        $requests = MaintenanceRequest::with('location', 'user')
            ->latest('date_submitted')
            ->get()
            ->map(fn($r) => [
                'raw_id'                 => $r->maintenance_request_id,
                'maintenance_request_id' => 'REQ-' . str_pad($r->maintenance_request_id, 3, '0', STR_PAD_LEFT),
                'issue_name'             => $r->issue_name,
                'issue_category'         => $r->issue_category,
                'equipment_name'         => $r->equipment_name,
                'location_display'       => $r->location?->location_name . ' - ' . $r->location?->building_name,
                'issue_description'      => $r->issue_description,
                'submitted_by'           => $r->user?->user_first_name . ' ' . substr($r->user?->user_last_name, 0, 1) . '.',
                'date_submitted'         => $r->date_submitted,
                'status'                 => $r->status,
            ]);

        return Inertia::render('Admin/Requests', ['requests' => $requests]);
    }

    // All flagged reports list
    public function FlagReports()
    {
        $flags = FlaggedReport::with('request', 'flaggedBy', 'reviewedBy')
            ->latest('date_flagged')
            ->get()
            ->map(fn($f) => [
                'raw_id'                 => $f->flag_id,
                'flag_id'                => 'FLAG-' . str_pad($f->flag_id, 3, '0', STR_PAD_LEFT),
                'maintenance_request_id' => 'REQ-' . str_pad($f->maintenance_request_id, 3, '0', STR_PAD_LEFT),
                'issue_name'             => $f->request?->issue_name,
                'flagged_by'             => $f->flaggedBy?->user_first_name . ' ' . $f->flaggedBy?->user_last_name,
                'flag_reason'            => $f->flag_reason,
                'flag_description'       => $f->flag_description,
                'status'                 => $f->status,
                'admin_note'             => $f->admin_note ?? '',
                'date_flagged'           => $f->date_flagged,
            ]);

        return Inertia::render('Admin/FlagReports', ['flags' => $flags]);
    }

    // Update request status and log the action
    public function updateRequestStatus(Request $request, $id)
    {
        $req = MaintenanceRequest::findOrFail($id);

        $request->validate([
            'status' => 'required|in:Pending,Work-In-Progress,Fixed',
        ]);

        $req->update(['status' => $request->status]);

        AdminAction::create([
            'admin_id'     => Auth::user()->user_id,
            'action_type'  => 'Status Update',
            'target_type'  => 'maintenance_request',
            'target_id'    => $id,
            'action_note'  => 'Status changed to ' . $request->status,
            'performed_at' => now(),
        ]);

        return back()->with('success', 'Status updated.');
    }

    // Delete request with all related records, then log the action
    public function deleteRequest($id)
    {
        $req = MaintenanceRequest::findOrFail($id);

        $req->statusUpdates()->delete();
        $req->images()->delete();
        $req->records()->delete();
        $req->delete();

        AdminAction::create([
            'admin_id'     => Auth::user()->user_id,
            'action_type'  => 'Request Deleted',
            'target_type'  => 'maintenance_request',
            'target_id'    => $id,
            'action_note'  => null,
            'performed_at' => now(),
        ]);

        return back()->with('success', 'Request deleted.');
    }

    // Update flag status and admin note, then log the action
    public function updateFlag(Request $request, $id)
    {
        $flag = FlaggedReport::findOrFail($id);

        $request->validate([
            'status'     => 'required|in:Pending,Reviewed,Dismissed,Action Taken',
            'admin_note' => 'nullable|string',
        ]);

        $flag->update([
            'status'      => $request->status,
            'admin_note'  => $request->admin_note,
            'reviewed_by' => Auth::user()->user_id,
            'reviewed_at' => now(),
        ]);

        AdminAction::create([
            'admin_id'     => Auth::user()->user_id,
            'action_type'  => 'Flag Reviewed',
            'target_type'  => 'flagged_report',
            'target_id'    => $id,
            'action_note'  => $request->admin_note,
            'performed_at' => now(),
        ]);

        return back()->with('success', 'Flag updated.');
    }
}