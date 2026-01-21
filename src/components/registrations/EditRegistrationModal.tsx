"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    Alert,
} from "@mui/material";
import { useState, useEffect } from "react";

interface Registration {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    plan: string;
    payment_method: string;
    requested_role: string;
}

interface EditRegistrationModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (id: number, data: Partial<Registration>) => Promise<void>;
    registration: Registration | null;
}

const PLANS = ["BASIC", "STANDARD", "PREMIUM"];
const PAYMENT_METHODS = [
    { value: "orange_money", label: "Orange Money" },
    { value: "mtn_mobile_money", label: "MTN MoMo" },
    { value: "cash", label: "Espèces" },
    { value: "bank_transfer", label: "Virement" },
];

export default function EditRegistrationModal({
    open,
    onClose,
    onSave,
    registration,
}: EditRegistrationModalProps) {
    const [formData, setFormData] = useState<Partial<Registration>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (registration) {
            setFormData({
                first_name: registration.first_name,
                last_name: registration.last_name,
                email: registration.email,
                phone: registration.phone,
                address: registration.address,
                city: registration.city,
                country: registration.country,
                plan: registration.plan,
                payment_method: registration.payment_method,
                requested_role: registration.requested_role || "stockist",
            });
        }
    }, [registration]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!registration) return;
        setLoading(true);
        setError(null);
        try {
            await onSave(registration.id, formData);
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur lors de la mise à jour");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold" }}>Modifier l'Inscription</DialogTitle>
            <DialogContent dividers>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="first_name"
                            label="Prénom"
                            fullWidth
                            value={formData.first_name || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="last_name"
                            label="Nom"
                            fullWidth
                            value={formData.last_name || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            value={formData.email || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            name="phone"
                            label="Téléphone"
                            fullWidth
                            value={formData.phone || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="plan"
                            select
                            label="Pack"
                            fullWidth
                            value={formData.plan || ""}
                            onChange={handleChange}
                        >
                            {PLANS.map((p) => (
                                <MenuItem key={p} value={p}>{p}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="payment_method"
                            select
                            label="Mode de paiement"
                            fullWidth
                            value={formData.payment_method || ""}
                            onChange={handleChange}
                        >
                            {PAYMENT_METHODS.map((m) => (
                                <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="requested_role"
                            label="Rôle"
                            fullWidth
                            disabled
                            value={formData.requested_role || "stockist"}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            name="address"
                            label="Adresse"
                            fullWidth
                            value={formData.address || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="city"
                            label="Ville"
                            fullWidth
                            value={formData.city || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            name="country"
                            label="Pays"
                            fullWidth
                            value={formData.country || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} sx={{ borderRadius: "8px" }}>Annuler</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    sx={{ borderRadius: "8px" }}
                >
                    {loading ? "Enregistrement..." : "Enregistrer"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
