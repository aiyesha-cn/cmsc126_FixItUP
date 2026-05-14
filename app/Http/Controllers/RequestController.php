<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\MaintenanceRequest;
use App\Models\MaintenanceImage;
use App\Models\FacilityLocationDetails;
use App\Models\FlaggedReport;
use Inertia\Inertia;

class RequestController extends Controller
{
    // User dashboard — shows their own requests with images
    public function dashboard()
    {
        $user = Auth::user();

        $userRequests = MaintenanceRequest::where('user_id', $user->user_id)
            ->with('location', 'images')
            ->latest('date_submitted')
            ->get()
            ->map(fn($r) => [
                'maintenance_request_id' => 'REQ-' . str_pad($r->maintenance_request_id, 3, '0', STR_PAD_LEFT),
                'issue_name'             => $r->issue_name,
                'issue_category'         => $r->issue_category,
                'location_display'       => $r->location?->location_name . ' - ' . $r->location?->building_name,
                'status'                 => $r->status,
                'date_submitted'         => $r->date_submitted,
                'image_path'             => $r->images->where('is_primary', 1)->first()?->image_path,
                'raw_id'                 => $r->maintenance_request_id,
            ]);

        return Inertia::render('Dashboard', ['userRequests' => $userRequests]);
    }

    // Community discover — all pending/in-progress requests from all users
    public function discover()
    {
        $requests = MaintenanceRequest::with('location', 'user', 'images')
            ->whereIn('status', ['Pending', 'Work-In-Progress'])
            ->latest('date_submitted')
            ->get()
            ->map(fn($r) => [
                'maintenance_request_id' => 'REQ-' . str_pad($r->maintenance_request_id, 3, '0', STR_PAD_LEFT),
                'raw_id'                 => $r->maintenance_request_id,
                'issue_name'             => $r->issue_name,
                'issue_category'         => $r->issue_category,
                'issue_description'      => $r->issue_description,
                'location_display'       => $r->location?->location_name . ' - ' . $r->location?->building_name,
                'location_name'          => $r->location?->location_name, // for filter
                'submitted_by'           => $r->user?->user_first_name . ' ' . substr($r->user?->user_last_name, 0, 1) . '.',
                'user_role'              => $r->user?->role, // for filter
                'date_submitted'         => $r->date_submitted,
                'status'                 => $r->status,
                'image_path'             => $r->images->where('is_primary', 1)->first()?->image_path,
            ]);

        return Inertia::render('Discover', ['requests' => $requests]);
    }

    // My requests — current user's requests for management
    public function myRequests()
    {
        $user = Auth::user();

        $requests = MaintenanceRequest::where('user_id', $user->user_id)
            ->with('location')
            ->latest('date_submitted')
            ->get()
            ->map(fn($r) => [
                'maintenance_request_id' => 'REQ-' . str_pad($r->maintenance_request_id, 3, '0', STR_PAD_LEFT),
                'raw_id'                 => $r->maintenance_request_id,
                'issue_name'             => $r->issue_name,
                'issue_category'         => $r->issue_category,
                'issue_description'      => $r->issue_description,
                'location_display'       => $r->location?->location_name . ' - ' . $r->location?->building_name,
                'status'                 => $r->status,
                'date_submitted'         => $r->date_submitted,
            ]);

        return Inertia::render('MyRequests', ['myRequests' => $requests]);
    }

    // Show submission form
    public function showSubmit()
    {
        return Inertia::render('RequestSubmission');
    }

    // Store new request — create/find location, save request, handle image upload
    public function store(Request $request)
    {
        $validated = $request->validate([
            'issue_category'       => 'required|in:Facility,Appliance,Equipment,Flooring,Other',
            'issue_name'           => 'required|string|max:255',
            'equipment_name'       => 'nullable|string|max:255',
            'location_name'        => 'required|in:CSM,CHSS,Atrium,DHK,SOM,Sports Complex',
            'building_name'        => 'nullable|string|max:100',
            'room_details'         => 'nullable|string|max:100',
            'location_description' => 'nullable|string',
            'issue_description'    => 'required|string',
            'image_proof'          => 'nullable|image|max:5120',
        ]);

        $location = FacilityLocationDetails::firstOrCreate(
            [
                'location_name' => $validated['location_name'],
                'building_name' => $validated['building_name'] ?? '',
                'room_details'  => $validated['room_details'] ?? '',
            ],
            ['location_description' => $validated['location_description'] ?? '']
        );

        $req = MaintenanceRequest::create([
            'user_id'           => Auth::user()->user_id,
            'location_id'       => $location->location_id,
            'issue_category'    => $validated['issue_category'],
            'issue_name'        => $validated['issue_name'],
            'equipment_name'    => $validated['equipment_name'] ?? null,
            'issue_description' => $validated['issue_description'],
            'date_submitted'    => now(),
            'status'            => 'Pending',
        ]);

        if ($request->hasFile('image_proof')) {
            $path = $request->file('image_proof')->store('maintenance_images', 'public');
            MaintenanceImage::create([
                'maintenance_request_id' => $req->maintenance_request_id,
                'image_path'             => $path,
                'is_primary'             => 1,
                'uploaded_at'            => now(),
            ]);
        }

        return redirect('/dashboard')->with('success', 'Request submitted successfully.');
    }

