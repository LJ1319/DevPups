export async function createPuppy(formData: FormData) {
    const response = await fetch('http://localhost:8001/api/puppies', {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();

        throw errorData;
    }

    const data = await response.json();

    return data;
}
