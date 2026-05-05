import { useForm, usePage } from '@inertiajs/react';
import { Heart, LoaderCircle } from 'lucide-react';
import { route } from 'ziggy-js';
import { cn } from '@/lib/utils';
import type { Puppy } from '@/types';

export function LikeToggle({ puppy }: { puppy: Puppy }) {
    const { auth } = usePage().props;
    const { processing, patch } = useForm();

    function handleSubmit(id: number) {
        patch(route('puppies.like', id), {
            preserveScroll: true,
        });
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(puppy.id);
            }}
        >
            <button
                type="submit"
                className={cn('group', !auth.user && 'cursor-not-allowed')}
                disabled={!auth.user || processing}
            >
                {processing ? (
                    <LoaderCircle className="animate-spin stroke-slate-300" />
                ) : (
                    <Heart
                        className={
                            auth.user && puppy.likedBy.includes(auth.user.id)
                                ? 'fill-pink-500 stroke-none'
                                : 'stroke-slate-200 group-hover:stroke-slate-300'
                        }
                    />
                )}
            </button>
        </form>
    );
}
