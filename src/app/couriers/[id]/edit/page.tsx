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
  Grid,
  MenuItem,
  Breadcrumbs,
  Avatar,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DefaultAvatar from "@/assets/AvatarBig.png";
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  LocalShipping as VehicleIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";
import axiosInstance from "@/lib/axios";
import { useDeliveryPersonnel } from "@/hooks/useDeliveries";

export default function CourierEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  const { personnel, loading: personnelLoading } = useDeliveryPersonnel();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    vehicle: "",
    phone: "",
    plate: "",
    status: "Active",
  });

  useEffect(() => {
    const fetchCourier = async () => {
      try {
        setLoading(true);
        setError(null);

        const foundCourier = personnel.find(
          (p) => p.id?.toString() === decodedId
        );

        if (foundCourier) {
          setFormData({
            name: foundCourier.name || "",
            vehicle: foundCourier.vehicle || "",
            phone: foundCourier.phone || "",
            plate: "",
            status: foundCourier.status || "Active",
          });
        } else if (personnel.length > 0) {
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

  const handleSave = async () => {
    try {
      setLoading(true);
      // Note: Update endpoint might not exist, this is a placeholder
      // await axiosInstance.put(`delivery/personnel/${decodedId}`, formData);
      router.push(`/couriers/${encodeURIComponent(decodedId)}`);
    } catch (err: any) {
      console.error("Error saving courier:", err);
      setError(err?.response?.data?.message || "Failed to save courier");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 }, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !formData.name) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error}
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
        <Link
          href={`/couriers/${encodeURIComponent(decodedId)}`}
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
            {decodedId}
          </Typography>
        </Link>
        <Typography variant="body2" fontWeight="700" color="text.primary">
          Edit
        </Typography>
      </Breadcrumbs>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton
          onClick={() =>
            router.push(`/couriers/${encodeURIComponent(decodedId)}`)
          }
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
          }}
        >
          <BackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
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
            Edit Courier
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Update courier profile and vehicle details.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            boxShadow: "none",
          }}
        >
          Save Changes
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
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
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Personal Details
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Avatar
                    src={DefaultAvatar.src}
                    sx={{
                      width: 100,
                      height: 100,
                      border: "4px solid",
                      borderColor: "background.paper",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
                <TextField
                  fullWidth
                  disabled
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <TextField
                  fullWidth
                  disabled
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Courier Status
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.status === "Active"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: e.target.checked ? "Active" : "Inactive",
                          })
                        }
                      />
                    }
                    label={formData.status === "Active" ? "Active" : "Inactive"}
                    labelPlacement="start"
                    sx={{ ml: 0 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                  }}
                >
                  <VehicleIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Vehicle Information
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <TextField
                  select
                  fullWidth
                  disabled
                  label="Vehicle Type"
                  value={formData.vehicle}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicle: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="Motorcycle">Motorcycle</MenuItem>
                  <MenuItem value="Van">Van</MenuItem>
                  <MenuItem value="Car">Car</MenuItem>
                  <MenuItem value="Bicycle">Bicycle</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  disabled
                  label="License Plate"
                  value={formData.plate}
                  onChange={(e) =>
                    setFormData({ ...formData, plate: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  placeholder="ABC-1234"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
