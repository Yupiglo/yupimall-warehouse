"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { CurrencyContextProvider } from "@/helpers/currency/CurrencyContext";
import { CartProvider } from "@/helpers/cart/CartContext";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <CurrencyContextProvider>
                <CartProvider>{children}</CartProvider>
            </CurrencyContextProvider>
        </SessionProvider>
    );
}

