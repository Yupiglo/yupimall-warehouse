"use client";

import { Box, Stack, CircularProgress } from "@mui/material";
import { Home as HomeIcon, ListAlt as OrderIcon } from "@mui/icons-material";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrdersTable from "@/components/orders/OrdersTable";
import BreadcrumbsHeader from "@/components/common/BreadcrumbsHeader";
import { useState, useMemo } from "react";
import { useOrders } from "@/hooks/useOrders";

export default function OrdersPage() {
  const { orders, loading } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return {
      pending: orders.filter(o => ["pending", "validated"].includes(o.status.toLowerCase())).length,
      processing: orders.filter(o => ["processing", "in_transit", "reached_warehouse", "shipped_to_stockist"].includes(o.status.toLowerCase())).length,
      completed: orders.filter(o => ["delivered", "completed"].includes(o.status.toLowerCase())).length,
    };
  }, [orders]);

  if (loading && orders.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <BreadcrumbsHeader
        items={[{ label: "Home", href: "/", icon: <HomeIcon /> }]}
        current="Orders"
        currentIcon={<OrderIcon />}
      />

      <Stack spacing={4}>
        <OrdersHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dynamicStats={stats}
        />
        <OrdersTable
          orders={filteredOrders}
          loading={loading}
        />
      </Stack>
    </Box>
  );
}
