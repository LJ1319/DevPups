import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { NewPuppyForm } from '@/components/NewPuppyForm';
import { PageWrapper } from '@/components/PageWrapper';
import { PuppiesList } from '@/components/PuppiesList';
import { Search } from '@/components/Search';
import { Shortlist } from '@/components/Shortlist';
import type { Puppy } from '@/types';

export default function App({ puppies }: { puppies: Puppy[] }) {
    return (
        <PageWrapper>
            <Container>
                <Header />
                <Main puppies={puppies} />
            </Container>
        </PageWrapper>
    );
}

function Main({ puppies }: { puppies: Puppy[] }) {
    const { auth } = usePage().props;
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <main>
            <div className="mt-24 grid gap-8 sm:grid-cols-2">
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                {auth.user && <Shortlist puppies={puppies} />}
            </div>
            <PuppiesList puppies={puppies} searchQuery={searchQuery} />
            <NewPuppyForm puppies={puppies} />
        </main>
    );
}
