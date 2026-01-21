"use client";

import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
    Stack,
    MenuItem,
    Alert,
    IconButton,
    InputAdornment,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    KeyboardArrowLeft,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "../../lib/axios";
import LogoBig from "@/assets/Logo/LogoBig.png";
import BgWarehouse from "@/assets/images/bg-warehouse.png";

const PLANS = ["Basic", "Enterprise"];
const PAYMENT_METHODS = [
    { value: "orange_money", label: "Orange Money" },
    { value: "mtn_mobile_money", label: "MTN MoMo" },
    { value: "cash", label: "Espèces" },
    { value: "bank_transfer", label: "Virement" },
];

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        payment_method: "orange_money",
        password: "",
        confirmPassword: "",
        requested_role: "warehouse",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axiosInstance.post("registrations", formData);
            if (response.data.status === 201) {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 3000);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.default",
                    p: 3,
                }}
            >
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, maxWidth: 500, textAlign: "center", border: "1px solid", borderColor: "divider" }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" color="success.main">
                        Inscription Réussie !
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Votre demande d'inscription Warehouse a été enregistrée. Elle sera examinée par l'administration. Vous allez être redirigé vers la page de connexion.
                    </Typography>
                    <Button variant="contained" onClick={() => router.push("/login")}>
                        Retour au Login
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
            <Grid
                size={{ xs: false, sm: 4, md: 7 }}
                sx={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${BgWarehouse.src}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: { xs: "none", sm: "flex" },
                    alignItems: "flex-end",
                    justifyContent: "center",
                    color: "white",
                    p: 8,
                    position: "relative",
                }}
            >
                <Box sx={{ position: "relative", zIndex: 1, textAlign: "left", width: "100%", mt: "auto" }}>
                    <Typography variant="h2" fontWeight="900" gutterBottom sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)", lineHeight: 1.1 }}>
                        Optimisez Votre<br />Logistique
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 500, fontWeight: 500, mt: 2 }}>
                        Rejoignez le réseau YupiFlow et transformez la gestion de votre entrepôt avec nos outils intelligents.
                    </Typography>
                </Box>
            </Grid>
            <Grid
                size={{ xs: 12, sm: 8, md: 5 }}
                component={Paper}
                elevation={0}
                square
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100vh",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                    },
                }}
            >
                <Box sx={{ p: { xs: 4, md: 8 }, maxWidth: 600, mx: "auto", width: "100%" }}>
                    <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Image src={LogoBig} alt="YupiFlow" width={100} height={40} className="object-contain" />
                        <Button
                            variant="text"
                            startIcon={<KeyboardArrowLeft />}
                            onClick={() => router.push("/login")}
                            sx={{ textTransform: "none" }}
                        >
                            Retour
                        </Button>
                    </Box>

                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Inscription Warehouse
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Veuillez remplir le formulaire pour soumettre votre demande d'adhésion au réseau.
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Nom d'utilisateur"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Téléphone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Adresse"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Ville"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Pays"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Plan"
                                    name="plan"
                                    value={formData.plan}
                                    onChange={handleChange}
                                    required
                                >
                                    {PLANS.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Méthode de Paiement"
                                    name="payment_method"
                                    value={formData.payment_method}
                                    onChange={handleChange}
                                    required
                                >
                                    {PAYMENT_METHODS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Mot de passe"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Confirmer le mot de passe"
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            sx={{ mt: 4, py: 1.5, borderRadius: 2 }}
                        >
                            {isLoading ? "Traitement en cours..." : "S'inscrire"}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 4, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Vous avez déjà un compte?{" "}
                            <Link href="/login" style={{ color: "inherit", fontWeight: "bold" }}>
                                Se connecter
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
