import { router } from '@inertiajs/react';
import { Delete } from 'lucide-react';
import { useRef } from 'react';
import { route } from 'ziggy-js';
import type { Filters } from '@/types';

export function Search({ filters }: { filters: Filters }) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleSearch(value: string) {
        router.get(
            route('home'),
            { search: value },
            { preserveState: true, preserveScroll: true },
        );
    }

    return (
        <div>
            <label htmlFor="search" className="font-medium">
                Search for a character trait
            </label>
            <div className="mt-2 flex items-center gap-4">
                <input
                    ref={inputRef}
                    id="search"
                    name="search"
                    type="text"
                    placeholder="playful..."
                    defaultValue={filters.search}
                    className="w-full max-w-80 bg-white px-4 py-2 ring ring-black/5 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                    onClick={() => {
                        inputRef.current?.focus();
                    }}
                    className="inline-block rounded bg-cyan-300 px-4 py-2 !pr-3 !pl-2.5 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                    <Delete />
                </button>
            </div>
        </div>
    );
}
