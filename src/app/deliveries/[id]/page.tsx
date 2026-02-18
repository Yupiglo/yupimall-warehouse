"use client";

import { use, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Breadcrumbs,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import Link from "next/link";
import {
  ArrowBack as BackIcon,
  Print as PrintIcon,
  LocalShipping as DeliveryIcon,
  Receipt as OrderIcon,
  Person as CourierIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { LinksEnum } from "@/utilities/pagesLinksEnum";
import TrackingMap from "@/components/deliveries/TrackingMap";
import axiosInstance from "@/lib/axios";
import { useActiveDeliveries } from "@/hooks/useDeliveries";

interface DeliveryData {
  id: number | string;
  orderId?: string | number;
  trackingCode?: string;
  courier?: string;
  deliveryPerson?: { name: string };
  status: string;
  timeWindow?: string;
  address?: string;
  shippingAddress?: string;
  customer?: string;
}

export default function DeliveryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  const [delivery, setDelivery] = useState<DeliveryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { deliveries } = useActiveDeliveries();

  useEffect(() => {
    if (searchParams.get("print") === "true") {
      window.print();
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to find delivery from active deliveries list first
        const foundDelivery = deliveries.find(
          (d) => d.id?.toString() === decodedId || d.orderId?.toString() === decodedId
        );

        if (foundDelivery) {
          setDelivery({
            id: foundDelivery.id,
            orderId: foundDelivery.orderId,
            courier: foundDelivery.courier || "--",
            status: foundDelivery.status || "Pending",
            address: foundDelivery.address || "--",
            customer: foundDelivery.customer || "--",
          });
          setLoading(false);
          return;
        }

        // If not found, try fetching from orders endpoint
        try {
          const orderResponse = await axiosInstance.get(`orders/${decodedId}`);
          if (orderResponse.data?.order) {
            const order = orderResponse.data.order;
            setDelivery({
              id: order.id,
              orderId: order.trackingCode || order.id,
              courier: order.deliveryPerson?.name || "--",
              status: order.status || "Pending",
              address: order.shippingAddress
                ? `${order.shippingAddress.street || ""}, ${order.shippingAddress.city || ""}`.trim()
                : "--",
              customer: order.customer || "--",
            });
          } else {
            setError("Delivery not found");
          }
        } catch (orderErr) {
          // If order fetch fails, try delivery/active endpoint
          const deliveryResponse = await axiosInstance.get("delivery/active");
          const allDeliveries = deliveryResponse.data?.deliveries || deliveryResponse.data?.data || [];
          const found = allDeliveries.find(
            (d: any) => d.id?.toString() === decodedId || d.orderId?.toString() === decodedId
          );
          if (found) {
            setDelivery({
              id: found.id,
              orderId: found.orderId || found.trackingCode,
              courier: found.courier || found.deliveryPerson?.name || "--",
              status: found.status || "Pending",
              address: found.address || found.shippingAddress || "--",
              customer: found.customer || "--",
            });
          } else {
            setError("Delivery not found");
          }
        }
      } catch (err: any) {
        console.error("Error fetching delivery:", err);
        setError(err?.response?.data?.message || "Failed to load delivery details");
      } finally {
        setLoading(false);
      }
    };

    if (deliveries.length > 0 || decodedId) {
      fetchDelivery();
    }
  }, [decodedId, deliveries]);

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s === "delivered" || s === "livré" || s === "completed") return "success";
    if (s === "in transit" || s === "en transit" || s === "in_transit" || s === "out_for_delivery") return "info";
    if (s === "pending" || s === "en attente" || s === "in progress") return "warning";
    if (s === "cancelled" || s === "annulé") return "error";
    return "default";
  };

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 }, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !delivery) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error || "Delivery not found"}
        </Alert>
        <Button variant="contained" onClick={() => router.push("/deliveries")} sx={{ mt: 2 }}>
          Back to Deliveries
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Breadcrumbs
        separator={
          <ChevronRightIcon sx={{ fontSize: "1rem", color: "text.disabled" }} />
        }
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Box
          component={Link}
          href={LinksEnum.dashboard}
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": { color: "primary.main" },
            transition: "color 0.2s",
          }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
          <Typography variant="body2" fontWeight="500">
            Home
          </Typography>
        </Box>
        <Link
          href={LinksEnum.deliveries}
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
            Deliveries
          </Typography>
        </Link>
        <Typography variant="body2" fontWeight="700" color="text.primary">
          Delivery Detail
        </Typography>
      </Breadcrumbs>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton
          onClick={() => router.push("/deliveries")}
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
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #2D3FEA 0%, #9F2DFB 100%)"
                    : "linear-gradient(135deg, #8A94FF 0%, #D88AFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: -0.5,
              }}
            >
              Delivery Status
            </Typography>
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
                height: 24,
              }}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Tracking logistics and courier assignment.
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
          Print Label
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(30, 30, 30, 0.6)",
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
                  <DeliveryIcon color="primary" />
                  <Typography variant="h6" fontWeight="800">
                    Delivery Details
                  </Typography>
                </Stack>
                <Stack spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Delivery ID
                    </Typography>
                    <Typography variant="body2" fontWeight="800">
                      {delivery.id?.toString().startsWith("#") ? delivery.id : `#${delivery.id}`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
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
                  </Stack>
                  <Divider />
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <LocationIcon
                      color="action"
                      sx={{ fontSize: 20, mt: 0.3 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Destination
                      </Typography>
                      <Typography variant="body2" fontWeight="700">
                        {delivery.address || "--"}
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
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(30, 30, 30, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <OrderIcon color="primary" sx={{ fontSize: 20 }} />
                  <Typography variant="subtitle2" fontWeight="800">
                    Linked Order
                  </Typography>
                </Stack>
                <Typography
                  variant="h5"
                  fontWeight="900"
                  color="primary.main"
                  sx={{ letterSpacing: -0.5 }}
                >
                  {delivery.orderId?.toString().startsWith("#") ? delivery.orderId : `#${delivery.orderId}`}
                </Typography>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{
                    mt: 2,
                    py: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: "700",
                    borderWidth: "1.5px",
                    "&:hover": { borderWidth: "1.5px" },
                  }}
                  onClick={() =>
                    router.push(
                      `/orders/${encodeURIComponent(delivery.orderId || delivery.id)}`
                    )
                  }
                >
                  View Order Details
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "24px",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(30, 30, 30, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="800" gutterBottom>
                Logistics Execution
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Courier assignment and delivery schedule.
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      p: 2.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.2)",
                      borderRadius: "16px",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: (theme) =>
                          theme.palette.mode === "light"
                            ? "rgba(59, 130, 246, 0.05)"
                            : "rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "primary.lighter",
                        color: "primary.main",
                        borderRadius: "10px",
                        height: "fit-content",
                      }}
                    >
                      <CourierIcon />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Assigned Courier
                      </Typography>
                      <Typography variant="body1" fontWeight="800">
                        {delivery.courier || "--"}
                      </Typography>
                      <Button
                        size="small"
                        sx={{
                          p: 0,
                          mt: 0.5,
                          minWidth: 0,
                          textTransform: "none",
                          fontWeight: "700",
                        }}
                        onClick={() => router.push("/couriers")}
                      >
                        View Profile
                      </Button>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      p: 2.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.2)",
                      borderRadius: "16px",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: (theme) =>
                          theme.palette.mode === "light"
                            ? "rgba(59, 130, 246, 0.05)"
                            : "rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "warning.lighter",
                        color: "warning.main",
                        borderRadius: "10px",
                        height: "fit-content",
                      }}
                    >
                      <TimeIcon />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Time Window
                      </Typography>
                      <Typography variant="body1" fontWeight="800">
                        {delivery.timeWindow || "--"}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight="600"
                        color="success.main"
                      >
                        On Schedule
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              <Typography variant="h6" fontWeight="800" sx={{ mt: 5, mb: 2 }}>
                Live Tracking
              </Typography>
              <TrackingMap />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
