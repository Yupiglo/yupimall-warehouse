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
  Avatar,
  Chip,
  Divider,
  Grid,
  Breadcrumbs,
} from "@mui/material";
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

const couriers = [
  {
    id: "#COU-101",
    name: "John Doe",
    vehicle: "Motorcycle",
    phone: "+1 555-0201",
    plate: "ABC-1234",
    status: "Active",
    rating: 4.8,
  },
];

export default function CourierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  // Mock finding courier by ID
  const courier = couriers.find((c) => c.id === decodedId) || couriers[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "On Delivery":
        return "info";
      case "Offline":
        return "default";
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
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
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
                  {courier.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {courier.id}
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
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "10px",
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`,
                        color: "primary.main",
                        display: "flex",
                      }}
                    >
                      <VehicleIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Vehicle Type
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {courier.vehicle}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "10px",
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.info.main}15, ${theme.palette.info.main}25)`,
                        color: "info.main",
                        display: "flex",
                      }}
                    >
                      <PlateIcon sx={{ fontSize: 18 }} />
                    </Box>
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
                        {courier.plate}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "10px",
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.warning.main}15, ${theme.palette.warning.main}25)`,
                        color: "warning.main",
                        display: "flex",
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Phone
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {courier.phone}
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
                value: `${courier.rating}/5.0`,
                icon: <RatingIcon />,
                color: "warning",
              },
              {
                label: "Deliveries Today",
                value: "8",
                icon: <VehicleIcon />,
                color: "primary",
              },
              {
                label: "Performance",
                value: "98%",
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
                          background: (theme) => {
                            const baseColor =
                              (
                                theme.palette[
                                  stat.color as keyof typeof theme.palette
                                ] as any
                              )?.main || theme.palette.primary.main;
                            return `linear-gradient(135deg, ${baseColor}15, ${baseColor}25)`;
                          },
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
