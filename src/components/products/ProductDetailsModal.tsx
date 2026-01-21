"use client";

import React, { useContext, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Stack,
    Box,
    Button,
    CircularProgress,
    Chip,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
} from "@mui/material";
import {
    Close as CloseIcon,
    ShoppingCart as ShoppingCartIcon,
    Add as PlusIcon,
    Remove as MinusIcon,
    Check as CheckIcon,
    LocalShipping as TruckIcon,
    Star as StarIcon,
    Nature as LeafIcon,
    Science as FlaskConicalIcon,
    AutoAwesome as SparklesIcon,
    ExpandMore as ExpandMoreIcon,
    CheckCircle as CheckCircleIcon,
    Restore as RotateCcwIcon,
} from "@mui/icons-material";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

interface ProductDetailsModalProps {
    open: boolean;
    onClose: () => void;
    productId: string;
}

interface Variant {
    key: string;
    value: string;
}

interface Ingredient {
    name: string;
    amount?: string;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ open, onClose, productId }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            scroll="paper"
            PaperProps={{
                sx: {
                    borderRadius: "28px",
                    overflow: "hidden",
                    height: '90vh',
                },
            }}
        >
            {open && <ProductDetailsContent productId={productId} onClose={onClose} />}
        </Dialog>
    );
};

