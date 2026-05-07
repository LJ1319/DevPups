import { PuppyCard } from '@/components/PuppyCard';
import { Pagination } from '@/components/ui/pagination';
import type { PaginatedResponse, Puppy } from '@/types';

export function PuppiesList({
    puppies,
}: {
    puppies: PaginatedResponse<Puppy>;
}) {
    return (
        <>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {puppies.data.map((puppy) => (
                    <PuppyCard key={puppy.id} puppy={puppy} />
                ))}
            </ul>
            <Pagination
                meta={puppies.meta}
                links={puppies.links}
                className="mt-6"
            />
        </>
    );
}
