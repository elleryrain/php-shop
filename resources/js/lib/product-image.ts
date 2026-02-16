export function productImageUrl(image: string | null): string {
    if (!image) {
        return '/favicon.svg';
    }

    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')) {
        return image;
    }

    return `/storage/${image}`;
}
