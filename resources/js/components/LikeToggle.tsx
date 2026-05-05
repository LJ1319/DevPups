import { Link, usePage } from '@inertiajs/react';
import { Heart, LoaderCircle } from 'lucide-react';
import { route } from 'ziggy-js';
import { cn } from '@/lib/utils';
import type { Puppy } from '@/types';

export function LikeToggle({ puppy }: { puppy: Puppy }) {
    const { auth } = usePage().props;

    return (
        <Link
            href={route('puppies.like', puppy.id)}
            method="patch"
            preserveScroll
            className={cn('group', !auth.user && 'cursor-not-allowed')}
            disabled={!auth.user}
        >
            <LoaderCircle className="hidden animate-spin stroke-slate-300 group-data-loading:block" />
            <Heart
                className={cn(
                    'group-data-loading:hidden',
                    auth.user && puppy.likedBy.includes(auth.user.id)
                        ? 'fill-pink-500 stroke-none'
                        : 'stroke-slate-200 group-hover:stroke-slate-300',
                )}
            />
        </Link>
    );
}
