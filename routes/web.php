<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\RequestController;
use Inertia\Inertia;

// Public routes
Route::get('/', fn() => Inertia::render('Landing'))->name('index');

// Auth routes
Route::get('/login',    [AuthController::class, 'showLogin'])->name('login');
Route::post('/login',   [AuthController::class, 'login']);
Route::post('/logout',  [AuthController::class, 'logout'])->name('logout');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register',[AuthController::class, 'register']);

// User routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard',          [RequestController::class, 'dashboard'])->name('dashboard');
    Route::get('/discover',           [RequestController::class, 'discover'])->name('discover');
    Route::get('/my-requests',        [RequestController::class, 'myRequests'])->name('my-requests');
    Route::get('/submit-request',     [RequestController::class, 'showSubmit'])->name('submit-request');
    Route::post('/submit-request',    [RequestController::class, 'store'])->name('requests.store');
    Route::get('/requests/{id}/edit', [RequestController::class, 'edit'])->name('requests.edit');
    Route::put('/requests/{id}',      [RequestController::class, 'update'])->name('requests.update');
    Route::delete('/requests/{id}',   [RequestController::class, 'destroy'])->name('requests.destroy');
    Route::post('/flag-report',       [RequestController::class, 'flag'])->name('flag.store');
    Route::get('/profile',            fn() => Inertia::render('Profile'));
    Route::post('/profile/update',    [ProfileController::class, 'update']);
    Route::get('/settings',           fn() => Inertia::render('Settings'));
    Route::post('/settings/password', [ProfileController::class, 'updatePassword']);
});

// Admin routes
Route::middleware(['auth', 'role:Administration'])->group(function () {
    Route::get('/admin/dashboard',             [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/requests',              [AdminDashboardController::class, 'Requests'])->name('admin.requests');
    Route::get('/admin/flagreports',           [AdminDashboardController::class, 'FlagReports'])->name('admin.flagreports');
    Route::put('/admin/requests/{id}/status',  [AdminDashboardController::class, 'updateRequestStatus'])->name('admin.requests.status');
    Route::delete('/admin/requests/{id}',      [AdminDashboardController::class, 'deleteRequest'])->name('admin.requests.delete');
    Route::put('/admin/flagreports/{id}',      [AdminDashboardController::class, 'updateFlag'])->name('admin.flags.update');
    Route::delete('/admin/flagreports/{id}', [AdminDashboardController::class, 'deleteFlag']);
});