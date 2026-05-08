import { usePage } from '@inertiajs/react';
import { LikeToggle } from '@/components/LikeToggle';
import { PuppyUpdate } from '@/components/PuppyUpdate';
import type { Puppy } from '@/types';
import { PuppyDelete } from './PuppyDelete';

export function PuppyCard({ puppy }: { puppy: Puppy }) {
    const { auth } = usePage().props;

    return (
        <li
            key={puppy.id}
            className="relative overflow-clip rounded-lg bg-white shadow-md ring ring-black/5 hover:-translate-y-0.5"
        >
            {auth.user && (
                <div className="absolute top-2 right-2 flex items-center gap-x-2">
                    {puppy.can.update && <PuppyUpdate puppy={puppy} />}
                    {puppy.can.delete && <PuppyDelete puppy={puppy} />}
                </div>
            )}
            <img
                className="aspect-square object-cover"
                alt={puppy.name}
                src={puppy.imageUrl}
            />
            <div className="gap flex items-center justify-between p-4 text-sm">
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{puppy.name}</p>
                    <span className="text-slate-300">·</span>
                    <p className="text-slate-500">{puppy.trait}</p>
                </div>
                <LikeToggle puppy={puppy} />
            </div>
        </li>
    );
}
