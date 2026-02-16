<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = ['Apple', 'Samsung', 'Xiaomi', 'Lenovo'];

        foreach ($brands as $name) {
            Brand::updateOrCreate(
                ['slug' => Str::slug($name)],
                [
                    'name' => $name,
                    'image' => null,
                    'is_popular' => in_array($name, ['Apple', 'Samsung'], true),
                ]
            );
        }
    }
}
