"use client";

import { useState, useContext } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Stack,
    TextField,
    Button,
    IconButton,
    Divider,
    Alert,
    CircularProgress,
} from "@mui/material";
import {
    Close as CloseIcon,
    LocalShipping as ShippingIcon,
    CheckCircle as SuccessIcon,
} from "@mui/icons-material";
import axiosInstance from "@/lib/axios";
import { Cart } from "@/hooks/useCart";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

type CheckoutModalProps = {
    open: boolean;
    onClose: () => void;
    cart: Cart | null;
    onSuccess: () => void;
};

export default function CheckoutModal({ open, onClose, cart, onSuccess }: CheckoutModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [trackingCode, setTrackingCode] = useState("");
    const [formData, setFormData] = useState({
        shipping_name: "",
        shipping_street: "",
        shipping_city: "",
        shipping_country: "",
        shipping_phone: "",
        shipping_zip: "",
    });
    const { selectedCurr } = useContext(CurrencyContext);

    // Format price in selected currency (prices stored in USD)
    const formatPrice = (priceUSD: number) => {
        const converted = priceUSD * selectedCurr.value;
        if (selectedCurr.symbol === "FCFA" || selectedCurr.symbol === "₦") {
            return `${Math.round(converted).toLocaleString()} ${selectedCurr.symbol}`;
        }
        return `${selectedCurr.symbol}${converted.toFixed(2)}`;
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.shipping_name || !formData.shipping_city || !formData.shipping_country || !formData.shipping_phone) {
            setError("Veuillez remplir tous les champs obligatoires");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axiosInstance.post("orders/user-cart", {
                ...formData,
                paymentMethod: "cash",
            });

            if (response.data?.order) {
                setSuccess(true);
                setTrackingCode(response.data.order.tracking_code || "");
            }
        } catch (err: any) {
            console.error("Checkout error:", err);
            setError(err?.response?.data?.message || "Erreur lors de la commande. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (success) {
            onSuccess();
        }
        setSuccess(false);
        setError("");
        setTrackingCode("");
        onClose();
    };

    const total = cart?.totalPriceAfterDiscount || cart?.totalPrice || 0;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "24px",
                    overflow: "hidden",
                },
            }}
        >
            {success ? (
                <>
                    <DialogContent sx={{ p: 6, textAlign: "center" }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                bgcolor: "success.lighter",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto",
                                mb: 3,
                            }}
                        >
                            <SuccessIcon sx={{ fontSize: 48, color: "success.main" }} />
                        </Box>
                        <Typography variant="h5" fontWeight="900" gutterBottom>
                            Commande passée avec succès !
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            Votre commande a été enregistrée et sera traitée rapidement.
                        </Typography>
                        {trackingCode && (
                            <Box
                                sx={{
                                    bgcolor: "primary.lighter",
                                    py: 2,
                                    px: 3,
                                    borderRadius: "12px",
                                    display: "inline-block",
                                }}
                            >
                                <Typography variant="caption" color="text.secondary">
                                    Code de suivi
                                </Typography>
                                <Typography variant="h6" fontWeight="900" color="primary.main">
                                    {trackingCode}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleClose}
                            sx={{ borderRadius: "12px", py: 1.5, fontWeight: 700 }}
                        >
                            Fermer
                        </Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <DialogTitle sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <ShippingIcon color="primary" />
                            <Typography variant="h6" fontWeight="800">
                                Finaliser la commande
                            </Typography>
                        </Stack>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ p: 3 }}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                                {error}
                            </Alert>
                        )}

                        <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 2 }}>
                            Adresse de livraison
                        </Typography>

                        <Stack spacing={2.5}>
                            <TextField
                                label="Nom complet *"
                                value={formData.shipping_name}
                                onChange={handleChange("shipping_name")}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Téléphone *"
                                value={formData.shipping_phone}
                                onChange={handleChange("shipping_phone")}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Adresse / Rue"
                                value={formData.shipping_street}
                                onChange={handleChange("shipping_street")}
                                fullWidth
                                size="small"
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Ville *"
                                    value={formData.shipping_city}
                                    onChange={handleChange("shipping_city")}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    label="Code postal"
                                    value={formData.shipping_zip}
                                    onChange={handleChange("shipping_zip")}
                                    fullWidth
                                    size="small"
                                />
                            </Stack>
                            <TextField
                                label="Pays *"
                                value={formData.shipping_country}
                                onChange={handleChange("shipping_country")}
                                fullWidth
                                size="small"
                            />
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Stack spacing={1.5}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography color="text.secondary">Sous-total</Typography>
                                <Typography fontWeight="700">{formatPrice(cart?.totalPrice || 0)}</Typography>
                            </Stack>
                            {cart?.discount && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Remise ({cart.discount}%)</Typography>
                                    <Typography fontWeight="700" color="error.main">
                                        -{formatPrice(((cart?.totalPrice || 0) * cart.discount) / 100)}
                                    </Typography>
                                </Stack>
                            )}
                            <Stack direction="row" justifyContent="space-between">
                                <Typography color="text.secondary">Livraison</Typography>
                                <Typography fontWeight="700" color="success.main">Gratuite</Typography>
                            </Stack>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h6" fontWeight="800">Total</Typography>
                                <Typography variant="h6" fontWeight="800" color="primary.main">
                                    {formatPrice(total)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        <Button onClick={handleClose} sx={{ borderRadius: "12px", px: 3 }}>
                            Annuler
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                            sx={{ borderRadius: "12px", px: 4, fontWeight: 700 }}
                        >
                            {loading ? "Traitement..." : "Confirmer la commande"}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}
