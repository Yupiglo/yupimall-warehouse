"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";

export interface Notification {
    id: number;
    title: string;
    message: string;
    category: string;
    type: string;
    is_read: boolean;
    created_at: string;
    metadata?: any;
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("notifications");
            if (response.data.status === 200) {
                setNotifications(response.data.notifications.data);
            }
        } catch (err) {
            console.error("Error fetching notifications:", err);
            setError("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    }, []);

    const markAsRead = async (id: number) => {
        try {
            await axiosInstance.put(`notifications/${id}`, { is_read: true });
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
            );
        } catch (err) {
            console.error("Error marking notification as read:", err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axiosInstance.post("notifications/mark-all-read");
            setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
        } catch (err) {
            console.error("Error marking all as read:", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    return {
        notifications,
        setNotifications,
        loading,
        error,
        markAsRead,
        markAllAsRead,
        refresh: fetchNotifications
    };
}
