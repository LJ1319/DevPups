import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

type FlashMessage = {
    flash: {
        success?: string;
        warning?: string;
        info?: string;
    };
};

export function PageWrapper({ children }: { children: ReactNode }) {
    const { flash, errors } = usePage<FlashMessage>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.warning) {
            toast.warning(flash.warning);
        }

        if (flash.info) {
            toast.info(flash.info);
        }

        if (errors) {
            Object.values(errors).forEach((error) => toast.error(error));
        }
    });

    return (
        <>
            <div className="min-h-dvh bg-gradient-to-b from-cyan-200 to-white to-[60vh]">
                {children}
            </div>
            <Toaster position="top-center" richColors theme="light" />
        </>
    );
}
