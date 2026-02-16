import { Head, Link, router } from '@inertiajs/react';
import { productImageUrl } from '@/lib/product-image';

type Product = {
    id: number;
    name: string;
    slug: string;
    price: string;
    old_price: string | null;
    image: string | null;
    is_new: boolean;
    is_hit: boolean;
    is_sale: boolean;
    category: { id: number; name: string; slug: string };
    brand: { id: number; name: string; slug: string } | null;
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

type Pagination<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    links: { active: boolean; label: string; url: string | null }[];
};

type Props = {
    products: Pagination<Product>;
    categories: Category[];
    brands: Brand[];
    filters: {
        category: string;
        brand: string;
        sort: string;
    };
};

export default function CatalogIndex({ products, categories, brands, filters }: Props) {
    const normalizePaginationLabel = (label: string): string => {
        if (label.includes('pagination.previous') || label.includes('&laquo;') || label.includes('Previous')) {
            return '<';
        }

        if (label.includes('pagination.next') || label.includes('&raquo;') || label.includes('Next')) {
            return '>';
        }

        return label.replace(/&laquo;|&raquo;/g, '').trim();
    };

    const updateFilter = (key: 'category' | 'brand' | 'sort', value: string) => {
        const payload = {
            category: key === 'category' ? value : filters.category,
            brand: key === 'brand' ? value : filters.brand,
            sort: key === 'sort' ? value : filters.sort,
        };

        router.get('/catalog', payload, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Каталог" />
            <div className="mx-auto max-w-6xl space-y-6 p-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Каталог</h1>
                    <Link href="/" className="text-sm text-gray-600 hover:text-black">
                        На главную
                    </Link>
                </header>

                <section className="grid gap-3 md:grid-cols-4">
                    <select
                        value={filters.category}
                        onChange={(event) => updateFilter('category', event.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="">Все категории</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.brand}
                        onChange={(event) => updateFilter('brand', event.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="">Все бренды</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.slug}>
                                {brand.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.sort}
                        onChange={(event) => updateFilter('sort', event.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="">Сначала новые</option>
                        <option value="price_asc">Цена по возрастанию</option>
                        <option value="price_desc">Цена по убыванию</option>
                        <option value="new">Только новинки вверху</option>
                        <option value="hit">Только хиты вверху</option>
                    </select>

                    <Link
                        href="/catalog"
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        Сбросить фильтры
                    </Link>
                </section>

                <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {products.data.map((product) => (
                        <Link
                            key={product.id}
                            href={`/catalog/${product.slug}`}
                            className="space-y-2 rounded-lg border border-gray-200 p-4 transition hover:border-gray-400"
                        >
                            <img src={productImageUrl(product.image)} alt={product.name} className="h-40 w-full rounded object-cover" />
                            <div className="flex items-start justify-between gap-2">
                                <h2 className="font-medium">{product.name}</h2>
                                <div className="flex gap-1 text-xs">
                                    {product.is_new ? <span className="rounded bg-green-100 px-2 py-0.5">новинка</span> : null}
                                    {product.is_hit ? <span className="rounded bg-blue-100 px-2 py-0.5">хит</span> : null}
                                    {product.is_sale ? <span className="rounded bg-red-100 px-2 py-0.5">акция</span> : null}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">
                                {product.category.name}
                                {product.brand ? ` / ${product.brand.name}` : ''}
                            </p>
                            <p className="text-sm">
                                {product.old_price ? <span className="mr-2 line-through text-gray-500">{product.old_price}</span> : null}
                                <span className="font-semibold">{product.price}</span>
                            </p>
                        </Link>
                    ))}
                </section>

                <nav className="flex flex-wrap gap-2">
                    {products.links.map((link, index) => (
                        <button
                            key={index}
                            type="button"
                            disabled={!link.url}
                            onClick={() => {
                                if (link.url) {
                                    router.visit(link.url, { preserveScroll: true, preserveState: true });
                                }
                            }}
                            className={`rounded-md px-3 py-1 text-sm ${
                                link.active ? 'bg-black text-white' : 'bg-gray-100 text-black'
                            } disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                            {normalizePaginationLabel(link.label)}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
}
