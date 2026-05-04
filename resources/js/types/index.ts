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
};
