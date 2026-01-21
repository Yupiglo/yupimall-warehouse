"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";
import { useRealtimeNotifications } from "./useRealtimeNotifications";

interface Order {
    id: number;
    trackingCode: string;
    userName: string;
    total: number;
    status: string;
    createdAt: string;
    customer: string;
}

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("orders/all");
            if (response.data.message === 'success') {
                setOrders(response.data.orders);
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Listen for new orders
    useRealtimeNotifications((event) => {
        if (event.type === 'order_created') {
            // Refresh list or add live if appropriate
            // For simplicity, let's just add it to the top if not already there
            setOrders((prev: Order[]) => {
                if (prev.find((o: Order) => o.id === event.id)) return prev;
                return [{
                    id: event.id,
                    trackingCode: event.tracking_code,
                    userName: event.user_name,
                    total: event.total,
                    status: event.status,
                    createdAt: new Date().toISOString(),
                    date: new Date().toLocaleDateString(),
                    customer: event.user_name,
                }, ...prev];
            });
        }
    });

    return { orders, loading, error, refresh: fetchOrders };
}
