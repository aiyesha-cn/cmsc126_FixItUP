<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminDashboardController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
})->name('index');

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'));
    Route::get('/discover', fn() => Inertia::render('Discover'));
    Route::get('/my-requests', fn() => Inertia::render('MyRequests'));
    Route::get('/submit-request', fn() => Inertia::render('RequestSubmission'));
    Route::get('/profile', fn() => Inertia::render('Profile'));
    Route::post('/profile/update', [ProfileController::class, 'update']);
    Route::get('/settings', fn() => Inertia::render('Settings'));
    Route::post('/settings/password', [ProfileController::class, 'updatePassword']);
});

Route::middleware(['auth', 'role:Administration'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/requests', [AdminDashboardController::class, 'Requests'])->name('admin.requests');
    Route::get('/admin/flagreports', [AdminDashboardController::class, 'FlagReports'])->name('admin.flagreports');
});