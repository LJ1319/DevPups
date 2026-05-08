import { useForm } from '@inertiajs/react';
import clsx from 'clsx';
import { EditIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { ImageUploadPreview } from '@/components/IamgeUploadPreview';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Puppy } from '@/types';

export function PuppyUpdate({ puppy }: { puppy: Puppy }) {
    const { data, setData, errors, post, processing } = useForm({
        name: puppy.name,
        trait: puppy.trait,
        image: null as File | null,
        _method: 'PUT',
    });

    const [open, setOpen] = useState(false);

    function handleUpdate() {
        post(route('puppies.update', puppy.id), {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="group/update bg-background/30 hover:bg-background"
                    size="icon"
                    variant="secondary"
                    aria-label="Update puppy"
                >
                    <EditIcon className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit {puppy.name}</DialogTitle>
                <DialogDescription>
                    Make changes to your puppy’s information below.
                </DialogDescription>
                <form
                    className="flex flex-col gap-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate();
                    }}
                >
                    <fieldset>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Full name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </fieldset>

                    <fieldset>
                        <Label htmlFor="trait">Personality trait</Label>
                        <Input
                            id="trait"
                            className="mt-1 block w-full"
                            value={data.trait}
                            onChange={(e) => setData('trait', e.target.value)}
                            required
                            placeholder="Personality trait"
                        />
                        {errors.trait && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.trait}
                            </p>
                        )}
                    </fieldset>

                    <fieldset>
                        <Label htmlFor="image">Change image</Label>
                        <Input
                            id="image"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData(
                                    'image',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            placeholder="Profile picture"
                        />

                        {errors.image && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.image}
                            </p>
                        )}

                        <ImageUploadPreview
                            source={data.image ?? puppy.imageUrl}
                        />
                    </fieldset>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>

                        <Button
                            className="relative disabled:opacity-100"
                            disabled={processing}
                            type="submit"
                        >
                            {processing && (
                                <div className="absolute inset-0 grid place-items-center">
                                    <LoaderCircle className="size-5 animate-spin stroke-primary-foreground" />
                                </div>
                            )}
                            <span className={clsx(processing && 'invisible')}>
                                Update
                            </span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
