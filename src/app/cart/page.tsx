"use client";

import { useState, useContext } from "react";
import {
    Box,
    Typography,
    Stack,
    Card,
    CardContent,
    IconButton,
    Button,
    Avatar,
    Divider,
    CircularProgress,
    Breadcrumbs,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as CartIcon,
    Home as HomeIcon,
    ChevronRight as ChevronRightIcon,
    ShoppingBag as OrderIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";
import { useCart } from "@/hooks/useCart";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

export default function CartPage() {
    const router = useRouter();
    const { cart, loading, removeFromCart, updateQuantity, clearCart, refresh } = useCart();
    const [orderLoading, setOrderLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
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

    const handleRemoveItem = async (cartItemId: string) => {
        const result = await removeFromCart(cartItemId);
        setSnackbar({
            open: true,
            message: result.message,
            severity: result.success ? "success" : "error",
        });
    };

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        await updateQuantity(productId, newQuantity);
    };

    const handlePlaceOrder = async () => {
        if (!cart || cart.cartItem.length === 0) return;

        try {
            setOrderLoading(true);
            const response = await axiosInstance.post("orders/user-cart");

            if (response.data) {
                await clearCart();
                setSnackbar({
                    open: true,
                    message: "Commande passée avec succès!",
                    severity: "success",
                });
                setTimeout(() => {
                    router.push(LinksEnum.orders);
                }, 1500);
            }
        } catch (err: any) {
            setSnackbar({
                open: true,
                message: err?.response?.data?.message || "Erreur lors de la commande",
                severity: "error",
            });
        } finally {
            setOrderLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    const cartItems = cart?.cartItem || [];
    const total = cart?.totalPrice || 0;

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Breadcrumbs Header */}
            <Box sx={{ mb: 4 }}>
                <Breadcrumbs
                    separator={<ChevronRightIcon sx={{ fontSize: "1rem", color: "text.disabled" }} />}
                    aria-label="breadcrumb"
                    sx={{ mb: 3 }}
                >
                    <Box style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}>
                        <HomeIcon sx={{ mr: 0.5, fontSize: "1.2rem", color: "primary.main" }} />
                        <Typography variant="body2" fontWeight="500" sx={{ color: "text.secondary" }}>
                            Home
                        </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="body2" fontWeight="600" color="text.primary">
                            Panier
                        </Typography>
                        <CartIcon sx={{ fontSize: "0.9rem", color: "primary.main", mb: 0.1 }} />
                    </Stack>
                </Breadcrumbs>

                <Typography
                    variant="h4"
                    fontWeight="900"
                    sx={{
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        letterSpacing: -1,
                    }}
                >
                    Mon Panier
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {cartItems.length} article{cartItems.length !== 1 ? "s" : ""} dans votre panier
                </Typography>
            </Box>

            {cartItems.length === 0 ? (
                <Card
                    sx={{
                        borderRadius: "24px",
                        p: 6,
                        textAlign: "center",
                        background: (theme) =>
                            theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 30, 30, 0.6)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <CartIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
                    <Typography variant="h6" fontWeight="700" color="text.secondary">
                        Votre panier est vide
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                        Parcourez nos produits pour ajouter des articles
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => router.push(LinksEnum.products)}
                        sx={{ borderRadius: "12px", px: 4, py: 1.5, fontWeight: 700 }}
                    >
                        Voir les produits
                    </Button>
                </Card>
            ) : (
                <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
                    {/* Cart Items */}
                    <Box sx={{ flex: 2 }}>
                        <Stack spacing={2}>
                            {cartItems.map((item) => {
                                const product = item.productId;
                                const imageUrl = product?.imgCover?.startsWith("http")
                                    ? product.imgCover
                                    : `/${product?.imgCover?.replace(/^\/?/, '')}`;

                                return (
                                    <Card
                                        key={item._id}
                                        sx={{
                                            borderRadius: "20px",
                                            background: (theme) =>
                                                theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 30, 30, 0.6)",
                                            backdropFilter: "blur(12px)",
                                            border: "1px solid",
                                            borderColor: "divider",
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Stack direction="row" spacing={3} alignItems="center">
                                                <Avatar
                                                    variant="rounded"
                                                    src={imageUrl}
                                                    sx={{ width: 80, height: 80, borderRadius: "16px" }}
                                                >
                                                    {product?.title?.charAt(0)}
                                                </Avatar>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="subtitle1" fontWeight="800">
                                                        {product?.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {formatPrice(item.price)} / unité
                                                    </Typography>
                                                </Box>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleUpdateQuantity(product?._id, item.quantity - 1)}
                                                        sx={{ bgcolor: "action.hover" }}
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Typography fontWeight="800" sx={{ minWidth: 30, textAlign: "center" }}>
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleUpdateQuantity(product?._id, item.quantity + 1)}
                                                        sx={{ bgcolor: "action.hover" }}
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                                <Typography variant="subtitle1" fontWeight="800" color="primary.main" sx={{ minWidth: 100, textAlign: "right" }}>
                                                    {formatPrice(item.price * item.quantity)}
                                                </Typography>
                                                <IconButton onClick={() => handleRemoveItem(item._id)} color="error" size="small">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Stack>
                    </Box>

                    {/* Order Summary */}
                    <Box sx={{ flex: 1 }}>
                        <Card
                            sx={{
                                borderRadius: "24px",
                                background: (theme) =>
                                    theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 30, 30, 0.6)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid",
                                borderColor: "divider",
                                position: "sticky",
                                top: 20,
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>
                                    Résumé de la commande
                                </Typography>
                                <Stack spacing={2}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography color="text.secondary">Sous-total</Typography>
                                        <Typography fontWeight="700">{formatPrice(total)}</Typography>
                                    </Stack>
                                    {cart?.discount && (
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography color="text.secondary">Remise ({cart.discount}%)</Typography>
                                            <Typography fontWeight="700" color="error.main">
                                                -{formatPrice((total * cart.discount) / 100)}
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
                                            {formatPrice(cart?.totalPriceAfterDiscount || total)}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    startIcon={<OrderIcon />}
                                    onClick={handlePlaceOrder}
                                    disabled={orderLoading}
                                    sx={{
                                        mt: 4,
                                        borderRadius: "12px",
                                        py: 1.5,
                                        fontWeight: 700,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {orderLoading ? "Commande en cours..." : "Passer la commande"}
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Stack>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
