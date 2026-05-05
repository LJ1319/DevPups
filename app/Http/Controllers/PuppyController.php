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
    public function index(Request $request): Response
    {
        $search = $request->search;

        $puppies = Puppy::query()
            ->when($request->has('search'),
                fn ($query) => $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('trait', 'like', '%'.$search.'%')
            )
            ->with(['user', 'likedBy'])
            ->get();

        return Inertia::render('puppies/index', [
            'puppies' => PuppyResource::collection($puppies),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function like(Request $request, Puppy $puppy): RedirectResponse
    {
        $puppy->likedBy()->toggle($request->user()->id);

        return back();
    }
}
