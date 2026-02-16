import { Head, Link } from '@inertiajs/react';
import { productImageUrl } from '@/lib/product-image';

type Product = {
    id: number;
    name: string;
    slug: string;
    price: string;
    old_price: string | null;
    image: string | null;
};

type Category = {
    id: number;
    name: string;
    slug: string;
};

type Brand = {
    id: number;
    name: string;
    slug: string;
};

type Props = {
    newProducts: Product[];
    hitProducts: Product[];
    saleProducts: Product[];
    categories: Category[];
    popularBrands: Brand[];
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            is_admin?: boolean;
        } | null;
    };
};

function ProductGrid({ title, products }: { title: string; products: Product[] }) {
    return (
        <section className="space-y-3">
            <h2 className="text-xl font-semibold">{title}</h2>
            {products.length === 0 ? (
                <p className="text-sm text-gray-500">Пока нет товаров.</p>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/catalog/${product.slug}`}
                            className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400"
                        >
                            <img src={productImageUrl(product.image)} alt={product.name} className="mb-3 h-36 w-full rounded object-cover" />
                            <p className="font-medium">{product.name}</p>
                            <p className="mt-2 text-sm">
                                {product.old_price ? <span className="mr-2 line-through text-gray-500">{product.old_price}</span> : null}
                                <span className="font-semibold">{product.price}</span>
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}

export default function Home({ newProducts, hitProducts, saleProducts, categories, popularBrands, auth }: Props) {
    return (
        <>
            <Head title="Главная" />
            <div className="mx-auto max-w-6xl space-y-8 p-6">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">PHP Shop</h1>
                        <p className="text-sm text-gray-600">Интернет-магазин</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {auth.user?.is_admin ? (
                            <Link href="/admin/products" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
                                Админка
                            </Link>
                        ) : null}
                        {auth.user ? (
                            <Link href="/logout" method="post" as="button" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
                                Выйти
                            </Link>
                        ) : (
                            <>
                                <Link href="/register" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
                                    Регистрация
                                </Link>
                                <Link href="/login" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
                                    Войти
                                </Link>
                            </>
                        )}
                        <Link href="/catalog" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
                            Каталог
                        </Link>
                    </div>
                </header>

                <section className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Категории</h2>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/catalog?category=${encodeURIComponent(category.slug)}`}
                                    className="rounded-md bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Популярные бренды</h2>
                        <div className="flex flex-wrap gap-2">
                            {popularBrands.map((brand) => (
                                <Link
                                    key={brand.id}
                                    href={`/catalog?brand=${encodeURIComponent(brand.slug)}`}
                                    className="rounded-md bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                                >
                                    {brand.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <ProductGrid title="Новинки" products={newProducts} />
                <ProductGrid title="Лидеры продаж" products={hitProducts} />
                <ProductGrid title="Распродажа" products={saleProducts} />
            </div>
        </>
    );
}
