<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status', 32)->default('new'); // new, paid, shipped, completed, cancelled
            $table->decimal('total_amount', 12, 2);
            $table->string('customer_name');
            $table->string('customer_phone', 32);
            $table->string('customer_email')->nullable();
            $table->string('delivery_city')->nullable();
            $table->string('delivery_address')->nullable();
            $table->text('comment')->nullable();
            $table->timestamp('placed_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
