"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";


export interface CartItem {
    _id: string;
    productId: {
        _id: string;
        title: string;
        price: number;
        imgCover: string;
    };
    quantity: number;
    price: number;
}

export interface Cart {
    _id: string;
    userId: string;
    cartItem: CartItem[];
    totalPrice: number;
    totalPriceAfterDiscount?: number;
    discount?: number;
}

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
    cartItemCount: number;
    addToCart: (productId: number | string, quantity?: number) => Promise<{ success: boolean; message: string }>;
    removeFromCart: (cartItemId: string) => Promise<{ success: boolean; message: string }>;
    updateQuantity: (productId: string, quantity: number) => Promise<{ success: boolean; message?: string }>;
    clearCart: () => Promise<{ success: boolean; message?: string }>;
    refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("carts");
            if (response.data?.cart) {
                setCart(response.data.cart);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
            setError("Failed to load cart");
        } finally {
            setLoading(false);
        }
    }, []);

    const addToCart = useCallback(async (productId: number | string, quantity: number = 1) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("carts", {
                productId: String(productId),
                quantity,
            });
            if (response.data?.result) {
                setCart(response.data.result);
                return { success: true, message: "Produit ajouté au panier" };
            }
            return { success: false, message: "Failed to add to cart" };
        } catch (err: any) {
            console.error("Error adding to cart:", err);
            return { success: false, message: err?.response?.data?.message || "Failed to add to cart" };
        } finally {
            setLoading(false);
        }
    }, []);

    const removeFromCart = useCallback(async (cartItemId: string) => {
        try {
            setLoading(true);
            const response = await axiosInstance.delete(`carts/${cartItemId}`);
            if (response.data?.cart) {
                setCart(response.data.cart);
            }
            return { success: true, message: "Produit retiré du panier" };
        } catch (err: any) {
            console.error("Error removing from cart:", err);
            return { success: false, message: err?.response?.data?.message || "Failed to remove from cart" };
        } finally {
            setLoading(false);
        }
    }, []);

    const updateQuantity = useCallback(async (productId: string, quantity: number) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(`carts/${productId}`, { quantity });
            if (response.data?.cart) {
                setCart(response.data.cart);
            }
            return { success: true };
        } catch (err: any) {
            console.error("Error updating quantity:", err);
            return { success: false, message: err?.response?.data?.message || "Failed to update quantity" };
        } finally {
            setLoading(false);
        }
    }, []);

    const clearCart = useCallback(async () => {
        if (!cart?.cartItem) return { success: true };
        try {
            setLoading(true);
            for (const item of cart.cartItem) {
                await axiosInstance.delete(`carts/${item._id}`);
            }
            setCart(null);
            return { success: true };
        } catch (err: any) {
            console.error("Error clearing cart:", err);
            return { success: false, message: err?.response?.data?.message || "Failed to clear cart" };
        } finally {
            setLoading(false);
        }
    }, [cart]);

    const cartItemCount = cart?.cartItem?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            fetchCart();
        } else if (status === "unauthenticated") {
            setCart(null);
        }
    }, [fetchCart, status]);


    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
                cartItemCount,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                refresh: fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}
