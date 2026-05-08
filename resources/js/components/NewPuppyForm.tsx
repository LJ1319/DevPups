import { useForm } from '@inertiajs/react';
import type { RefObject } from 'react';
import { useRef } from 'react';
import { route } from 'ziggy-js';
import { ImageUploadPreview } from '@/components/IamgeUploadPreview';

export function NewPuppyForm({
    mainRef,
}: {
    mainRef: RefObject<HTMLElement | null>;
}) {
    const { data, processing, errors, setData, post, reset } = useForm({
        name: '',
        trait: '',
        image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleCreate() {
        post(route('puppies.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                if (mainRef?.current) {
                    mainRef.current.scrollIntoView({
                        block: 'start',
                        behavior: 'smooth',
                    });
                }
            },
        });
    }

    return (
        <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreate();
                }}
                className="mt-4 flex w-full flex-col items-start gap-4"
            >
                <div className="grid w-full gap-6 md:grid-cols-3">
                    <fieldset className="flex w-full flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                        {errors.name && (
                            <p className="empty:1 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </fieldset>
                    <fieldset className="flex w-full flex-col gap-1">
                        <label htmlFor="trait">Personality trait</label>
                        <input
                            id="trait"
                            name="trait"
                            type="text"
                            value={data.trait}
                            onChange={(e) => setData('trait', e.target.value)}
                            className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                        {errors.trait && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </fieldset>
                    <fieldset className="col-span-2 flex w-full flex-col gap-1">
                        <label htmlFor="image">Profile pic</label>
                        <input
                            ref={fileInputRef}
                            id="image"
                            name="image"
                            type="file"
                            onChange={(e) =>
                                setData(
                                    'image',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                        {errors.image && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                        <ImageUploadPreview
                            height={96}
                            className="self-start"
                            source={data.image}
                        />
                    </fieldset>
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-200"
                >
                    {processing ? `Adding ${data.name} puppy...` : 'Add puppy'}
                </button>
            </form>
        </div>
    );
}
