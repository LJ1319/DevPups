<?php

namespace App\Actions;

use Illuminate\Support\Str;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\Format;
use Intervention\Image\ImageManager;

class OptimizeWebpImageAction
{
    public function handle(string $input): array
    {
        $manager = ImageManager::usingDriver(Driver::class);

        $image = $manager->decodePath($input);

        if ($image->width() > 1000) {
            $image->scale(width: 1000);
        }

        $encoded = $image->encodeUsingFormat(Format::WEBP, 95)->toString();
        $fileName = Str::random().'.webp';

        return [
            'webpString' => $encoded,
            'fileName' => $fileName,
        ];
    }
}