const ProductDetailsContent: React.FC<{ productId: string; onClose: () => void }> = ({ productId, onClose }) => {
    const { product, loading, error } = useProduct(productId);
    const { addToCart, loading: cartLoading } = useCart();
    const { selectedCurr } = useContext(CurrencyContext);

    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [expanded, setExpanded] = useState<string | false>("benefits");

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (loading) {
        return (
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
                <CircularProgress color="primary" />
                <Typography sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
                    Chargement des détails...
                </Typography>
            </DialogContent>
        );
    }

    if (error || !product) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="error" fontWeight="bold">
                    {error || "Produit introuvable"}
                </Typography>
                <Button onClick={onClose} sx={{ mt: 2 }} variant="outlined">Fermer</Button>
            </Box>
        );
    }

    const apiUrl = (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== "")
        ? process.env.NEXT_PUBLIC_API_URL
        : "https://api.yupimall.net";
    const getImagePath = (path: string | null | undefined): string => {
        if (!path || path.trim() === "" || path === "/placeholder-product.png") return "/placeholder-product.png";
        if (path.startsWith('http')) return path;

        const cleanPath = path.replace(/^\//, "");
        const base = apiUrl.replace(/\/$/, "");

        return `${base}/${cleanPath}`;
    };

    const images = [
        getImagePath(product.imgCover),
        ...(Array.isArray(product.images) ? product.images.map(img => getImagePath(img)) : [])
    ].filter(Boolean);

    const effectiveDiscount = product.discountPercentage || 0;
    const originalPrice = product.price || 0;
    const price = effectiveDiscount > 0
        ? originalPrice - (originalPrice * (effectiveDiscount / 100))
        : originalPrice;

    const formatCurrency = (val: number) => {
        const converted = val * selectedCurr.value;
        if (selectedCurr.symbol === "FCFA" || selectedCurr.symbol === "₦") {
            return `${Math.round(converted).toLocaleString()} ${selectedCurr.symbol}`;
        }
        return `${selectedCurr.symbol}${converted.toFixed(2)}`;
    };

    const handleAddToCart = async () => {
        const result = await addToCart(product.id as string, quantity);
        if (result.success) {
            setIsAddedToCart(true);
            setTimeout(() => setIsAddedToCart(false), 2000);
        }
    };

    const benefits = Array.isArray(product.benefits) && product.benefits.length > 0 ? product.benefits : [
        "Favorise l'équilibre émotionnel",
        "Soutient un sommeil réparateur",
        "Renforce le système immunitaire",
        "Améliore la concentration",
        "Soutient le métabolisme énergétique"
    ];

    const rawIngredients = Array.isArray(product.ingredients) ? product.ingredients : [
        { name: "Vitamine D3", amount: "2000 UI" },
        { name: "Magnésium", amount: "200 mg" },
        { name: "Zinc", amount: "15 mg" },
    ];
    const realIngredients: Ingredient[] = rawIngredients.map((ing: string | Ingredient) =>
        typeof ing === 'string' ? { name: ing } : ing
    );

    let productVariants: Variant[] = [];
    try {
        if (typeof product.variants === 'string') {
            productVariants = JSON.parse(product.variants);
        } else if (Array.isArray(product.variants)) {
            productVariants = product.variants as Variant[];
        }
    } catch (e) {
        console.error("Failed to parse variants", e);
    }

    return (
        <>
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, bgcolor: 'background.paper' }}>
                <Typography variant="h6" component="span" fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 1.5, fontSize: '1rem' }}>
                    Détails du Produit
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.200' } }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flex: 1, overflowY: 'auto', pb: 4 }}>
                    <Grid container>
                        {/* Left Side: Images */}
                        <Grid size={{ xs: 12, md: 5 }} sx={{ bgcolor: 'grey.50', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: { md: '1px solid' }, borderColor: 'divider' }}>
                            <Box sx={{ width: '100%', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, bgcolor: 'white', borderRadius: '24px', p: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={product.title}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                            </Box>
                            {images.length > 1 && (
                                <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', width: '100%', pb: 1, justifyContent: 'center' }}>
                                    {images.map((img, idx) => (
                                        <Box
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: '12px',
                                                border: '2px solid',
                                                borderColor: idx === currentImageIndex ? 'primary.main' : 'transparent',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                flexShrink: 0,
                                                bgcolor: 'white',
                                                transition: 'all 0.2s',
                                                '&:hover': { borderColor: idx === currentImageIndex ? 'primary.main' : 'grey.300' }
                                            }}
                                        >
                                            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" />
                                        </Box>
                                    ))}
                                </Stack>
                            )}
                        </Grid>

                        {/* Right Side: Primary Info */}
                        <Grid size={{ xs: 12, md: 7 }} sx={{ p: { xs: 3, md: 5 } }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="overline" color="primary" fontWeight="900" letterSpacing={2}>
                                    {typeof product.category === 'string' ? product.category : (product.category?.name || "Premium")}
                                </Typography>
                                <Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} sx={{ fontSize: 14, color: 'warning.main' }} />)}
                                    <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ ml: 0.5 }}>(32 avis)</Typography>
                                </Stack>
                            </Stack>

                            <Typography variant="h3" fontWeight="900" sx={{ mb: 2, color: 'text.primary', lineHeight: 1.1 }}>
                                {product.title}
                            </Typography>

                            <Box sx={{ mb: 4 }}>
                                <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mb: 0.5 }}>
                                    <Typography variant="h3" fontWeight="950" color="primary.main">
                                        {formatCurrency(price)}
                                    </Typography>
                                    {effectiveDiscount > 0 && (
                                        <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.disabled', fontWeight: 700 }}>
                                            {formatCurrency(originalPrice)}
                                        </Typography>
                                    )}
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {product.pv !== undefined && (
                                        <Chip
                                            label={`${product.pv} PV`}
                                            size="small"
                                            sx={{ fontWeight: 900, bgcolor: 'warning.lighter', color: 'warning.darker', borderRadius: '8px' }}
                                        />
                                    )}
                                    <Typography variant="caption" color="text.secondary" fontWeight="700">Points Volume</Typography>
                                </Stack>
                            </Box>

                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7, fontSize: '1rem' }}>
                                {product.description || "Formule complète avec tous les nutriments essentiels. Favorise l'équilibre émotionnel, soutient le sommeil et améliore la concentration."}
                            </Typography>

                            {/* Trust Badges Bar */}
                            <Stack direction="row" spacing={3} sx={{ py: 3, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'grey.100', mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <TruckIcon sx={{ color: 'grey.400', fontSize: 18 }} />
                                    <Typography variant="caption" fontWeight="800" color="text.secondary">Livraison Gratuite</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon sx={{ color: 'grey.400', fontSize: 18 }} />
                                    <Typography variant="caption" fontWeight="800" color="text.secondary">Qualité Garantie</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <RotateCcwIcon sx={{ color: 'grey.400', fontSize: 18 }} />
                                    <Typography variant="caption" fontWeight="800" color="text.secondary">Retours 30j</Typography>
                                </Box>
                            </Stack>

                            {/* Specifications Grid */}
                            {productVariants.length > 0 && (
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="subtitle2" fontWeight="950" sx={{ mb: 2, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5, color: 'text.disabled' }}>
                                        Caractéristique & Spécificités
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {productVariants.map((v, idx) => (
                                            <Grid size={{ xs: 6 }} key={idx}>
                                                <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.100', borderRadius: '16px', bgcolor: 'grey.50' }}>
                                                    <Typography variant="caption" color="text.disabled" fontWeight="800" display="block" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                                                        {v.key}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight="900">
                                                        {v.value}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}
                        </Grid>
                    </Grid>

                    {/* Extended Sections - Accordions */}
                    <Box sx={{ mt: 2 }}>
                        {/* Benefits Accordion */}
                        <Accordion expanded={expanded === 'benefits'} onChange={handleChange('benefits')} elevation={0} sx={{ '&:before': { display: 'none' }, borderTop: '1px solid', borderColor: 'divider' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />} sx={{ px: { xs: 3, md: 5 }, py: 1 }}>
                                <Typography fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Bénéfices</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: { xs: 3, md: 5 }, pb: 4 }}>
                                <Grid container spacing={2}>
                                    {benefits.map((benefit, idx) => (
                                        <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                                            <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2, bgcolor: 'success.lighter', borderRadius: '16px', height: '100%' }}>
                                                <CheckIcon sx={{ color: 'success.main', fontSize: 18 }} />
                                                <Typography variant="body2" fontWeight="700" color="success.darker">{benefit}</Typography>
                                            </Stack>
                                        </Grid>
                                    ))}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        {/* Ingredients Accordion */}
                        <Accordion expanded={expanded === 'ingredients'} onChange={handleChange('ingredients')} elevation={0} sx={{ '&:before': { display: 'none' }, borderTop: '1px solid', borderColor: 'divider' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />} sx={{ px: { xs: 3, md: 5 }, py: 1 }}>
                                <Typography fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Ingrédients</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: { xs: 3, md: 5 }, pb: 4 }}>
                                <Grid container spacing={2}>
                                    {realIngredients.map((ing, idx) => (
                                        <Grid size={{ xs: 6, sm: 4, lg: 3 }} key={idx}>
                                            <Box sx={{ p: 2.5, bgcolor: 'grey.50', borderRadius: '20px', textAlign: 'center', height: '100%', border: '1px solid', borderColor: 'grey.100' }}>
                                                <LeafIcon sx={{ color: 'success.main', mb: 1.5, fontSize: 24 }} />
                                                <Typography variant="subtitle2" fontWeight="900" display="block">{ing.name}</Typography>
                                                {ing.amount && <Typography variant="caption" color="text.secondary" fontWeight="700">{ing.amount}</Typography>}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        {/* How To Use Accordion */}
                        <Accordion expanded={expanded === 'usage'} onChange={handleChange('usage')} elevation={0} sx={{ '&:before': { display: 'none' }, borderTop: '1px solid', borderColor: 'divider' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />} sx={{ px: { xs: 3, md: 5 }, py: 1 }}>
                                <Typography fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Comment utiliser</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: { xs: 3, md: 5 }, pb: 4 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
                                    {product.howToUse || "Conseils d'utilisation non disponibles pour le moment. Généralement recommandé une fois par jour au cours d'un repas."}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* Science & Research Accordion */}
                        <Accordion expanded={expanded === 'research'} onChange={handleChange('research')} elevation={0} sx={{ '&:before': { display: 'none' }, borderTop: '1px solid', borderColor: 'divider' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />} sx={{ px: { xs: 3, md: 5 }, py: 1 }}>
                                <Typography fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>Recherche Clinique</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: { xs: 3, md: 5 }, pb: 4 }}>
                                <Box sx={{ p: 4, bgcolor: 'grey.900', borderRadius: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                                    <FlaskConicalIcon sx={{ position: 'absolute', right: -20, top: -20, fontSize: 120, opacity: 0.1, color: 'primary.main' }} />
                                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                                        <SparklesIcon sx={{ color: 'primary.light', fontSize: 20 }} />
                                        <Typography variant="overline" color="primary.light" fontWeight="950" letterSpacing={2}>Science & Rigueur</Typography>
                                    </Stack>
                                    <Typography variant="h5" fontWeight="900" sx={{ mb: 2, lineHeight: 1.3 }}>Formulé avec rigueur.<br />Soutenu par la science.</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                                        {product.clinicalResearch || "Chaque ingrédient est sélectionné sur la base d'études cliniques rigoureuses pour garantir une efficacité optimale et une sécurité totale. Notre protocole de fabrication respecte les normes internationales les plus strictes."}
                                    </Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    {/* Sold By Info */}
                    <Box sx={{ px: { xs: 3, md: 5 }, py: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption" color="text.disabled" fontWeight="800">Vendu et expédié par</Typography>
                            <Typography variant="caption" color="secondary.main" fontWeight="900" sx={{ textTransform: 'uppercase' }}>YUPI GLOBAL</Typography>
                            <SparklesIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                        </Stack>
                    </Box>
                </Box>
            </DialogContent>

            {/* Sticky Footer */}
            <DialogActions sx={{ p: { xs: 2.5, md: 3 }, px: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.paper', position: 'relative', borderTop: '1px solid', borderColor: 'divider', boxShadow: '0 -4px 20px rgba(0,0,0,0.03)' }}>
                <Box>
                    <Typography variant="caption" color="text.disabled" fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Total</Typography>
                    <Typography variant="h4" fontWeight="950" color="text.primary">
                        {formatCurrency(price * quantity)}
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', borderRadius: '14px', p: 0.5 }}>
                        <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.50' } }}>
                            <MinusIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 900 }}>{quantity}</Typography>
                        <IconButton size="small" onClick={() => setQuantity(quantity + 1)} sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.50' } }}>
                            <PlusIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={isAddedToCart ? <CheckIcon sx={{ strokeWidth: 3 }} /> : <ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        disabled={cartLoading || isAddedToCart}
                        sx={{
                            borderRadius: '16px',
                            px: 5,
                            py: 1.5,
                            fontWeight: 900,
                            fontSize: '0.85rem',
                            letterSpacing: 1.2,
                            boxShadow: isAddedToCart ? 'none' : '0 10px 30px rgba(143, 28, 210, 0.3)',
                            bgcolor: isAddedToCart ? 'success.main' : 'primary.main',
                            '&:hover': { bgcolor: isAddedToCart ? 'success.dark' : 'primary.dark', boxShadow: 'none' },
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        {isAddedToCart ? "AJOUTÉ !" : (cartLoading ? "ACTION..." : "AJOUTER AU PANIER")}
                    </Button>
                </Stack>
            </DialogActions>
        </>
    );
};

export default ProductDetailsModal;
