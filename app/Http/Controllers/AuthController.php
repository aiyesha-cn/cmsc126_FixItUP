<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserInformation;

class AuthController extends Controller
{
    public function showLogin() {
        return view('auth.login');
    }

    public function login(Request $request){

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();

            $user = Auth::user();

            if ($user->role === 'Administration') {
                return redirect('/admin/dashboard');
            }

            return redirect('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Invalid email or password.',
        ]);
    }

    public function showRegister() {
        return view('auth.register');
    }

    public function register(Request $request) {

        $validated = $request->validate([
            'user_first_name' => 'required',
            'user_last_name' => 'required',
            'role' => 'required|in:Student,Faculty,Administration,Staff,Other',
            'email' => 'required|email|unique:user_information|ends_with:@up.edu.ph',
            'password' => 'required|min:6',
        ]);

        $user = UserInformation::create($validated);

        Auth::login($user);

        if ($user->role === 'Administration') {
            return redirect('/admin/dashboard');
        }

        return redirect('/dashboard');
    }

    public function logout(Request $request) {

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}