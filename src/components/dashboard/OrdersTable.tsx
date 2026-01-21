"use client";

import {
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Card,
} from "@mui/material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import { useContext } from "react";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";
interface OrdersTableProps {
  items?: any[];
}

export default function OrdersTable({ items = [] }: OrdersTableProps) {
  const { selectedCurr } = useContext(CurrencyContext);

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * selectedCurr.value;
    if (selectedCurr.symbol === "FCFA" || selectedCurr.symbol === "₦") {
      return `${Math.round(converted).toLocaleString()} ${selectedCurr.symbol}`;
    }
    return `${selectedCurr.symbol}${converted.toFixed(2)}`;
  };
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
        return "info";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: (theme) =>
            theme.palette.mode === "light" ? "#fafafa" : "#252525",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Recent Orders
        </Typography>
        <Button
          component={Link}
          href={LinksEnum.orders}
          variant="outlined"
          size="small"
          sx={{ borderRadius: 2 }}
        >
          View All Orders
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((order: any) => (
              <TableRow
                key={order.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  #{order.trackingCode}
                </TableCell>
                <TableCell color="text.secondary">{order.userName}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.7rem",
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
                      "& .MuiChip-label": { px: 1 },
                    }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {formatPrice(order.total || 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
