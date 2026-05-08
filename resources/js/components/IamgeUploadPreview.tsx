import type { ImgHTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ImageUploadPreview({
    source,
    className,
    ...restProps
}: {
    source: File | string | null;
    className?: string;
} & ImgHTMLAttributes<HTMLImageElement>) {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        if (source instanceof File) {
            const objectUrl = URL.createObjectURL(source);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSrc(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setSrc(source);
        }
    }, [source]);

    if (!src) {
        return null;
    }

    return (
        <img
            src={src}
            alt="image preview"
            className={cn('mt-4 h-24 rounded-md', className)}
            {...restProps}
        />
    );
}
