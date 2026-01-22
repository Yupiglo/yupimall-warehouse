"use client";

import { useCartContext, Cart, CartItem } from "@/helpers/cart/CartContext";

export type { Cart, CartItem };

export function useCart() {
    return useCartContext();
}
