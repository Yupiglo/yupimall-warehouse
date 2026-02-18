"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { useDeliveryPersonnel } from "@/hooks/useDeliveries";
import axiosInstance from "@/lib/axios";

interface AddDeliveryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddDeliveryModal({ open, onClose }: AddDeliveryModalProps) {
  const { orders, loading: ordersLoading } = useOrders();
  const { personnel, loading: couriersLoading } = useDeliveryPersonnel();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    orderId: "",
    courierId: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axiosInstance.post(`delivery/assign/${formData.orderId}`, {
        delivery_person_id: formData.courierId,
        address: formData.address,
        notes: formData.notes,
      });
      onClose();
    } catch (err) {
      console.error("Erreur lors de la création:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const pendingOrders = (orders || []).filter(
    (o: any) => o.status === "pending" || o.status === "validated" || o.status === "en attente"
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "28px",
          background: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(30, 30, 30, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 24px 80px -12px rgba(0,0,0,0.15)"
              : "0 24px 80px -12px rgba(0,0,0,0.5)",
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "info.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "info.main",
            }}
          >
            <ShippingIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900">
              Nouvelle Livraison
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              Assigner un livreur à une commande
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 24,
            color: "text.secondary",
            bgcolor: "action.hover",
            "&:hover": { bgcolor: "error.lighter", color: "error.main" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3, pt: 2 }}>
          <Stack spacing={2.5}>
            <TextField
              select
              label="Sélectionner une commande"
              required
              fullWidth
              value={formData.orderId}
              onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
              disabled={ordersLoading}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
            >
              {ordersLoading ? (
                <MenuItem disabled><CircularProgress size={16} sx={{ mr: 1 }} /> Chargement...</MenuItem>
              ) : pendingOrders.length > 0 ? (
                pendingOrders.map((order: any) => (
                  <MenuItem key={order.id} value={order.id}>
                    #{order.trackingCode || order.id} — {order.customer || order.user_name || "Client"}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Aucune commande en attente</MenuItem>
              )}
            </TextField>

            <TextField
              select
              label="Assigner un livreur"
              required
              fullWidth
              value={formData.courierId}
              onChange={(e) => setFormData({ ...formData, courierId: e.target.value })}
              disabled={couriersLoading}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
            >
              {couriersLoading ? (
                <MenuItem disabled><CircularProgress size={16} sx={{ mr: 1 }} /> Chargement...</MenuItem>
              ) : personnel.length > 0 ? (
                personnel.map((courier) => (
                  <MenuItem key={courier.id} value={courier.id}>
                    {courier.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Aucun livreur disponible</MenuItem>
              )}
            </TextField>

            <TextField
              label="Adresse de livraison"
              required
              fullWidth
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
            />

            <TextField
              label="Notes"
              multiline
              rows={3}
              fullWidth
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 4, pt: 1 }}>
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
              fontWeight: "900",
              borderRadius: "12px",
              px: 3,
              py: 1.5,
              color: "text.secondary",
            }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{
              textTransform: "none",
              fontWeight: "900",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              boxShadow: (theme) => `0 8px 16px -4px ${theme.palette.primary.main}40`,
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: (theme) => `0 12px 20px -4px ${theme.palette.primary.main}60`,
              },
            }}
          >
            {submitting ? <CircularProgress size={20} /> : "Créer la livraison"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
