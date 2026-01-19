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
  Chip,
  Divider,
  Grid,
  Breadcrumbs,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Inventory as ProductIcon,
  AttachMoney as PriceIcon,
  Storage as StockIcon,
  QrCode as SkuIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import Link from "next/link";
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
      "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&h=800&fit=crop",
    description:
      "High-quality genuine leather jacket with a classic finish and durable zippers. Designed for style and longevity, this jacket features premium stitching and multiple pockets.",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "success";
    case "Out of Stock":
      return "warning";
    case "Discontinued":
      return "error";
    default:
      return "primary";
  }
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  // Mock finding product by ID
  const product = products.find((p) => p.id.toString() === id) || products[0];

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
            href={LinksEnum.products}
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
              Products
            </Typography>
          </Link>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" fontWeight="600" color="text.primary">
              Product Detail
            </Typography>
            <ProductIcon
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
              onClick={() => router.push(LinksEnum.products)}
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
                variant="h3"
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
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Monitoring inventory status for SKU: {product.sku}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={4}>
            <Card
              sx={{
                borderRadius: "32px",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                component="img"
                src={product.image}
                sx={{
                  width: "100%",
                  height: 350,
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="900" gutterBottom>
                  {product.name}
                </Typography>
                <Chip
                  label={product.status}
                  size="small"
                  sx={{
                    fontWeight: "800",
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    px: 1,
                    bgcolor: (theme) =>
                      theme.palette.mode === "light"
                        ? "common.white"
                        : "rgba(255, 255, 255, 0.05)",
                    color: `${getStatusColor(product.status)}.main`,
                    border: "1px solid",
                    borderColor: `${getStatusColor(product.status)}.main`,
                  }}
                />
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: "24px",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(255, 255, 255, 0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="800"
                  sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "8px",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`,
                      color: "primary.main",
                      display: "flex",
                    }}
                  >
                    <SkuIcon sx={{ fontSize: 18 }} />
                  </Box>
                  Specifications
                </Typography>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="700"
                        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                      >
                        Identifier SKU
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: "800",
                          color: "primary.main",
                        }}
                      >
                        {product.sku}
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="700"
                        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                      >
                        Classification
                      </Typography>
                      <Typography variant="body1" fontWeight="800">
                        {product.category}
                      </Typography>
                    </Box>
                    <Chip
                      label="Primary"
                      size="small"
                      sx={{
                        borderRadius: "6px",
                        fontWeight: "800",
                        fontSize: "0.6rem",
                      }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            {[
              {
                label: "Unit Price",
                value: product.price,
                icon: <PriceIcon />,
                color: "success.main",
                bgcolor: "success.lighter",
              },
              {
                label: "Current Stock",
                value: product.stock,
                icon: <StockIcon />,
                color: "primary.main",
                bgcolor: "primary.lighter",
              },
              {
                label: "Stock Value",
                value: `$${(
                  parseFloat(product.price.replace("$", "")) * product.stock
                ).toFixed(2)}`,
                icon: <SpentIcon />,
                color: "info.main",
                bgcolor: "info.lighter",
              },
            ].map((stat, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    background: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.7)"
                        : "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid",
                    borderColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.4)"
                        : "rgba(255, 255, 255, 0.1)",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          p: 1.2,
                          background: (theme) => {
                            const baseColor =
                              (
                                theme.palette[
                                  stat.color.split(
                                    "."
                                  )[0] as keyof typeof theme.palette
                                ] as any
                              )?.main || theme.palette.primary.main;
                            return `linear-gradient(135deg, ${baseColor}15, ${baseColor}25)`;
                          },
                          color: stat.color,
                          borderRadius: "12px",
                          display: "flex",
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight="700"
                          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography
                          variant="h5"
                          fontWeight="900"
                          color="text.primary"
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            <Grid size={{ xs: 12 }}>
              <Card
                sx={{
                  borderRadius: "24px",
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(30, 30, 30, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(255, 255, 255, 0.1)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    fontWeight="800"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 24,
                        bgcolor: "primary.main",
                        borderRadius: "2px",
                      }}
                    />
                    Product Description
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      fontWeight: 500,
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ mt: 5, mb: 2 }}>
                    <Typography
                      variant="h6"
                      fontWeight="800"
                      sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 24,
                          bgcolor: "primary.main",
                          borderRadius: "2px",
                        }}
                      />
                      Inventory History
                    </Typography>
                    <Box
                      sx={{
                        p: 4,
                        textAlign: "center",
                        bgcolor: (theme) =>
                          theme.palette.mode === "light"
                            ? "rgba(0,0,0,0.02)"
                            : "rgba(255,255,255,0.02)",
                        borderRadius: "20px",
                        border: "2px dashed",
                        borderColor: "divider",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="700"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        No recent transactions
                      </Typography>
                      <Typography variant="body2" color="text.disabled">
                        Full inventory transaction logs will appear here once
                        the system is live.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
import { MonetizationOn as SpentIcon } from "@mui/icons-material";
