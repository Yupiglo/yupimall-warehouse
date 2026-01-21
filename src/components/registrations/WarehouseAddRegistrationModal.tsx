"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    MenuItem,
    CircularProgress,
    Typography,
    Alert,
} from "@mui/material";
import { useState } from "react";
import axiosInstance from "../../lib/axios";

interface AddRegistrationModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const PLANS = ["Basic", "Premium", "Platinum"];
const PAYMENT_METHODS = [
    { value: "m_pesa", label: "M-Pesa" },
    { value: "airtel_money", label: "Airtel Money" },
    { value: "bank_transfer", label: "Bank Transfer" },
];

export default function WarehouseAddRegistrationModal({
    open,
    onClose,
    onSuccess,
}: AddRegistrationModalProps) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "Sénégal",
        plan: "Basic",
        payment_method: "m_pesa",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");
            await axiosInstance.post("registrations", formData);
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                country: "Sénégal",
                plan: "Basic",
                payment_method: "m_pesa",
                password: "",
            });
        } catch (err: any) {
            console.error("Failed to create registration:", err);
            setError(err.response?.data?.message || "Erreur lors de la création");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold" }}>Nouvelle Inscription Stockist</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Inscrivez un nouveau partenaire. Notez que cette inscription devra être validée par un Admin ou un Dev.
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="first_name"
                            label="Prénom"
                            fullWidth
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="last_name"
                            label="Nom"
                            fullWidth
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            name="username"
                            label="Nom d'utilisateur"
                            fullWidth
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            name="phone"
                            label="Téléphone"
                            fullWidth
                            required
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            name="password"
                            label="Mot de passe provisoire"
                            fullWidth
                            required
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            helperText="Au moins 8 caractères"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="plan"
                            select
                            label="Pack"
                            fullWidth
                            required
                            value={formData.plan}
                            onChange={handleChange}
                        >
                            {PLANS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="payment_method"
                            select
                            label="Paiement"
                            fullWidth
                            required
                            value={formData.payment_method}
                            onChange={handleChange}
                        >
                            {PAYMENT_METHODS.map((m) => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
                        </TextField>
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            name="address"
                            label="Adresse"
                            fullWidth
                            required
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="city"
                            label="Ville"
                            fullWidth
                            required
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="country"
                            label="Pays"
                            fullWidth
                            required
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">Annuler</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                    sx={{ borderRadius: "8px", px: 4 }}
                >
                    Créer l'inscription
                </Button>
            </DialogActions>
        </Dialog>
    );
}
