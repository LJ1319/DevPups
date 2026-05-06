<?php

namespace App\Console\Commands;

use App\Models\Puppy;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

#[Signature('app:delete-unused-puppy-images')]
#[Description('Clean up uploaded images that are no longer referenced in the database.')]
class DeleteUnusedPuppyImages extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $storedImages = Storage::disk('public')->files('puppies');

        $usedImages = Puppy::pluck('image_url')
            ->map(fn ($url) => str_replace('/storage/', '', $url))
            ->toArray();

        $unusedImages = array_diff($storedImages, $usedImages);

        $totalCount = count($unusedImages);

        if ($totalCount === 0) {
            $this->info('No unused images found!');

            return;
        }

        $this->info('Found '.$totalCount.' unused images.');

        $firstThree = array_slice($unusedImages, 0, 3);

        foreach ($firstThree as $image) {
            $this->line('- '.$image);
        }

        if ($totalCount > 3) {
            $remaining = $totalCount - 3;
            $this->line("+ {$remaining} more...");
        }

        if ($this->confirm('Do you want to delete these unused images?')) {
            foreach ($unusedImages as $image) {
                Storage::disk('public')->delete($image);
                $this->info('Deleted: '.$image);
            }
            $this->info('Unused images deleted successfully.');
        } else {
            $this->info('Operation cancelled.');
        }
    }
}
