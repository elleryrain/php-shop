import { Head, Link, useForm } from '@inertiajs/react';
import { productImageUrl } from '@/lib/product-image';
import type { FormEvent } from 'react';

type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string;
    old_price: string | null;
    image: string | null;
    stock_qty: number;
    is_new: boolean;
    is_hit: boolean;
    is_sale: boolean;
    category: { id: number; name: string; slug: string };
    brand: { id: number; name: string; slug: string } | null;
};

type Props = {
    product: Product;
    auth: {
        user: {
            name: string;
            email: string;
        } | null;
    };
    flash: {
        success?: string;
        error?: string;
    };
};

export default function CatalogShow({ product, auth, flash }: Props) {
    const form = useForm({
        customer_name: auth.user?.name ?? '',
        customer_phone: '',
        customer_email: auth.user?.email ?? '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(`/buy/${product.slug}`, { preserveScroll: true });
    };

    return (
        <>
            <Head title={product.name} />
            <div className="mx-auto max-w-3xl space-y-5 p-6">
                <Link href="/catalog" className="text-sm text-gray-600 hover:text-black">
                    Назад в каталог
                </Link>

                {flash.success ? <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">{flash.success}</div> : null}
                {flash.error ? <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{flash.error}</div> : null}

                <article className="space-y-4 rounded-lg border border-gray-200 p-6">
                    <img src={productImageUrl(product.image)} alt={product.name} className="h-72 w-full rounded object-cover" />

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">{product.name}</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                {product.category.name}
                                {product.brand ? ` / ${product.brand.name}` : ''}
                            </p>
                        </div>
                        <div className="flex gap-1 text-xs">
                            {product.is_new ? <span className="rounded bg-green-100 px-2 py-0.5">новинка</span> : null}
                            {product.is_hit ? <span className="rounded bg-blue-100 px-2 py-0.5">хит</span> : null}
                            {product.is_sale ? <span className="rounded bg-red-100 px-2 py-0.5">акция</span> : null}
                        </div>
                    </div>

                    <p className="text-sm text-gray-700">{product.description ?? 'Описание пока не добавлено.'}</p>

                    <div className="rounded-md bg-gray-50 p-4">
                        <p className="text-sm">
                            {product.old_price ? <span className="mr-2 line-through text-gray-500">{product.old_price}</span> : null}
                            <span className="text-lg font-semibold">{product.price}</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-600">В наличии: {product.stock_qty}</p>
                    </div>
                </article>

                <section className="rounded-lg border border-gray-200 p-6">
                    <h2 className="mb-3 text-xl font-semibold">Быстрый заказ 1 шт.</h2>

                    <form onSubmit={submit} className="space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <label className="space-y-1">
                                <span className="text-sm">Имя</span>
                                <input
                                    value={form.data.customer_name}
                                    onChange={(event) => form.setData('customer_name', event.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                                />
                            </label>

                            <label className="space-y-1">
                                <span className="text-sm">Телефон</span>
                                <input
                                    value={form.data.customer_phone}
                                    onChange={(event) => form.setData('customer_phone', event.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                                />
                            </label>
                        </div>

                        <label className="space-y-1 block">
                            <span className="text-sm">Email (необязательно)</span>
                            <input
                                type="email"
                                value={form.data.customer_email}
                                onChange={(event) => form.setData('customer_email', event.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </label>

                        {Object.keys(form.errors).length > 0 ? (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                                {Object.values(form.errors).map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        ) : null}

                        <button type="submit" disabled={form.processing} className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-60">
                            Купить 1 товар
                        </button>
                    </form>
                </section>
            </div>
        </>
    );
}
