<?php

namespace App\Http\Controllers;

use App\Http\Resources\PuppyResource;
use App\Models\Puppy;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\Format;
use Intervention\Image\ImageManager;

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
            ->latest()
            ->paginate(9)
            ->withQueryString();

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

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'trait' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $manager = ImageManager::usingDriver(Driver::class);

            $image = $manager->decodePath($request->image);

            if ($image->width() > 1000) {
                $image->scale(width: 1000);
            }

            $webpEncoded = $image->encodeUsingFormat(Format::WEBP, 95)->toString();

            $fileName = Str::random().'.webp';

            $path = 'puppies/'.$fileName;

            $stored = Storage::disk('public')->put($path, $webpEncoded);

            if (! $stored) {
                return back()->withErrors(['image' => 'Failed to upload imag.']);
            }

            $image_url = Storage::url($path);
        }

        $request->user()->puppies()->create([
            'name' => $request->name,
            'trait' => $request->trait,
            'image_url' => $image_url,
        ]);

        return back()->with('success', 'Puppy created successfully!');
    }
}
