"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Button,
  Avatar,
  Chip,
  Divider,
  Grid,
  Breadcrumbs,
  CircularProgress,
  Alert,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  LocalShipping as VehicleIcon,
  Phone as PhoneIcon,
  NoCrash as PlateIcon,
  Stars as RatingIcon,
  Speed as PerformanceIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";
import DefaultAvatar from "@/assets/AvatarBig.png";
import axiosInstance from "@/lib/axios";
import { useDeliveryPersonnel } from "@/hooks/useDeliveries";

interface CourierData {
  id: number | string;
  name: string;
  vehicle?: string;
  phone?: string;
  plate?: string;
  status: string;
  rating?: number;
  totalDeliveries?: number;
  performance?: number;
}

export default function CourierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  const { personnel, loading: personnelLoading } = useDeliveryPersonnel();
  const [courier, setCourier] = useState<CourierData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    deliveriesToday: 0,
    performance: 0,
    rating: 0,
  });

  useEffect(() => {
    const fetchCourier = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to find courier from personnel list
        const foundCourier = personnel.find(
          (p) => p.id?.toString() === decodedId
        );

        if (foundCourier) {
          setCourier({
            id: foundCourier.id,
            name: foundCourier.name,
            vehicle: foundCourier.vehicle || "--",
            phone: foundCourier.phone || "--",
            plate: "--",
            status: foundCourier.status || "Active",
            totalDeliveries: foundCourier.totalDeliveries || 0,
          });

          // Fetch additional stats if available
          try {
            const statsResponse = await axiosInstance.get(`delivery/personnel/${foundCourier.id}/stats`);
            if (statsResponse.data) {
              setStats({
                deliveriesToday: statsResponse.data.deliveriesToday || 0,
                performance: statsResponse.data.performance || 0,
                rating: statsResponse.data.rating || 0,
              });
            }
          } catch (statsErr) {
            // Stats endpoint might not exist, use defaults
            setStats({
              deliveriesToday: 0,
              performance: 0,
              rating: 0,
            });
          }
        } else if (personnel.length > 0) {
          // If not found and we have personnel loaded, courier doesn't exist
          setError("Courier not found");
        }
      } catch (err: any) {
        console.error("Error fetching courier:", err);
        setError(err?.response?.data?.message || "Failed to load courier details");
      } finally {
        setLoading(false);
      }
    };

    if (!personnelLoading) {
      fetchCourier();
    }
  }, [decodedId, personnel, personnelLoading]);

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s === "active" || s === "actif") return "success";
    if (s === "on delivery" || s === "en livraison") return "info";
    if (s === "offline" || s === "hors ligne") return "default";
    return "default";
  };

  if (loading || personnelLoading) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 }, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !courier) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error || "Courier not found"}
        </Alert>
        <Button variant="contained" onClick={() => router.push("/couriers")} sx={{ mt: 2 }}>
          Back to Couriers
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
          href={LinksEnum.couriers}
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
            Couriers
          </Typography>
        </Link>
        <Typography variant="body2" fontWeight="700" color="text.primary">
          Courier Profile
        </Typography>
      </Breadcrumbs>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton
          onClick={() => router.push("/couriers")}
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
              Courier Profile
            </Typography>
            <Chip
              label={courier.status}
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
                color: `${getStatusColor(courier.status)}.main`,
                border: "1px solid",
                borderColor: `${getStatusColor(courier.status)}.main`,
                height: 24,
              }}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Viewing courier details and performance metrics.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() =>
            router.push(`/couriers/${encodeURIComponent(decodedId)}/edit`)
          }
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
            boxShadow: "none",
          }}
        >
          Edit Courier
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.light",
                    color: "primary.main",
                    fontSize: "3rem",
                    fontWeight: "bold",
                    border: "4px solid",
                    borderColor: "background.paper",
                  }}
                  src={DefaultAvatar.src}
                >
                  {courier.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" fontWeight="bold">
                  {courier.name || "--"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {courier.id?.toString().startsWith("#") ? courier.id : `#${courier.id}`}
                </Typography>
                <Chip
                  label={courier.status}
                  size="small"
                  sx={{
                    mt: 2,
                    fontWeight: "800",
                    fontSize: "0.65rem",
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    bgcolor: (theme) =>
                      theme.palette.mode === "light"
                        ? "common.white"
                        : "rgba(255, 255, 255, 0.05)",
                    color: `${getStatusColor(courier.status)}.main`,
                    border: "1px solid",
                    borderColor: `${getStatusColor(courier.status)}.main`,
                  }}
                />
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
                backdropFilter: "blur(12px)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Logistics Info
                </Typography>
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <VehicleIcon
                      sx={{ color: "text.secondary", fontSize: 20 }}
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Vehicle Type
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {courier.vehicle || "--"}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PlateIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        License Plate
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "monospace", fontWeight: "bold" }}
                      >
                        {courier.plate || "--"}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PhoneIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Phone
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {courier.phone || "--"}
                      </Typography>
                    </Box>
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
                label: "Courier Rating",
                value: stats.rating > 0 ? `${stats.rating.toFixed(1)}/5.0` : "--",
                icon: <RatingIcon />,
                color: "warning",
              },
              {
                label: "Deliveries Today",
                value: stats.deliveriesToday > 0 ? stats.deliveriesToday.toString() : "--",
                icon: <VehicleIcon />,
                color: "primary",
              },
              {
                label: "Performance",
                value: stats.performance > 0 ? `${stats.performance}%` : "--",
                icon: <PerformanceIcon />,
                color: "success",
              },
            ].map((stat, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "24px",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "12px",
                          bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.1),
                          color: `${stat.color}.main`,
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {stat.label}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
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
                elevation={0}
                sx={{
                  borderRadius: "24px",
                  border: "1px solid",
                  borderColor: "divider",
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(30, 30, 30, 0.2)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Active Deliveries
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Box
                    sx={{
                      p: 3,
                      textAlign: "center",
                      bgcolor: "rgba(0,0,0,0.02)",
                      borderRadius: "12px",
                      border: "1px dashed",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No active deliveries currently assigned to this courier.
                    </Typography>
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