    // Show edit form — only owner can edit
    public function edit($id)
    {
        $req = MaintenanceRequest::where('maintenance_request_id', $id)
            ->where('user_id', Auth::user()->user_id)
            ->with('location', 'images')
            ->firstOrFail();

        return Inertia::render('EditRequest', [
            'request' => [
                'raw_id'               => $req->maintenance_request_id,
                'issue_name'           => $req->issue_name,
                'issue_category'       => $req->issue_category,
                'equipment_name'       => $req->equipment_name ?? '',
                'issue_description'    => $req->issue_description,
                'location_name'        => $req->location?->location_name ?? '',
                'building_name'        => $req->location?->building_name ?? '',
                'room_details'         => $req->location?->room_details ?? '',
                'location_description' => $req->location?->location_description ?? '',
                'image_path'           => $req->images->where('is_primary', 1)->first()?->image_path,
            ],
        ]);
    }

    // Update request — only owner can update, replaces image if new one uploaded
    public function update(Request $request, $id)
    {
        $req = MaintenanceRequest::where('maintenance_request_id', $id)
            ->where('user_id', Auth::user()->user_id)
            ->firstOrFail();

        $validated = $request->validate([
            'issue_name'           => 'required|string|max:255',
            'issue_category'       => 'required|in:Facility,Appliance,Equipment,Flooring,Other',
            'equipment_name'       => 'nullable|string|max:255',
            'issue_description'    => 'required|string',
            'location_name'        => 'required|in:CSM,CHSS,Atrium,DHK,SOM,Sports Complex',
            'building_name'        => 'nullable|string|max:100',
            'room_details'         => 'nullable|string|max:100',
            'location_description' => 'nullable|string',
            'image_proof'          => 'nullable|image|max:5120',
        ]);

        $location = FacilityLocationDetails::firstOrCreate(
            [
                'location_name' => $validated['location_name'],
                'building_name' => $validated['building_name'] ?? '',
                'room_details'  => $validated['room_details'] ?? '',
            ],
            ['location_description' => $validated['location_description'] ?? '']
        );

        $req->update([
            'location_id'       => $location->location_id,
            'issue_category'    => $validated['issue_category'],
            'issue_name'        => $validated['issue_name'],
            'equipment_name'    => $validated['equipment_name'] ?? null,
            'issue_description' => $validated['issue_description'],
        ]);

        if ($request->hasFile('image_proof')) {
            $req->images()->where('is_primary', 1)->delete();
            $path = $request->file('image_proof')->store('maintenance_images', 'public');
            MaintenanceImage::create([
                'maintenance_request_id' => $req->maintenance_request_id,
                'image_path'             => $path,
                'is_primary'             => 1,
                'uploaded_at'            => now(),
            ]);
        }

        return redirect('/my-requests')->with('success', 'Request updated.');
    }

    // Delete request — only owner, cascades related records
    public function destroy($id)
    {
        $req = MaintenanceRequest::where('maintenance_request_id', $id)
            ->where('user_id', Auth::user()->user_id)
            ->firstOrFail();

        $req->statusUpdates()->delete();
        $req->images()->delete();
        $req->records()->delete();
        $req->delete();

        return back()->with('success', 'Request deleted.');
    }

    // Submit a flag report on a request
    public function flag(Request $request)
    {
        $validated = $request->validate([
            'maintenance_request_id' => 'required|exists:maintenance_request,maintenance_request_id',
            'flag_reason'            => 'required|in:Duplicate,Spam,False Report,Inappropriate Content,Already Fixed,Other',
            'flag_description'       => 'nullable|string',
        ]);

        FlaggedReport::create([
            'maintenance_request_id' => $validated['maintenance_request_id'],
            'flagged_by'             => Auth::user()->user_id,
            'flag_reason'            => $validated['flag_reason'],
            'flag_description'       => $validated['flag_description'] ?? null,
            'status'                 => 'Pending',
            'date_flagged'           => now(),
        ]);

        return back()->with('success', 'Report submitted.');
    }
}