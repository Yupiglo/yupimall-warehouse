"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box,
  Avatar,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Print as PrintIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import DefaultAvatar from "@/assets/AvatarBig.png";

import { useOrders } from "@/hooks/useOrders";
import { CircularProgress } from "@mui/material";

export default function OrdersTable() {
  const { orders, loading } = useOrders();
  const router = useRouter();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "completed":
        return "success";
      case "pending":
      case "validated":
        return "warning";
      case "processing":
      case "in_transit":
      case "shipped_to_stockist":
      case "reached_warehouse":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "divider",
        overflowX: "auto", // Enable horizontal scrolling
        background: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(30, 30, 30, 0.4)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.02)"
                  : "rgba(255,255,255,0.02)",
            }}
          >
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
                py: 2.5,
              }}
            >
              Order ID
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              Customer
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              Total
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              Status
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: any) => (
            <TableRow
              key={order.id}
              hover
              sx={{
                cursor: "pointer",
                "&:last-child td, &:last-child th": { border: 0 },
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(45, 63, 234, 0.02)"
                      : "rgba(255,255,255,0.02)",
                },
              }}
              onClick={() =>
                router.push(`/orders/${encodeURIComponent(order.id)}`)
              }
            >
              <TableCell sx={{ py: 2.5 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="900"
                  color="primary.main"
                >
                  #{order.trackingCode}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="600"
                >
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      fontSize: "0.9rem",
                      fontWeight: "800",
                      borderRadius: "12px",
                      bgcolor: "primary.lighter",
                      color: "primary.main",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    {order.customer?.charAt(0) || 'G'}
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="800">
                    {order.customer || 'Guest'}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="900">
                  {order.total?.toLocaleString()} CFA
                </Typography>
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="View Receipt">
                    <IconButton
                      size="small"
                      sx={{
                        borderRadius: "10px",
                        bgcolor: "primary.lighter",
                        color: "primary.main",
                        "&:hover": { bgcolor: "primary.main", color: "white" },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/orders/${encodeURIComponent(order.id)}`);
                      }}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delivery Map">
                    <IconButton
                      size="small"
                      sx={{
                        borderRadius: "10px",
                        bgcolor: "secondary.lighter",
                        color: "secondary.main",
                        "&:hover": {
                          bgcolor: "secondary.main",
                          color: "white",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/deliveries/${encodeURIComponent(order.id)}`
                        );
                      }}
                    >
                      <ShippingIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Print Receipt">
                    <IconButton
                      size="small"
                      sx={{
                        borderRadius: "10px",
                        bgcolor: "warning.lighter",
                        color: "warning.main",
                        "&:hover": {
                          bgcolor: "warning.main",
                          color: "white",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/orders/${encodeURIComponent(order.id)}?print=true`
                        );
                      }}
                    >
                      <PrintIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
