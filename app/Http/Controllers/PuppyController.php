<?php

namespace App\Http\Controllers;

use App\Http\Resources\PuppyResource;
use App\Models\Puppy;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PuppyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('puppies/index', [
            'puppies' => PuppyResource::collection(Puppy::all()->load(['user', 'likedBy'])),
        ]);
    }

    public function like(Request $request, Puppy $puppy): RedirectResponse
    {
        $puppy->likedBy()->toggle($request->user()->id);

        return back();
    }
}
