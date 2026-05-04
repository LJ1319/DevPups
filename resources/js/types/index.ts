import type { User } from '@/types/auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';

export interface Puppy {
    id: number;
    name: string;
    trait: string;
    imageUrl: string;
    likedBy: User['id'][];
}
