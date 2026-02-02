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
  Breadcrumbs,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Print as PrintIcon,
  Output as ExitIcon,
  Inventory as ProductIcon,
  Person as DestinationIcon,
  CalendarToday as DateIcon,
  Layers as QtyIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const exits = [
  {
    id: "#EXT-001",
    product: "Classic Leather Jacket",
    sku: "JKT-001",
    quantity: 12,
    destination: "John Doe (Downtown)",
    date: "Oct 26, 2025, 11:45 AM",
    notes: "Direct delivery to customer.",
  },
];

export default function ExitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  useEffect(() => {
    if (searchParams.get("print") === "true") {
      window.print();
    }
  }, [searchParams]);

  const exit = exits.find((e) => e.id === decodedId) || exits[0];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Breadcrumbs Header */}
      <Box sx={{ mb: 3 }}>
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
          <Typography
            variant="body2"
            fontWeight="500"
            sx={{ color: "text.secondary" }}
          >
            Stocks
          </Typography>
          <Link
            href={LinksEnum.exits}
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
              Stock Outflow
            </Typography>
          </Link>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" fontWeight="600" color="text.primary">
              Exit Detail
            </Typography>
            <ExitIcon
              sx={{ fontSize: "0.9rem", color: "primary.main", mb: 0.1 }}
            />
          </Stack>
        </Breadcrumbs>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton
          onClick={() => router.push("/exits")}
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "white"
                : "rgba(255,255,255,0.05)",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "grey.50"
                  : "rgba(255,255,255,0.1)",
              transform: "translateX(-2px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <BackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: -0.5,
              }}
            >
              Stock Exit
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Tracking outbound inventory and shipment details.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
          sx={{
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: "800",
            px: 3,
            py: 1,
            boxShadow: (theme) =>
              `0 8px 20px -6px ${theme.palette.primary.main}50`,
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: (theme) =>
                `0 12px 25px -6px ${theme.palette.primary.main}70`,
            },
          }}
        >
          Print Memo
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                border: "1px solid",
                borderColor: "divider",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "16px",
                      bgcolor: "error.lighter",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "error.main",
                    }}
                  >
                    <ExitIcon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="900">
                      Exit Information
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="700"
                    >
                      Logistics & status
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={2.5}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="600"
                    >
                      Exit ID
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="800"
                      sx={{ fontFamily: "monospace", letterSpacing: 0.5 }}
                    >
                      {exit.id}
                    </Typography>
                  </Stack>
                  <Divider sx={{ borderStyle: "dashed" }} />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        bgcolor: "action.hover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                      }}
                    >
                      <DestinationIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="700"
                        sx={{
                          textTransform: "uppercase",
                          fontSize: "0.7rem",
                          letterSpacing: 0.5,
                        }}
                      >
                        Destination
                      </Typography>
                      <Typography variant="body1" fontWeight="800">
                        {exit.destination}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                border: "1px solid",
                borderColor: "divider",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <ProductIcon color="primary" sx={{ fontSize: 20 }} />
                  <Typography
                    variant="subtitle2"
                    fontWeight="800"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontSize: "0.75rem",
                      color: "text.secondary",
                    }}
                  >
                    Product Removed
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight="900" gutterBottom>
                  {exit.product}
                </Typography>
                <Chip
                  label={`SKU: ${exit.sku}`}
                  size="small"
                  sx={{
                    borderRadius: "8px",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    fontWeight: "600",
                    mb: 3,
                  }}
                />
                <Stack
                  direction="row"
                  sx={{
                    p: 2.5,
                    bgcolor: "error.main",
                    color: "white",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px -10px rgba(231, 76, 60, 0.4)",
                  }}
                  spacing={2}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      bgcolor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <QtyIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.9, fontWeight: "600" }}
                    >
                      Quantity Removed
                    </Typography>
                    <Typography variant="h5" fontWeight="900">
                      {exit.quantity} Units
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "24px",
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(30, 30, 30, 0.6)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="900" gutterBottom>
                Logistics Memo
              </Typography>
              <Divider sx={{ mb: 4 }} />

              <Stack spacing={4}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    fontWeight="700"
                    sx={{ mb: 1.5 }}
                  >
                    Departure Date
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "10px",
                        bgcolor: "action.hover",
                        color: "primary.main",
                      }}
                    >
                      <DateIcon fontSize="small" />
                    </Box>
                    <Typography variant="body1" fontWeight="700">
                      {exit.date}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    fontWeight="700"
                    sx={{ mb: 1.5 }}
                  >
                    Internal Memo
                  </Typography>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: "background.paper",
                      borderRadius: "16px",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      "{exit.notes}"
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
