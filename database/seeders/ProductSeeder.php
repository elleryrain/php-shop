<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $iphoneCategory = Category::where('slug', 'smartfony')->first();
        $laptopCategory = Category::where('slug', 'noutbuki')->first();

        $apple = Brand::where('slug', 'apple')->first();
        $lenovo = Brand::where('slug', 'lenovo')->first();

        if (! $iphoneCategory || ! $laptopCategory || ! $apple || ! $lenovo) {
            return;
        }

        $products = [
            [
                'name' => 'iPhone 15',
                'category_id' => $iphoneCategory->id,
                'brand_id' => $apple->id,
                'price' => 99990,
                'old_price' => 109990,
                'stock_qty' => 25,
                'is_new' => true,
                'is_hit' => true,
                'is_sale' => true,
            ],
            [
                'name' => 'Lenovo IdeaPad 5',
                'category_id' => $laptopCategory->id,
                'brand_id' => $lenovo->id,
                'price' => 69990,
                'old_price' => null,
                'stock_qty' => 14,
                'is_new' => true,
                'is_hit' => false,
                'is_sale' => false,
            ],
        ];

        foreach ($products as $item) {
            Product::updateOrCreate(
                ['slug' => Str::slug($item['name'])],
                array_merge($item, [
                    'description' => null,
                    'image' => null,
                    'is_active' => true,
                ])
            );
        }
    }
}
