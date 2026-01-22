"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Box,
    Chip,
} from "@mui/material";

interface Registration {
    id: number;
    sponsor_id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zip_code: string;
    plan: string;
    payment_method: string;
    status: string;
    requested_role: string;
    created_at: string;
    created_by: number | null;
}

interface ViewRegistrationModalProps {
    open: boolean;
    onClose: () => void;
    registration: Registration | null;
}

export default function ViewRegistrationModal({
    open,
    onClose,
    registration,
}: ViewRegistrationModalProps) {
    if (!registration) return null;

    const getStatusChip = (status: string) => {
        switch (status) {
            case "approved":
                return (
                    <Chip
                        label="Approuvé"
                        size="small"
                        sx={{
                            bgcolor: "success.main",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "6px"
                        }}
                    />
                );
            case "rejected":
                return (
                    <Chip
                        label="Refusé"
                        size="small"
                        sx={{
                            bgcolor: "error.main",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "6px"
                        }}
                    />
                );
            default:
                return (
                    <Chip
                        label="En attente"
                        size="small"
                        sx={{
                            bgcolor: "warning.main",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "6px"
                        }}
                    />
                );
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold" }}>Détails de l'Inscription</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">Nom complet</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {registration.first_name} {registration.last_name}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">Nom d'utilisateur</Typography>
                        <Typography variant="body1">{registration.username}</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="caption" color="text.secondary">Email</Typography>
                        <Typography variant="body1">{registration.email}</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="caption" color="text.secondary">Téléphone</Typography>
                        <Typography variant="body1">{registration.phone || "N/A"}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">Pack</Typography>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{registration.plan}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">Statut</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusChip(registration.status)}
                            <Chip
                                label={registration.requested_role === 'warehouse' ? 'Warehouse' : 'Stockist'}
                                size="small"
                                variant="outlined"
                                color={registration.requested_role === 'warehouse' ? 'secondary' : 'default'}
                                sx={{ borderRadius: "6px", fontWeight: "bold", fontSize: "0.65rem" }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="caption" color="text.secondary">Mode de paiement</Typography>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                            {registration.payment_method.replace('_', ' ')}
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="caption" color="text.secondary">Adresse</Typography>
                        <Typography variant="body1">{registration.address || "N/A"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">Ville</Typography>
                        <Typography variant="body1">{registration.city}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">Pays</Typography>
                        <Typography variant="body1">{registration.country}</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="caption" color="text.secondary">Date d'inscription</Typography>
                        <Typography variant="body1">
                            {new Date(registration.created_at).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} variant="contained" sx={{ borderRadius: "8px" }}>Fermer</Button>
            </DialogActions>
        </Dialog>
    );
}
