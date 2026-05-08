import type { User } from '@/types/auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type Puppy = {
    id: number;
    name: string;
    trait: string;
    imageUrl: string;
    user: Pick<User, 'id' | 'name'>;
    likedBy: User['id'][];
    can: {
        update: boolean;
        delete: boolean;
    };
};

export type Filters = {
    search?: string;
    [key: string]: unknown;
};

export type PaginatedResponse<T> = {
    data: T[];
    meta: PaginationMeta;
    links: PaginationLinks;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginationMeta = {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
};

export type PaginationLinks = {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
};
