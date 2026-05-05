import { usePage } from '@inertiajs/react';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { NewPuppyForm } from '@/components/NewPuppyForm';
import { PageWrapper } from '@/components/PageWrapper';
import { PuppiesList } from '@/components/PuppiesList';
import { Search } from '@/components/Search';
import { Shortlist } from '@/components/Shortlist';
import type { Filters, PaginatedResponse, Puppy } from '@/types';

export default function App({
    puppies,
    filters,
}: {
    puppies: PaginatedResponse<Puppy>;
    filters: Filters;
}) {
    return (
        <PageWrapper>
            <Container>
                <Header />
                <Main puppies={puppies} filters={filters} />
            </Container>
        </PageWrapper>
    );
}

function Main({
    puppies,
    filters,
}: {
    puppies: PaginatedResponse<Puppy>;
    filters: Filters;
}) {
    const { auth } = usePage().props;

    return (
        <main>
            <div className="mt-24 grid gap-8 sm:grid-cols-2">
                <Search filters={filters} />
                {auth.user && <Shortlist puppies={puppies.data} />}
            </div>
            <PuppiesList puppies={puppies} />
            <NewPuppyForm puppies={puppies.data} />
        </main>
    );
}
