import { Head, Link, router } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    slug: string;
    price: string;
    stock_qty: number;
    is_active: boolean;
    category: { id: number; name: string } | null;
    brand: { id: number; name: string } | null;
};

type Pagination<T> = {
    data: T[];
    links: { active: boolean; label: string; url: string | null }[];
};

type Props = {
    products: Pagination<Product>;
};

export default function AdminProductsIndex({ products }: Props) {
    const remove = (id: number) => {
        if (!window.confirm('Удалить товар?')) {
            return;
        }

        router.delete(`/admin/products/${id}`);
    };

    return (
        <>
            <Head title="Админка: товары" />
            <div className="mx-auto max-w-6xl space-y-4 p-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Админка: товары</h1>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100">
                            Главная
                        </Link>
                        <Link
                            href="/admin/products/create"
                            className="rounded-md bg-black px-3 py-2 text-sm text-white hover:opacity-90"
                        >
                            Добавить товар
                        </Link>
                    </div>
                </header>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Название</th>
                                <th className="px-3 py-2">Категория</th>
                                <th className="px-3 py-2">Бренд</th>
                                <th className="px-3 py-2">Цена</th>
                                <th className="px-3 py-2">Остаток</th>
                                <th className="px-3 py-2">Активен</th>
                                <th className="px-3 py-2">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product) => (
                                <tr key={product.id} className="border-t border-gray-100">
                                    <td className="px-3 py-2">{product.id}</td>
                                    <td className="px-3 py-2">{product.name}</td>
                                    <td className="px-3 py-2">{product.category?.name ?? '-'}</td>
                                    <td className="px-3 py-2">{product.brand?.name ?? '-'}</td>
                                    <td className="px-3 py-2">{product.price}</td>
                                    <td className="px-3 py-2">{product.stock_qty}</td>
                                    <td className="px-3 py-2">{product.is_active ? 'Да' : 'Нет'}</td>
                                    <td className="px-3 py-2">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100"
                                            >
                                                Редактировать
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => remove(product.id)}
                                                className="rounded border border-red-300 px-2 py-1 text-red-700 hover:bg-red-50"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
