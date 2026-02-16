<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Смартфоны', 'sort_order' => 10],
            ['name' => 'Ноутбуки', 'sort_order' => 20],
            ['name' => 'Аксессуары', 'sort_order' => 30],
        ];

        foreach ($categories as $item) {
            Category::updateOrCreate(
                ['slug' => Str::slug($item['name'])],
                [
                    'name' => $item['name'],
                    'description' => null,
                    'image' => null,
                    'is_active' => true,
                    'sort_order' => $item['sort_order'],
                    'parent_id' => null,
                ]
            );
        }
    }
}
