<?php

use App\Http\Controllers\PuppyController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PuppyController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::patch('puppies/{puppy}/like', [PuppyController::class, 'like'])->name('puppies.like');
    Route::post('puppies', [PuppyController::class, 'store'])->name('puppies.store');
});

require __DIR__.'/settings.php';
