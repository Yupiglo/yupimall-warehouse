"use client";

import { useState, useContext } from "react";
import {
    Drawer,
    Box,
    Typography,
    Stack,
    IconButton,
    Button,
    Avatar,
    Divider,
    CircularProgress,
} from "@mui/material";
import {
    Close as CloseIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as CartIcon,
    ShoppingBag as OrderIcon,
} from "@mui/icons-material";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import CheckoutModal from "@/components/CheckoutModal";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

type CartDrawerProps = {
    open: boolean;
    onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const router = useRouter();
    const { cart, loading, removeFromCart, updateQuantity, clearCart, refresh } = useCart();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
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
        await removeFromCart(cartItemId);
    };

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        await updateQuantity(productId, newQuantity);
    };

    const handleCheckoutSuccess = async () => {
        await clearCart();
        await refresh();
        setCheckoutOpen(false);
        onClose();
        router.push(LinksEnum.orders);
    };

    const cartItems = cart?.cartItem || [];
    const total = cart?.totalPrice || 0;

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        width: { xs: "100%", sm: 420 },
                        bgcolor: (theme) =>
                            theme.palette.mode === "light" ? "#fafafa" : "#121212",
                    },
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* Header */}
                    <Box
                        sx={{
                            p: 3,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <CartIcon color="primary" />
                            <Typography variant="h6" fontWeight="800">
                                Mon Panier
                            </Typography>
                            <Box
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "white",
                                    borderRadius: "8px",
                                    px: 1,
                                    py: 0.25,
                                    fontSize: "0.75rem",
                                    fontWeight: 800,
                                }}
                            >
                                {cartItems.length}
                            </Box>
                        </Stack>
                        <IconButton onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
                        {loading ? (
                            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                                <CircularProgress />
                            </Box>
                        ) : cartItems.length === 0 ? (
                            <Box sx={{ textAlign: "center", py: 8 }}>
                                <CartIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
                                <Typography variant="h6" fontWeight="700" color="text.secondary">
                                    Votre panier est vide
                                </Typography>
                                <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                                    Parcourez nos produits pour ajouter des articles
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        onClose();
                                        router.push(LinksEnum.products);
                                    }}
                                    sx={{ borderRadius: "12px", px: 4, py: 1, fontWeight: 700 }}
                                >
                                    Voir les produits
                                </Button>
                            </Box>
                        ) : (
                            <Stack spacing={2}>
                                {cartItems.map((item) => {
                                    const product = item.productId;
                                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
                                    const imageUrl = product?.imgCover?.startsWith("http")
                                        ? product.imgCover
                                        : `${apiUrl}/${product?.imgCover?.replace(/^\/?/, "")}`;

                                    return (
                                        <Box
                                            key={item._id}
                                            sx={{
                                                p: 2,
                                                borderRadius: "16px",
                                                bgcolor: (theme) =>
                                                    theme.palette.mode === "light"
                                                        ? "white"
                                                        : "rgba(255,255,255,0.03)",
                                                border: "1px solid",
                                                borderColor: "divider",
                                            }}
                                        >
                                            <Stack direction="row" spacing={2}>
                                                <Avatar
                                                    variant="rounded"
                                                    src={imageUrl}
                                                    sx={{ width: 64, height: 64, borderRadius: "12px" }}
                                                >
                                                    {product?.title?.charAt(0)}
                                                </Avatar>
                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        fontWeight="800"
                                                        noWrap
                                                        sx={{ mb: 0.5 }}
                                                    >
                                                        {product?.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="primary.main"
                                                        fontWeight="700"
                                                    >
                                                        {formatPrice(item.price)}
                                                    </Typography>
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                handleUpdateQuantity(product?._id, item.quantity - 1)
                                                            }
                                                            sx={{
                                                                bgcolor: "action.hover",
                                                                width: 28,
                                                                height: 28,
                                                            }}
                                                        >
                                                            <RemoveIcon sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                        <Typography fontWeight="800" sx={{ minWidth: 24, textAlign: "center" }}>
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                handleUpdateQuantity(product?._id, item.quantity + 1)
                                                            }
                                                            sx={{
                                                                bgcolor: "action.hover",
                                                                width: 28,
                                                                height: 28,
                                                            }}
                                                        >
                                                            <AddIcon sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                        <Box sx={{ flex: 1 }} />
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => handleRemoveItem(item._id)}
                                                        >
                                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        )}
                    </Box>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <Box
                            sx={{
                                p: 3,
                                borderTop: "1px solid",
                                borderColor: "divider",
                                bgcolor: (theme) =>
                                    theme.palette.mode === "light" ? "white" : "rgba(255,255,255,0.02)",
                            }}
                        >
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
                                <Divider />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="h6" fontWeight="800">
                                        Total
                                    </Typography>
                                    <Typography variant="h6" fontWeight="800" color="primary.main">
                                        {formatPrice(cart?.totalPriceAfterDiscount || total)}
                                    </Typography>
                                </Stack>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    startIcon={<OrderIcon />}
                                    onClick={() => setCheckoutOpen(true)}
                                    sx={{
                                        borderRadius: "12px",
                                        py: 1.5,
                                        fontWeight: 700,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Passer la commande
                                </Button>
                            </Stack>
                        </Box>
                    )}
                </Box>
            </Drawer>

            {/* Checkout Modal */}
            <CheckoutModal
                open={checkoutOpen}
                onClose={() => setCheckoutOpen(false)}
                cart={cart}
                onSuccess={handleCheckoutSuccess}
            />
        </>
    );
}
