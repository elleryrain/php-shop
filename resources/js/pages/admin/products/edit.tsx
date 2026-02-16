import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type Option = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    category_id: number;
    brand_id: number | null;
    name: string;
    description: string | null;
    price: string;
    old_price: string | null;
    stock_qty: number;
    image: string | null;
    is_active: boolean;
    is_new: boolean;
    is_hit: boolean;
    is_sale: boolean;
};

type Props = {
    product: Product;
    categories: Option[];
    brands: Option[];
};

export default function AdminProductsEdit({ product, categories, brands }: Props) {
    const form = useForm({
        category_id: product.category_id.toString(),
        brand_id: product.brand_id ? product.brand_id.toString() : '',
        name: product.name,
        description: product.description ?? '',
        price: product.price,
        old_price: product.old_price ?? '',
        stock_qty: product.stock_qty.toString(),
        image: product.image ?? '',
        is_active: product.is_active,
        is_new: product.is_new,
        is_hit: product.is_hit,
        is_sale: product.is_sale,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.transform((data) => ({
            ...data,
            category_id: Number(data.category_id),
            brand_id: data.brand_id ? Number(data.brand_id) : null,
            price: Number(data.price),
            old_price: data.old_price ? Number(data.old_price) : null,
            stock_qty: Number(data.stock_qty),
        }));
        form.put(`/admin/products/${product.id}`);
    };

    return (
        <>
            <Head title={`Редактирование: ${product.name}`} />
            <div className="mx-auto max-w-3xl space-y-4 p-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Редактирование товара</h1>
                    <Link href="/admin/products" className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100">
                        Назад
                    </Link>
                </header>

                <form onSubmit={submit} className="space-y-4 rounded-lg border border-gray-200 p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-1">
                            <span className="text-sm">Название</span>
                            <input
                                value={form.data.name}
                                onChange={(event) => form.setData('name', event.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </label>

                        <label className="space-y-1">
                            <span className="text-sm">Категория</span>
                            <select
                                value={form.data.category_id}
                                onChange={(event) => form.setData('category_id', event.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="space-y-1">
                            <span className="text-sm">Бренд</span>
                            <select
                                value={form.data.brand_id}
                                onChange={(event) => form.setData('brand_id', event.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            >
                                <option value="">Без бренда</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="space-y-1">
                            <span className="text-sm">Цена</span>
                            <input
                                type="number"
                                step="0.01"
                                value={form.data.price}
                                onChange={(event) => form.setData('price', event.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </label>

                        <label className="space-y-1">
                            <span className="text-sm">Старая цена</span>
                            <input
                                type="number"
                                step="0.01"
                                value={form.data.old_price}
                                onChange={(event) => form.setData('old_price', event.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </label>

                        <label className="space-y-1">
                            <span className="text-sm">Остаток</span>
                            <input
                                type="number"
                                value={form.data.stock_qty}
                                onChange={(event) => form.setData('stock_qty', event.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </label>
                    </div>

                    <label className="space-y-1">
                        <span className="text-sm">Путь к изображению</span>
                        <input
                            value={form.data.image}
                            onChange={(event) => form.setData('image', event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </label>

                    <label className="space-y-1">
                        <span className="text-sm">Описание</span>
                        <textarea
                            rows={4}
                            value={form.data.description}
                            onChange={(event) => form.setData('description', event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </label>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={form.data.is_active}
                                onChange={(event) => form.setData('is_active', event.target.checked)}
                            />
                            Активен
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={form.data.is_new} onChange={(event) => form.setData('is_new', event.target.checked)} />
                            Новинка
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={form.data.is_hit} onChange={(event) => form.setData('is_hit', event.target.checked)} />
                            Хит
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={form.data.is_sale} onChange={(event) => form.setData('is_sale', event.target.checked)} />
                            Акция
                        </label>
                    </div>

                    {Object.keys(form.errors).length > 0 ? (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                            {Object.values(form.errors).map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    ) : null}

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
                    >
                        Обновить товар
                    </button>
                </form>
            </div>
        </>
    );
}
