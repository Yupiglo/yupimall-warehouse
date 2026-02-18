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
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useStockEntries } from "@/hooks/useStock";

interface AddEntryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddEntryModal({ open, onClose }: AddEntryModalProps) {
  const { products, loading: productsLoading } = useProducts();
  const { createEntry } = useStockEntries();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    supplier: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      await createEntry({
        product_id: Number(formData.productId),
        quantity: Number(formData.quantity),
        supplier: formData.supplier,
        notes: formData.notes,
      });
      setFormData({ productId: "", quantity: "", supplier: "", notes: "" });
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erreur lors de la création");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", backgroundImage: "none" } }}
    >
      <DialogTitle sx={{ m: 0, p: 3, fontWeight: "bold", fontSize: "1.25rem" }}>
        Nouvelle entrée de stock
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 24, color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 4, pt: 1 }}>
          <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              select
              label="Sélectionner un produit"
              required
              fullWidth
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              disabled={productsLoading}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            >
              {productsLoading ? (
                <MenuItem disabled><CircularProgress size={16} sx={{ mr: 1 }} /> Chargement...</MenuItem>
              ) : (products || []).length > 0 ? (
                (products || []).map((product: any) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name || product.title} {product.sku ? `(${product.sku})` : ""}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Aucun produit</MenuItem>
              )}
            </TextField>

            <TextField
              label="Quantité"
              type="number"
              required
              fullWidth
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            <TextField
              label="Fournisseur"
              fullWidth
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            <TextField
              label="Notes"
              multiline
              rows={2}
              fullWidth
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={onClose}
            sx={{ textTransform: "none", fontWeight: "bold", borderRadius: "10px", px: 3, py: 1.5, color: "text.secondary" }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{ textTransform: "none", fontWeight: "bold", borderRadius: "10px", px: 4, py: 1.5, boxShadow: "none" }}
          >
            {submitting ? <CircularProgress size={20} /> : "Ajouter l'entrée"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
