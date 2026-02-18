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
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  LocalShipping as DeliveryIcon,
} from "@mui/icons-material";
import axiosInstance from "@/lib/axios";
import { useDeliveryPersonnel } from "@/hooks/useDeliveries";

export default function DeliveryEditPage({
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
    status: "",
    courier: "",
    notes: "",
  });

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try fetching from orders endpoint first
        try {
          const orderResponse = await axiosInstance.get(`orders/${decodedId}`);
          if (orderResponse.data?.order) {
            const order = orderResponse.data.order;
            setFormData({
              status: order.status || "Pending",
              courier: order.deliveryPerson?.id?.toString() || order.deliveryPerson?.name || "",
              notes: order.notes || "",
            });
            setLoading(false);
            return;
          }
        } catch (orderErr) {
          // If order fetch fails, try delivery/active endpoint
          const deliveryResponse = await axiosInstance.get("delivery/active");
          const allDeliveries = deliveryResponse.data?.deliveries || deliveryResponse.data?.data || [];
          const found = allDeliveries.find(
            (d: any) => d.id?.toString() === decodedId || d.orderId?.toString() === decodedId
          );
          if (found) {
            setFormData({
              status: found.status || "Pending",
              courier: found.deliveryPerson?.id?.toString() || found.deliveryPerson?.name || found.courier || "",
              notes: found.notes || "",
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

    fetchDelivery();
  }, [decodedId]);

  const handleSave = async () => {
    try {
      setLoading(true);
      // Update delivery assignment
      if (formData.courier) {
        await axiosInstance.post(`delivery/assign/${decodedId}`, {
          delivery_person_id: formData.courier,
        });
      }
      router.push(`/deliveries/${encodeURIComponent(decodedId)}`);
    } catch (err: any) {
      console.error("Error saving delivery:", err);
      setError(err?.response?.data?.message || "Failed to save delivery");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.status) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !formData.status) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => router.push("/deliveries")} sx={{ mt: 2 }}>
          Back to Deliveries
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton
          onClick={() =>
            router.push(`/deliveries/${encodeURIComponent(decodedId)}`)
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
            fontWeight="bold"
            sx={{
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #2D3FEA 0%, #9F2DFB 100%)"
                  : "linear-gradient(135deg, #8A94FF 0%, #D88AFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Modify Delivery
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Assign courier and update live delivery status.
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
              borderRadius: "20px",
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
                <Typography variant="h6" fontWeight="bold">
                  Assignment & Status
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <TextField
                  select
                  fullWidth
                  label="Delivery Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Picked Up">Picked Up</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Delayed">Delayed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Assign Courier"
                  value={formData.courier}
                  onChange={(e) =>
                    setFormData({ ...formData, courier: e.target.value })
                  }
                  disabled={personnelLoading}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  {personnelLoading ? (
                    <MenuItem disabled>Loading couriers...</MenuItem>
                  ) : personnel.length === 0 ? (
                    <MenuItem disabled>No couriers available</MenuItem>
                  ) : (
                    personnel.map((person) => (
                      <MenuItem key={person.id} value={person.id.toString()}>
                        {person.name}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Delivery Instructions
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Specific notes for the courier regarding this delivery.
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Enter special instructions..."
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
