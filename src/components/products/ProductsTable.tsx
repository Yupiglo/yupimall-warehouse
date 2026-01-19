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
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import {
  TrendingDown as StockLowIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LinksEnum } from "@/utilities/pagesLInksEnum";

const products = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    category: "Clothing",
    sku: "JKT-001",
    price: "$129.99",
    stock: 45,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    sku: "AUD-005",
    price: "$89.50",
    stock: 12,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Organic Coffee Beans",
    category: "Food",
    sku: "CFE-012",
    price: "$18.00",
    stock: 5,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Smart Watch Series 5",
    category: "Electronics",
    sku: "WCH-002",
    price: "$299.00",
    stock: 28,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Denim Jeans Slim Fit",
    category: "Clothing",
    sku: "JNS-009",
    price: "$59.99",
    stock: 0,
    status: "Discontinued",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
  },
];

export default function ProductsTable() {
  const router = useRouter();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Out of Stock":
        return "warning";
      case "Discontinued":
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
        overflow: "hidden",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(30, 30, 30, 0.4)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
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
              }}
            >
              Product
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              SKU
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              Category
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              Stock
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
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              hover
              onClick={() => router.push(`${LinksEnum.products}/${product.id}`)}
              sx={{
                cursor: "pointer",
                "&:last-child td, &:last-child th": { border: 0 },
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(45, 63, 234, 0.02)"
                      : "rgba(255, 255, 255, 0.02)",
                },
              }}
            >
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    variant="rounded"
                    src={product.image}
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "14px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    {product.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="800">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        bgcolor: (theme) =>
                          theme.palette.mode === "light"
                            ? "#f5f5f5"
                            : "rgba(255,255,255,0.05)",
                        px: 0.8,
                        py: 0.2,
                        borderRadius: "4px",
                      }}
                    >
                      ID: #{product.id.toString().padStart(3, "0")}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              >
                {product.sku}
              </TableCell>
              <TableCell>
                <Chip
                  label={product.category}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    border: "1px solid",
                    borderColor: "divider",
                    color: "text.secondary",
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "800", color: "primary.main" }}>
                {product.price}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "800",
                      color: product.stock < 10 ? "error.main" : "text.primary",
                    }}
                  >
                    {product.stock}
                  </Typography>
                  {product.stock < 10 && product.stock > 0 && (
                    <Box
                      sx={{
                        p: 0.5,
                        bgcolor: "warning.lighter",
                        borderRadius: "50%",
                        display: "flex",
                        color: "warning.main",
                      }}
                    >
                      <StockLowIcon sx={{ fontSize: 14 }} />
                    </Box>
                  )}
                </Stack>
              </TableCell>
              <TableCell>
                <Chip
                  label={product.status}
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
                    color: `${getStatusColor(product.status)}.main`,
                    border: "1px solid",
                    borderColor: `${getStatusColor(product.status)}.main`,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
