import { useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { route } from 'ziggy-js';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { Puppy } from '@/types';

export function PuppyDelete({ puppy }: { puppy: Puppy }) {
    const { processing, delete: destroy } = useForm();

    function handleDelete() {
        destroy(route('puppies.destory', puppy.id), {
            preserveScroll: true,
        });
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        size="icon"
                        variant="destructive"
                        aria-label="Delete puppy"
                    >
                        <Trash className="size-4" />
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
                            <AlertDialogAction
                                type="submit"
                                disabled={processing}
                            >
                                {processing
                                    ? `Deleting ${puppy.name}`
                                    : `Delete ${puppy.name}`}
                            </AlertDialogAction>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
