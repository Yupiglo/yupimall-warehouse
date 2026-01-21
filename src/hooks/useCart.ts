"use client";

import { useCartContext } from "@/helpers/cart/CartContext";

export function useCart() {
    return useCartContext();
}
