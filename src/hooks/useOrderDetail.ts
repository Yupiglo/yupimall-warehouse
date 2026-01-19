"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";

interface Order {
    id: number;
    trackingCode: string;
    status: string;
    customer: string;
    customerPhone: string;
    total: number;
    createdAt: string;
    items: any[];
}

export function useOrderDetail(id: string) {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState(false);

    const fetchOrder = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`orders/${id}`);
            if (response.data.message === 'success') {
                setOrder(response.data.order);
            }
        } catch (err) {
            console.error("Error fetching order:", err);
            setError("Failed to load order details");
        } finally {
            setLoading(false);
        }
    }, [id]);

    const updateStatus = async (status: string) => {
        try {
            setUpdating(true);
            const response = await axiosInstance.put(`orders/${id}/status`, { status });
            if (response.data.message === 'success') {
                // Refresh local data
                setOrder((prev: Order | null) => prev ? ({ ...prev, status }) : null);
                return true;
            }
        } catch (err) {
            console.error("Error updating order status:", err);
            return false;
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id, fetchOrder]);

    return { order, loading, error, updating, updateStatus, refresh: fetchOrder };
}
