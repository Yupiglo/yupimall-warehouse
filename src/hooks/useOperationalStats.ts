"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";

export interface OperationalStats {
    stats: {
        totalOrders: number;
        pendingOrders?: number;
        validatedOrders?: number;
        pendingPickup?: number;
        delivered?: number;
        revenue: number;
        totalStockists?: number;
        totalConsumers?: number;
        myCustomers?: number;
    };
    recentOrders: {
        id: number;
        trackingCode: string;
        customer: string;
        total: number;
        status: string;
        createdAt: string;
    }[];
    recentDeliveries?: {
        id: number;
        trackingCode: string;
        customer: string;
        userName: string;
        total: number;
        status: string;
        updatedAt: string;
    }[];
}

export function useOperationalStats() {
    const [data, setData] = useState<OperationalStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("operational-stats");
            if (response.data.status === 200) {
                setData(response.data);
            }
        } catch (err) {
            console.error("Error fetching stats:", err);
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { data, loading, error, refresh: fetchStats };
}
