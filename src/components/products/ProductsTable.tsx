"use client";

import { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box,
  Avatar,
  Stack,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  AddShoppingCart as AddCartIcon,
  TrendingDown as StockLowIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useCart } from "@/hooks/useCart";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";
import ProductDetailsModal from "./ProductDetailsModal";

interface Product {
  _id: string;
  title: string;
  category?: { _id: string; name: string } | string;
  categoryId?: string;
  subcategory?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  sku?: string;
  price: number;
  quantity: number;
  imgCover?: string;
  sold?: number;
  description?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

type ProductsTableProps = {
  selectedCategory?: string;
  selectedSubcategory?: string;
  selectedStatus?: string;
  searchQuery?: string;
};

export default function ProductsTable({
  selectedCategory = "all",
  selectedSubcategory = "all",
  selectedStatus = "all",
  searchQuery = "",
}: ProductsTableProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, loading: cartLoading } = useCart();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });
  const { selectedCurr } = useContext(CurrencyContext);

  // BMad style modal state
  const [detailsModal, setDetailsModal] = useState({ open: false, productId: "" });

  const handleOpenDetails = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setDetailsModal({ open: true, productId });
  };

  // Format price in selected currency (prices stored in USD)
  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * selectedCurr.value;
    // For currencies like FCFA, show as integer
    if (selectedCurr.symbol === "FCFA" || selectedCurr.symbol === "₦") {
      return `${Math.round(converted).toLocaleString()} ${selectedCurr.symbol}`;
    }
    return `${selectedCurr.symbol}${converted.toFixed(2)}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch categories
        const catRes = await axiosInstance.get("categories");
        setCategories(catRes.data.getAllCategories || catRes.data.categories || []);

        // Fetch products
        const prodRes = await axiosInstance.get("products");
        setProducts(prodRes.data.getAllProducts || prodRes.data.products || []);
      } catch (err: any) {
        console.error("Failed to fetch data:", err);
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on selected category, subcategory, status and search query
  const filteredProducts = products.filter((product) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const title = product.title?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      const sku = product.sku?.toLowerCase() || "";
      if (!title.includes(query) && !description.includes(query) && !sku.includes(query)) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      if (String(product.categoryId) !== String(selectedCategory)) return false;
    }
    // Subcategory filter
    if (selectedSubcategory && selectedSubcategory !== "all") {
      if (String(product.subcategoryId) !== String(selectedSubcategory)) return false;
    }

    // Status filter based on quantity
    if (selectedStatus && selectedStatus !== "all") {
      const quantity = product.quantity || 0;
      if (selectedStatus === "in_stock" && quantity < 10) return false;
      if (selectedStatus === "low_stock" && (quantity === 0 || quantity >= 10)) return false;
      if (selectedStatus === "out_of_stock" && quantity > 0) return false;
    }

    return true;
  });

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Rupture", color: "error" as const };
    if (quantity < 10) return { label: "Stock bas", color: "warning" as const };
    return { label: "En stock", color: "success" as const };
  };

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const result = await addToCart(parseInt(productId), 1);
    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? "success" : "error",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Stack spacing={3}>
      {/* Products Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: "16px", border: "1px solid", borderColor: "divider" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Produit</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Catégorie</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sous-catégorie</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Prix</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Vendu</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Statut</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    Aucun produit trouvé
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {filteredProducts.map((product) => {
              const status = getStockStatus(product.quantity);
              const apiUrl = (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== "")
                ? process.env.NEXT_PUBLIC_API_URL
                : "http://192.168.1.83:8000";
              const imageUrl = product.imgCover
                ? product.imgCover.startsWith("http")
                  ? product.imgCover
                  : `${apiUrl}/${product.imgCover.replace(/^\/?/, '')}`
                : undefined;

              return (
                <TableRow
                  key={product._id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
                  onClick={() => router.push(`/products/${product._id}`)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        variant="rounded"
                        src={imageUrl}
                        sx={{ width: 48, height: 48, borderRadius: "12px" }}
                      >
                        {product.title?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {product.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: #{product._id.slice(-6)}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        typeof product.category === "string"
                          ? (categories.find(c => c.slug === product.category || c.name === product.category)?.name || product.category)
                          : (product.category?.name || "Non classé")
                      }
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: "6px" }}
                    />
                  </TableCell>
                  <TableCell>
                    {product.subcategoryName ? (
                      <Chip
                        label={product.subcategoryName}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ borderRadius: "6px" }}
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {formatPrice(product.price)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: product.quantity < 10 ? "bold" : "medium" }}
                      >
                        {product.quantity}
                      </Typography>
                      {product.quantity < 10 && product.quantity > 0 && (
                        <Tooltip title="Stock bas">
                          <StockLowIcon color="warning" sx={{ fontSize: 16 }} />
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>{product.sold || 0}</TableCell>
                  <TableCell>
                    <Chip
                      label={status.label}
                      color={status.color}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0} justifyContent="flex-end">
                      <Tooltip title="Voir détails">
                        <IconButton
                          size="small"
                          onClick={(e) => handleOpenDetails(e, product._id)}
                        >
                          <ViewIcon fontSize="small" color="action" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Ajouter au panier">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={(e) => handleAddToCart(e, product._id)}
                          disabled={cartLoading || product.quantity === 0}
                        >
                          <AddCartIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Stats Footer */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Typography variant="body2" color="text.secondary">
          {products.length} produit(s)
        </Typography>
      </Box>

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

      <ProductDetailsModal
        open={detailsModal.open}
        onClose={() => setDetailsModal({ ...detailsModal, open: false })}
        productId={detailsModal.productId}
      />
    </Stack>
  );
}
