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
import { Close as CloseIcon, Input as EntryIcon } from "@mui/icons-material";
import { useState } from "react";

interface AddEntryModalProps {
  open: boolean;
  onClose: () => void;
}

import { mockProducts } from "@/data/mocks/products";

export default function AddEntryModal({ open, onClose }: AddEntryModalProps) {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    supplier: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nueva entrada:", formData);
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
              bgcolor: "primary.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.main",
            }}
          >
            <EntryIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900">
              New Stock Entry
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="700"
            >
              Record incoming warehouse inventory
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
              label="Select Product"
              required
              fullWidth
              value={formData.productId}
              onChange={(e) =>
                setFormData({ ...formData, productId: e.target.value })
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
              {mockProducts.map((product) => (
                <MenuItem
                  key={product.id}
                  value={product.id}
                  sx={{ py: 1.5, borderRadius: "8px", mx: 1, my: 0.5 }}
                >
                  <Typography variant="body2" fontWeight="700">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({product.sku})
                  </Typography>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Quantity"
              type="number"
              required
              fullWidth
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
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
              label="Supplier"
              fullWidth
              value={formData.supplier}
              onChange={(e) =>
                setFormData({ ...formData, supplier: e.target.value })
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
            Submit Entry
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
