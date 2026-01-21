"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  Avatar,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Receipt as OrderIcon,
  Person as CustomerIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";

import { useSearchParams, useRouter as useNavRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import defaultAvatar from "@/assets/Avatar.png";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

const orders = [
  {
    id: "#ORD-9921",
    date: "Jun 12, 2026",
    customer: "Alice Johnson",
    total: "$124.50",
    status: "Pending",
    items: [{ name: "Classic Leather Jacket", qty: 1, price: "$124.50" }],
  },
];

import { useOrderDetail } from "@/hooks/useOrderDetail";
import { CircularProgress } from "@mui/material";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  const { order, loading, updating, updateStatus } = useOrderDetail(decodedId);
  const { selectedCurr } = useContext(CurrencyContext);

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * selectedCurr.value;
    if (selectedCurr.symbol === "FCFA" || selectedCurr.symbol === "₦") {
      return `${Math.round(converted).toLocaleString()} ${selectedCurr.symbol}`;
    }
    return `${selectedCurr.symbol}${converted.toFixed(2)}`;
  };

  useEffect(() => {
    if (searchParams.get("print") === "true") {
      window.print();
    }
  }, [searchParams]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "validated":
        return "warning";
      case "reached_warehouse":
      case "shipped_to_stockist":
      case "reached_stockist":
        return "info";
      case "delivered":
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Order not found</Typography>
        <Button onClick={() => router.push(LinksEnum.orders)}>Back to Orders</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Breadcrumbs Header */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs
          separator={
            <ChevronRightIcon
              sx={{ fontSize: "1rem", color: "text.disabled" }}
            />
          }
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <HomeIcon
              sx={{ mr: 0.5, fontSize: "1.2rem", color: "primary.main" }}
            />
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{ color: "text.secondary" }}
            >
              Home
            </Typography>
          </Box>
          <Link
            href={LinksEnum.orders}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Orders
            </Typography>
          </Link>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" fontWeight="600" color="text.primary">
              Order Detail
            </Typography>
            <OrderIcon
              sx={{ fontSize: "0.9rem", color: "primary.main", mb: 0.1 }}
            />
          </Stack>
        </Breadcrumbs>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={() => router.push(LinksEnum.orders)}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "common.white"
                    : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "14px",
                p: 1.5,
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <BackIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h4"
                fontWeight="900"
                sx={{
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 0.5,
                  letterSpacing: -1,
                }}
              >
                Order #{order.trackingCode}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Detailed transaction breakdown and history
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2}>
            {order.status === 'validated' && (
              <Button
                variant="contained"
                disabled={updating}
                onClick={() => updateStatus('reached_warehouse')}
                sx={{ borderRadius: '12px', px: 3 }}
              >
                {updating ? <CircularProgress size={20} /> : 'Arrived at Warehouse'}
              </Button>
            )}
            {order.status === 'reached_warehouse' && (
              <Button
                variant="contained"
                disabled={updating}
                onClick={() => updateStatus('shipped_to_stockist')}
                sx={{ borderRadius: '12px', px: 3 }}
              >
                {updating ? <CircularProgress size={20} /> : 'Ship to Stockist'}
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Card
              sx={{
                borderRadius: "28px",
                backgroundImage: "none",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(30, 30, 30, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 4 }}
                >
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: "primary.lighter",
                      borderRadius: "10px",
                      display: "flex",
                    }}
                  >
                    <OrderIcon color="primary" />
                  </Box>
                  <Typography variant="h6" fontWeight="900">
                    Summary
                  </Typography>
                </Stack>
                <Stack spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="600"
                    >
                      Placed On
                    </Typography>
                    <Typography variant="body2" fontWeight="800">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="600"
                    >
                      Status
                    </Typography>
                    <Chip
                      label={order.status}
                      size="small"
                      sx={{
                        fontWeight: "800",
                        fontSize: "0.65rem",
                        borderRadius: "6px",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        bgcolor: (theme) =>
                          theme.palette.mode === "light"
                            ? "common.white"
                            : "rgba(255, 255, 255, 0.05)",
                        color: `${getStatusColor(order.status)}.main`,
                        border: "1px solid",
                        borderColor: `${getStatusColor(order.status)}.main`,
                      }}
                    />
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="900"
                      color="text.secondary"
                    >
                      Grand Total
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="900"
                      sx={{
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {formatPrice(order.total || 0)}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: "28px",
                backgroundImage: "none",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(30, 30, 30, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <CustomerIcon color="primary" sx={{ fontSize: 22 }} />
                  <Typography variant="subtitle1" fontWeight="900">
                    Client Details
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "14px",
                      fontWeight: "800",
                      bgcolor: "secondary.lighter",
                      color: "secondary.main",
                    }}
                  >
                    {order.customer?.charAt(0) || 'G'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="900">
                      {order.customer || 'Guest'}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="700"
                    >
                      {order.customerPhone || 'No phone'}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              borderRadius: "28px",
              backgroundImage: "none",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(30, 30, 30, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 3,
                px: 4,
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.01)"
                    : "rgba(255,255,255,0.01)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight="900">
                Articles in this Order
              </Typography>
              <Typography
                variant="caption"
                color="primary.main"
                fontWeight="900"
              >
                {order.items?.length || 0} ITEMS
              </Typography>
            </Box>
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "800",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 1,
                        py: 2,
                        px: 4,
                      }}
                    >
                      Article Description
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "800",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 1,
                      }}
                    >
                      Qty
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "800",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 1,
                        px: 4,
                      }}
                    >
                      Unit Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items?.map((item: any, idx: number) => (
                    <TableRow
                      key={idx}
                      hover
                      sx={{ "&:last-child td": { border: 0 } }}
                    >
                      <TableCell sx={{ py: 3, px: 4 }}>
                        <Typography variant="subtitle2" fontWeight="800">
                          {item.productName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={item.quantity}
                          size="small"
                          sx={{ fontWeight: "900", borderRadius: "8px" }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ px: 4 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="900"
                          color="primary.main"
                        >
                          {formatPrice(item.price || 0)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
