"use client";

import { use, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Chip,
  Divider,
  Grid,
  Breadcrumbs,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Inventory as ProductIcon,
  AttachMoney as PriceIcon,
  Storage as StockIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  AddShoppingCart as AddCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

const getStatusColor = (quantity: number) => {
  if (quantity === 0) return "error";
  if (quantity < 10) return "warning";
  return "success";
};

const getStatusText = (quantity: number) => {
  if (quantity === 0) return "Rupture";
  if (quantity < 10) return "Stock Bas";
  return "En Stock";
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { product, loading, error } = useProduct(id);
  const { addToCart, loading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });
  const { selectedCurr } = useContext(CurrencyContext);

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * selectedCurr.value;
    if (selectedCurr.symbol === "FCFA" || selectedCurr.symbol === "₦") {
      return `${Math.round(converted).toLocaleString()} ${selectedCurr.symbol}`;
    }
    return `${selectedCurr.symbol}${converted.toFixed(2)}`;
  };

  const handleAddToCart = async () => {
    if (!product) return;
    const result = await addToCart(product.id as any, quantity);
    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? "success" : "error",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{error || "Produit non trouvé"}</Typography>
        <Button onClick={() => router.push(LinksEnum.products)} sx={{ mt: 2 }}>
          Retour aux produits
        </Button>
      </Box>
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const coverUrl = product.imgCover
    ? product.imgCover.startsWith("http")
      ? product.imgCover
      : `${apiUrl}/${product.imgCover.replace(/^\/?/, "")}`
    : "/placeholder-product.png";

  const allImages = [
    coverUrl,
    ...(Array.isArray(product.images)
      ? product.images.map(img => img.startsWith("http") ? img : `${apiUrl}/${img.replace(/^\/?/, "")}`)
      : [])
  ].filter(Boolean);

  const currentImageUrl = activeImage || coverUrl;

  // Parse variants if they are a string
  let productVariants: any[] = [];
  try {
    productVariants = typeof product.variants === 'string' ? JSON.parse(product.variants) : (Array.isArray(product.variants) ? product.variants : []);
  } catch (e) {
    console.error("Failed to parse variants", e);
  }

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
          <Link href={LinksEnum.products} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
            >
              Products
            </Typography>
          </Link>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" fontWeight="600" color="text.primary">
              {product.title}
            </Typography>
            <ProductIcon sx={{ fontSize: "0.9rem", color: "primary.main", mb: 0.1 }} />
          </Stack>
        </Breadcrumbs>

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={() => router.push(LinksEnum.products)}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "14px",
                p: 1.5,
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <BackIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h4"
                fontWeight="900"
                sx={{
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 0.5,
                  letterSpacing: -1,
                }}
              >
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="600">
                Catégorie: {typeof product.category === "string" ? product.category : (product.category?.name || product.categoryName || "N/A")}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Images */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Card
              sx={{
                borderRadius: "32px",
                background: (theme) =>
                  theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: { xs: 300, md: 500 }
              }}
            >
              <Box
                component="img"
                src={currentImageUrl}
                alt={product.title}
                sx={{ maxWidth: "100%", maxHeight: 500, objectFit: "contain", p: 2 }}
              />
            </Card>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1, px: 0.5 }}>
                {allImages.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => setActiveImage(img)}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "16px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "2px solid",
                      borderColor: currentImageUrl === img ? "primary.main" : "transparent",
                      transition: "0.2s",
                      "&:hover": { transform: "scale(1.05)", borderColor: "primary.light" }
                    }}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Grid>

        {/* Right Column: Details */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={3}>
            <Card
              sx={{
                borderRadius: "24px",
                background: (theme) =>
                  theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="h3" fontWeight="900" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                      {product.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                      <Chip
                        label={getStatusText(product.quantity)}
                        size="small"
                        sx={{
                          fontWeight: "800",
                          borderRadius: "8px",
                          bgcolor: `${getStatusColor(product.quantity)}.main`,
                          color: "white",
                        }}
                      />
                      {product.pv !== undefined && (
                        <Chip
                          label={`${product.pv} PV`}
                          size="small"
                          color="secondary"
                          sx={{ fontWeight: "800", borderRadius: "8px" }}
                        />
                      )}
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ ml: 1 }}>
                        <StarIcon sx={{ color: "#FFB400", fontSize: "1.2rem" }} />
                        <Typography variant="body2" fontWeight="bold">
                          {product.ratingsAverage || 0} ({product.ratingsQuantity || 0} avis)
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ textAlign: "right", minWidth: 150 }}>
                    <Typography variant="h4" fontWeight="900" color="primary.main" sx={{ fontSize: { xs: '1.2rem', md: '2rem' } }}>
                      {formatPrice(product.priceAfterDiscount || product.price)}
                    </Typography>
                    {product.priceAfterDiscount && product.priceAfterDiscount < product.price && (
                      <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                        {formatPrice(product.price)}
                      </Typography>
                    )}
                  </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Variants Display */}
                {productVariants.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                      Options disponibles
                    </Typography>
                    <Grid container spacing={2}>
                      {productVariants.map((v, i) => (
                        <Grid key={i} size={{ xs: 6, sm: 4 }}>
                          <Box sx={{
                            p: 1.5,
                            borderRadius: "16px",
                            bgcolor: "rgba(0,0,0,0.02)",
                            border: "1px solid",
                            borderColor: "divider",
                            textAlign: 'center'
                          }}>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>{v.key}</Typography>
                            <Typography variant="body2" fontWeight="bold">{v.value}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* description */}
                <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4 }}>
                  {product.description || "Aucune description disponible pour ce produit."}
                </Typography>

                {/* Add to Cart Footer */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center" sx={{
                    bgcolor: "action.hover",
                    borderRadius: "16px",
                    p: 0.6,
                    border: "1px solid",
                    borderColor: "divider"
                  }}>
                    <IconButton
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      size="small"
                      sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography fontWeight="bold" sx={{ minWidth: 40, textAlign: "center", fontSize: '1.1rem' }}>
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      size="small"
                      sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<AddCartIcon />}
                    onClick={handleAddToCart}
                    disabled={cartLoading || product.quantity === 0}
                    sx={{
                      borderRadius: "16px",
                      py: 1.8,
                      fontWeight: 800,
                      textTransform: "none",
                      fontSize: "1.1rem",
                      boxShadow: (theme) => `0 8px 25px ${theme.palette.primary.main}40`,
                      background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: (theme) => `0 12px 30px ${theme.palette.primary.main}50`,
                      }
                    }}
                  >
                    {cartLoading ? "Ajout en cours..." : "Ajouter au panier"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Card sx={{ borderRadius: "24px" }}>
                  <CardContent sx={{ p: 4 }}>
                    {/* benefits */}
                    {Array.isArray(product.benefits) && product.benefits.length > 0 && (
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 4, height: 24, bgcolor: "success.main", borderRadius: "2px" }} />
                          Bénéfices
                        </Typography>
                        <Grid container spacing={2}>
                          {product.benefits.map((benefit: string, i: number) => (
                            <Grid key={i} size={{ xs: 12, sm: 6 }}>
                              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                <Box sx={{ mt: 0.5, width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main", flexShrink: 0 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{benefit}</Typography>
                              </Stack>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}

                    {/* ingredients */}
                    {Array.isArray(product.ingredients) && product.ingredients.length > 0 && (
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 4, height: 24, bgcolor: "secondary.main", borderRadius: "2px" }} />
                          Ingrédients clés
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {product.ingredients.map((ing: string, i: number) => (
                            <Chip
                              key={i}
                              label={ing}
                              size="medium"
                              variant="outlined"
                              sx={{
                                borderRadius: "10px",
                                fontWeight: 600,
                                px: 1,
                                borderColor: 'secondary.light',
                                bgcolor: 'secondary.main' + '05'
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {/* usage & research */}
                    <Grid container spacing={4}>
                      {product.howToUse && (
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 4, height: 24, bgcolor: "info.main", borderRadius: "2px" }} />
                            Conseils d'utilisation
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line", lineHeight: 1.6, fontWeight: 500 }}>
                            {product.howToUse}
                          </Typography>
                        </Grid>
                      )}
                      {product.clinicalResearch && (
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 4, height: 24, bgcolor: "warning.main", borderRadius: "2px" }} />
                            Recherche Clinique
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontWeight: 500 }}>
                            {product.clinicalResearch}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>Marque</Typography>
                        <Typography variant="body2" fontWeight="800">{typeof product.brand === "string" ? product.brand : (product.brand?.name || "N/A")}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>Vendus</Typography>
                        <Typography variant="body2" fontWeight="800">{product.sold || 0} unités</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>Disponibilité</Typography>
                        <Typography variant="body2" fontWeight="800">{product.quantity} en stock</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>SKU</Typography>
                        <Typography variant="body2" fontWeight="800">#{product.id.toString().slice(-6).toUpperCase()}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: "12px" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
