"use client";

import { Box, Stack } from "@mui/material";
import { Home as HomeIcon, ListAlt as OrderIcon } from "@mui/icons-material";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrdersTable from "@/components/orders/OrdersTable";
import BreadcrumbsHeader from "@/components/common/BreadcrumbsHeader";

export default function OrdersPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <BreadcrumbsHeader
        items={[{ label: "Home", href: "/", icon: <HomeIcon /> }]}
        current="Orders"
        currentIcon={<OrderIcon />}
      />

      <Stack spacing={4}>
        <OrdersHeader />
        <OrdersTable />
      </Stack>
    </Box>
  );
}
