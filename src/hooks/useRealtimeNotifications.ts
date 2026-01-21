"use client";

import { useEffect, useState, useCallback } from "react";
import { getEcho } from "@/lib/echo";
import { useSession } from "next-auth/react";

interface NotificationEvent {
    id: number;
    tracking_code: string;
    user_name: string;
    status: string;
    country: string;
    supervisor_id?: number;
    stockist_id?: number | string;
    updated_at?: string;
    type?: string;
}

export function useRealtimeNotifications(onNewNotification?: (event: any) => void) {
    const { data: session } = useSession();
    const [isConnected, setIsConnected] = useState(false);

    const handleNewOrder = useCallback(
        (event: NotificationEvent) => {
            // Filter: If I'm a Warehouse, I only care about my country
            if (session?.user?.role === 'warehouse') {
                if (event.country !== session.user.country) {
                    return; // Ignore
                }
            }

            // Filter: If I'm a Stockist, I only care about my orders
            if (session?.user?.role === 'stockist') {
                if (String(event.stockist_id) !== String(session.user.id)) {
                    return; // Ignore
                }
            }

            console.log("[WebSocket] Relevant event received:", event);
            onNewNotification?.(event);
        },
        [onNewNotification, session]
    );

    useEffect(() => {
        const echo = getEcho();
        if (!echo || !session) return;

        const channel = echo.channel("orders");

        channel.listen("OrderCreated", (event: NotificationEvent) => {
            handleNewOrder({ ...event, type: 'order_created' });
        });

        channel.listen("OrderStatusUpdated", (event: NotificationEvent) => {
            handleNewOrder({ ...event, type: 'status_updated' });
        });

        setIsConnected(true);

        return () => {
            echo.leaveChannel("orders");
            setIsConnected(false);
        };
    }, [handleNewOrder, session]);

    return { isConnected };
}
