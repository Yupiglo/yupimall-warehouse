"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OrdersTable from "@/components/dashboard/OrdersTable";
import ProductChartMui from "@/components/dashboard/ProductChartMui";
import RecentDeliveries from "@/components/dashboard/RecentDeliveries";
import { Grid, Card, Typography, Box, Stack } from "@mui/material";
import WidgetList from "@/components/dashboard/WidgetList";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import {
  LocalShipping as DeliveredIcon,
  Engineering as ActiveGuysIcon,
  AttachMoney as RevenueIcon,
  ListAlt as OrdersIcon,
} from "@mui/icons-material";
import CardStats from "@/components/CardStats";
import { useContext } from "react";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

import { useOperationalStats } from "@/hooks/useOperationalStats";
import { CircularProgress } from "@mui/material";

type Props = {};

const page = (props: Props) => {
  const { data, loading } = useOperationalStats();
  const { selectedCurr } = useContext(CurrencyContext);

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * selectedCurr.value;
    if (selectedCurr.symbol === "FCFA" || selectedCurr.symbol === "₦") {
      return `${Math.round(converted).toLocaleString()} ${selectedCurr.symbol}`;
    }
    return `${selectedCurr.symbol}${converted.toFixed(2)}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const s = data?.stats;

  const stats = [
    {
      title: "Total Orders",
      value: s?.totalOrders?.toLocaleString() || "0",
      change: "Dans votre zone",
      icon: <OrdersIcon />,
      color: "common.white",
      bgColor: "primary.main",
    },
    {
      title: "Revenue",
      value: formatPrice(s?.revenue || 0),
      change: "Ventes validées",
      icon: <RevenueIcon />,
      color: "common.white",
      bgColor: "secondary.main",
    },
    {
      title: "Validated Orders",
      value: s?.validatedOrders?.toLocaleString() || "0",
      change: "Prêt pour expédition",
      icon: <DeliveredIcon />,
      color: "common.white",
      bgColor: "success.main",
    },
    {
      title: "Stockists",
      value: s?.totalStockists?.toLocaleString() || "0",
      change: "Points de retrait actifs",
      icon: <ActiveGuysIcon />,
      color: "common.white",
      bgColor: "warning.main",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
      <DashboardHeader />

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <CardStats key={index} {...stat} />
        ))}
      </Grid>

      {/* Main Content Area */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={4}>
            {/* Product Chart */}
            <Card
              sx={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ p: 3, pb: 0 }}>
                Inventory Overview
              </Typography>
              <Box sx={{ px: 0 }}>
                <ProductChartMui />
              </Box>
            </Card>

            {/* Recent Orders Table */}
            <OrdersTable items={data?.recentOrders} />

            {/* Recent Deliveries */}
            <RecentDeliveries items={data?.recentDeliveries} />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4} sx={{ height: "100%" }}>
            <Box sx={{ flex: 1, minHeight: 300 }}>
              <WidgetList
                title="Top 5 Customers"
                items={data?.topCustomers || []}
                viewAllLink={LinksEnum.distributors}
              />
            </Box>
            <Box sx={{ flex: 1, minHeight: 300 }}>
              <WidgetList
                title="Top 5 Couriers"
                items={data?.topCouriers || []}
                viewAllLink={LinksEnum.couriers}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default page;

