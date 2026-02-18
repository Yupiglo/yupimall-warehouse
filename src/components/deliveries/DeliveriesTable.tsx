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
  Stack,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useActiveDeliveries } from "@/hooks/useDeliveries";

export default function DeliveriesTable() {
  const router = useRouter();
  const { deliveries, loading, error } = useActiveDeliveries();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "In Transit":
        return "info";
      case "Pending":
      case "Processing":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: "24px" }}>
        {error}
      </Alert>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "28px",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(30, 30, 30, 0.4)",
        backdropFilter: "blur(12px)",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 8px 32px rgba(0,0,0,0.02)",
        overflow: "hidden",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: (theme) => theme.palette.action.hover }}>
            {[
              "Delivery ID",
              "Order & Customer",
              "Courier",
              "Address",
              "Date",
              "Status",
              "Actions",
            ].map((head) => (
              <TableCell
                key={head}
                align={head === "Actions" ? "right" : "left"}
                sx={{
                  fontWeight: "800",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  color: "text.secondary",
                  py: 2.5,
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow
              key={delivery.id}
              hover
              onClick={() =>
                router.push(`/deliveries/${encodeURIComponent(delivery.id)}`)
              }
              sx={{
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(59, 130, 246, 0.02)"
                      : "rgba(255, 255, 255, 0.03)",
                },
              }}
            >
              <TableCell sx={{ fontWeight: "700", color: "primary.main" }}>
                {delivery.id}
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" fontWeight="700">
                    {delivery.orderId}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {delivery.customer}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                {delivery.courier}
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {delivery.address}
              </TableCell>
              <TableCell sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                {delivery.date}
              </TableCell>
              <TableCell>
                <Chip
                  label={delivery.status}
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
                    color: `${getStatusColor(delivery.status)}.main`,
                    border: "1px solid",
                    borderColor: `${getStatusColor(delivery.status)}.main`,
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="flex-end"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={() =>
                        router.push(
                          `/deliveries/${encodeURIComponent(delivery.id)}`
                        )
                      }
                      sx={{
                        color: "primary.main",
                        bgcolor: "primary.lighter",
                        "&:hover": { bgcolor: "primary.light", color: "white" },
                        borderRadius: "8px",
                      }}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Print Delivery">
                    <IconButton
                      size="small"
                      onClick={() =>
                        router.push(
                          `/deliveries/${encodeURIComponent(
                            delivery.id
                          )}?print=true`
                        )
                      }
                      sx={{
                        color: "info.main",
                        bgcolor: "info.lighter",
                        "&:hover": { bgcolor: "info.main", color: "white" },
                        borderRadius: "8px",
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
