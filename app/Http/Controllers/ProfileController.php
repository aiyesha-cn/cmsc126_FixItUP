<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'user_first_name' => 'required|string',
            'user_last_name'  => 'required|string',
            'email'           => 'required|email|unique:user_information,email,' . $user->user_id . ',user_id',
            'photo'           => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            // Delete old photo if it exists
            if ($user->photo_path) {
                \Storage::disk('public')->delete($user->photo_path);
            }

            $validated['photo_path'] = $request->file('photo')->store('profile-photos', 'public');
        }

        unset($validated['photo']);
        $user->update($validated);

        return back()->with('success', 'Profile updated!');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors([
                'current_password' => 'Current password is incorrect.',
            ]);
        }

        $user->update([
            'password' => $request->password,
        ]);

        return back()->with('success', 'Password updated!');
    }
}