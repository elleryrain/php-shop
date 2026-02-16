<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuickPurchaseController extends Controller
{
    public function store(Request $request, Product $product): RedirectResponse
    {
        if (! $product->is_active) {
            return back()->with('error', 'Товар недоступен для заказа.');
        }

        $data = $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:32'],
            'customer_email' => ['nullable', 'email', 'max:255'],
        ]);

        DB::transaction(function () use ($product, $data, $request): void {
            $lockedProduct = Product::query()->whereKey($product->id)->lockForUpdate()->firstOrFail();

            if ($lockedProduct->stock_qty < 1) {
                abort(422, 'Товар закончился.');
            }

            $order = Order::create([
                'user_id' => $request->user()?->id,
                'status' => 'new',
                'total_amount' => $lockedProduct->price,
                'customer_name' => $data['customer_name'],
                'customer_phone' => $data['customer_phone'],
                'customer_email' => $data['customer_email'] ?? null,
                'delivery_city' => null,
                'delivery_address' => null,
                'comment' => 'Быстрый заказ',
                'placed_at' => now(),
            ]);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $lockedProduct->id,
                'product_name' => $lockedProduct->name,
                'price' => $lockedProduct->price,
                'qty' => 1,
                'line_total' => $lockedProduct->price,
            ]);

            $lockedProduct->decrement('stock_qty', 1);
        });

        return back()->with('success', 'Заказ оформлен. Мы свяжемся с вами.');
    }
}
