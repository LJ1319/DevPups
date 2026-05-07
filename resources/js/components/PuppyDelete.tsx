import { useForm } from '@inertiajs/react';
import { LoaderCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Puppy } from '@/types';

export function PuppyDelete({ puppy }: { puppy: Puppy }) {
    const [open, setOpen] = useState(false);
    const { processing, delete: destroy } = useForm();

    function handleDelete() {
        destroy(route('puppies.destory', puppy.id), {
            preserveScroll: true,
        });
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        size="icon"
                        variant="secondary"
                        aria-label="Delete puppy"
                        className="group/delete bg-background/30 hover:bg-background"
                    >
                        <Trash className="size-4 group-hover/delete:stroke-destructive" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Who in the right mind would delete such a cute
                            puppy? Seriously?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                        >
                            <Button
                                type="submit"
                                disabled={processing}
                                className="relative disabled:opacity-100"
                            >
                                {processing && (
                                    <div className="absolute inset-0 grid place-items-center">
                                        <LoaderCircle className="size-5 animate-spin stroke-primary-foreground" />
                                    </div>
                                )}
                                <span className={cn(processing && 'invisible')}>
                                    Delete {puppy.name}
                                </span>
                            </Button>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
