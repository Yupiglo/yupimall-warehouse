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
} from "@mui/material";
import {
  Close as CloseIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import { useState } from "react";

interface AddDeliveryModalProps {
  open: boolean;
  onClose: () => void;
}

const mockOrders = [
  { id: "#ORD-9921", customer: "Alice Johnson" },
  { id: "#ORD-9920", customer: "Mark Spencer" },
  { id: "#ORD-9919", customer: "Elena Gomez" },
];

const mockCouriers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Tyson" },
];

export default function AddDeliveryModal({
  open,
  onClose,
}: AddDeliveryModalProps) {
  const [formData, setFormData] = useState({
    orderId: "",
    courierId: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nueva entrega:", formData);
    onClose();
  };

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
              Assign New Delivery
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="700"
            >
              Dispatch logistics for an order
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
              label="Select Order"
              required
              fullWidth
              value={formData.orderId}
              onChange={(e) =>
                setFormData({ ...formData, orderId: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "white"
                      : "rgba(255,255,255,0.03)",
                },
              }}
            >
              {mockOrders.map((order) => (
                <MenuItem key={order.id} value={order.id}>
                  {order.id} - {order.customer}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Assign Courier"
              required
              fullWidth
              value={formData.courierId}
              onChange={(e) =>
                setFormData({ ...formData, courierId: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "white"
                      : "rgba(255,255,255,0.03)",
                },
              }}
            >
              {mockCouriers.map((courier) => (
                <MenuItem key={courier.id} value={courier.id}>
                  {courier.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Delivery Address"
              required
              fullWidth
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "white"
                      : "rgba(255,255,255,0.03)",
                },
              }}
            />

            <TextField
              label="Notes"
              multiline
              rows={3}
              fullWidth
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "white"
                      : "rgba(255,255,255,0.03)",
                },
              }}
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
              py: 1.2,
              color: "text.secondary",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: "900",
              borderRadius: "12px",
              px: 4,
              py: 1.2,
              boxShadow: (theme) =>
                `0 8px 16px -4px ${theme.palette.primary.main}40`,
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: (theme) =>
                  `0 12px 20px -4px ${theme.palette.primary.main}60`,
              },
            }}
          >
            Create Delivery
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
