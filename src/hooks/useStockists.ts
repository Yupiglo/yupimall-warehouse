"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";

export interface Stockist {
    id: number | string;
    name: string;
    location: string;
    package: string;
    contact: string;
    status: "Active" | "Inactive";
}

export function useStockists() {
    const [stockists, setStockists] = useState<Stockist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStockists = useCallback(async () => {
        try {
            setLoading(true);
            // On filtre par rôle 'stockist'
            const response = await axiosInstance.get("users?role=stockist");
            if (response.data.message === 'success') {
                const mappedStockists = response.data.getAllUsers.map((user: any) => ({
                    id: `#STK-${user.id.toString().padStart(3, '0')}`,
                    name: user.name,
                    location: user.city || user.country || "N/A",
                    package: "Elite", // Valeur par défaut car non définie en base pour le moment
                    contact: user.phone || "N/A",
                    status: "Active", // Valeur par défaut
                    rawId: user.id
                }));
                setStockists(mappedStockists);
            }
        } catch (err) {
            console.error("Error fetching stockists:", err);
            setError("Failed to load stockists");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStockists();
    }, [fetchStockists]);

    return { stockists, loading, error, refresh: fetchStockists };
}
