import type { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
    return <div className="mx-auto max-w-5xl p-4 md:p-8">{children}</div>;
}
