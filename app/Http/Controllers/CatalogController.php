<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('home', [
            'newProducts' => Product::query()
                ->where('is_active', true)
                ->where('is_new', true)
                ->latest('id')
                ->limit(8)
                ->get(),
            'hitProducts' => Product::query()
                ->where('is_active', true)
                ->where('is_hit', true)
                ->latest('id')
                ->limit(8)
                ->get(),
            'saleProducts' => Product::query()
                ->where('is_active', true)
                ->where('is_sale', true)
                ->latest('id')
                ->limit(8)
                ->get(),
            'categories' => Category::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
            'popularBrands' => Brand::query()
                ->where('is_popular', true)
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
        ]);
    }

    public function index(Request $request): Response
    {
        $categorySlug = $request->string('category')->toString();
        $brandSlug = $request->string('brand')->toString();
        $sort = $request->string('sort')->toString();

        $query = Product::query()
            ->with(['category:id,name,slug', 'brand:id,name,slug'])
            ->where('is_active', true);

        if ($categorySlug !== '') {
            $query->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
        }

        if ($brandSlug !== '') {
            $query->whereHas('brand', fn ($q) => $q->where('slug', $brandSlug));
        }

        match ($sort) {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'new' => $query->orderByDesc('is_new')->orderByDesc('id'),
            'hit' => $query->orderByDesc('is_hit')->orderByDesc('id'),
            default => $query->latest('id'),
        };

        return Inertia::render('catalog/index', [
            'products' => $query->paginate(12)->withQueryString(),
            'filters' => [
                'category' => $categorySlug,
                'brand' => $brandSlug,
                'sort' => $sort,
            ],
            'categories' => Category::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
            'brands' => Brand::query()
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);

        return Inertia::render('catalog/show', [
            'product' => $product->load(['category:id,name,slug', 'brand:id,name,slug']),
        ]);
    }
}
