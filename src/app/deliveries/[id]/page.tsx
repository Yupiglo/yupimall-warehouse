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
  Breadcrumbs,
  Grid,
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
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import TrackingMap from "@/components/deliveries/TrackingMap";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const deliveries = [
  {
    id: "#DEL-4412",
    orderId: "#ORD-9921",
    courier: "John Doe",
    status: "In Progress",
    timeWindow: "2:00 PM - 4:00 PM",
    address: "123 Main St, New York, NY",
  },
];

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

  useEffect(() => {
    if (searchParams.get("print") === "true") {
      window.print();
    }
  }, [searchParams]);

  // Mock finding delivery by ID
  const delivery = deliveries.find((d) => d.id === decodedId) || deliveries[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "In Transit":
        return "info";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

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
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
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
                      {delivery.id}
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
                        {delivery.address}
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
                  {delivery.orderId}
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
                      `/orders/${encodeURIComponent(delivery.orderId)}`
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
                        {delivery.courier}
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
                        {delivery.timeWindow}
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
