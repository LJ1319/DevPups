<?php

use App\Http\Resources\PuppyResource;
use App\Models\Puppy;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome', [
    'puppies' => PuppyResource::collection(Puppy::all()->load(['user'])),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
