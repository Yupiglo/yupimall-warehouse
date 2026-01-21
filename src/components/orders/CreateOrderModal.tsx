"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  Stack,
  MenuItem,
  Grid,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import axiosInstance from "@/lib/axios";
import { useCart } from "@/hooks/useCart";

interface OrderItem {
  productId: string | number;
  quantity: number;
}

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateOrderModal({
  open,
  onClose,
}: CreateOrderModalProps) {
  const { products, loading: productsLoading } = useProducts();
  const { categories, subcategories, loading: categoriesLoading } = useCategories();
  const { refresh: refreshCart } = useCart();

  const [description, setDescription] = useState("");
  const [items, setItems] = useState<OrderItem[]>([
    { productId: "", quantity: 1 },
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Filtered subcategories based on selected category
  const filteredSubcategories = useMemo(() => {
    if (!selectedCategoryId) return subcategories;
    return subcategories.filter(
      (sub) => String(sub.category_id) === String(selectedCategoryId)
    );
  }, [subcategories, selectedCategoryId]);

  const filteredProductsByFilters = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = !selectedCategoryId || String(p.categoryId) === String(selectedCategoryId);
      const matchesSubcategory = !selectedSubcategoryId || String(p.subcategoryId) === String(selectedSubcategoryId);

      return matchesCategory && matchesSubcategory;
    });
  }, [products, selectedCategoryId, selectedSubcategoryId]);

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems.length ? newItems : [{ productId: "", quantity: 1 }]);
  };

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = products.find((p) => String(p.id) === String(item.productId));
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [items, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // 1. Add items to cart
      // We process them one by one as the backend handles single product addition
      for (const item of items) {
        if (!item.productId) continue;
        await axiosInstance.post("carts", {
          productId: String(item.productId),
          quantity: item.quantity,
        });
      }

      // 2. Create Order from Cart
      // The backend expects a shipping address. For self-restock, we omit the country 
      // so the backend defaults to the logged-in user's country.
      await axiosInstance.post("orders/user-cart", {
        shipping_name: "Self Restock",
        shipping_city: "Internal",
        shipping_street: "Internal",
        shipping_phone: "00000000",
        paymentMethod: "cash",
      });

      // 3. Success!
      await refreshCart();

      onClose();
      // Reset state
      setDescription("");
      setItems([{ productId: "", quantity: 1 }]);
      setConfirmed(false);

      // Force a page refresh to show the new order
      window.location.reload();

    } catch (err: any) {
      console.error("Error creating restock order:", err);
      const errorMsg = err.response?.data?.message || "Failed to create order. Please check your stock or connection.";
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "28px",
            backgroundImage: "none",
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(30, 30, 30, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.05)",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 24px 48px -12px rgba(0,0,0,0.1)"
                : "0 24px 48px -12px rgba(0,0,0,0.5)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 4,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              bgcolor: "primary.lighter",
              color: "primary.main",
              p: 1.5,
              borderRadius: "14px",
              display: "flex",
              boxShadow: "0 4px 12px rgba(45, 63, 234, 0.1)",
            }}
          >
            <CartIcon />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight="900"
              sx={{ letterSpacing: -0.5 }}
            >
              Inventory Refill
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="700"
            >
              ORDER PRODUCTS FOR YOUR WAREHOUSE
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
          disabled={isSubmitting}
          sx={{
            bgcolor: "action.hover",
            borderRadius: "10px",
            "&:hover": { bgcolor: "error.lighter", color: "error.main" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 4, pt: 2 }}>
          {productsLoading || categoriesLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={3.5}>
              <Box>
                <Typography
                  variant="caption"
                  fontWeight="800"
                  sx={{
                    mb: 1.5,
                    display: "block",
                    color: "text.secondary",
                    letterSpacing: 1,
                  }}
                >
                  RESTOCK DETAILS
                </Typography>
                <TextField
                  label="Notes / Description"
                  placeholder="Enter details about this refill..."
                  fullWidth
                  multiline
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? "common.white"
                          : "rgba(255,255,255,0.03)",
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  fontWeight="800"
                  sx={{
                    mb: 1.5,
                    display: "block",
                    color: "text.secondary",
                    letterSpacing: 1,
                  }}
                >
                  FILTER INVENTORY
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Category"
                      value={selectedCategoryId}
                      onChange={(e) => {
                        setSelectedCategoryId(e.target.value);
                        setSelectedSubcategoryId(""); // Reset subcategory on category change
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          bgcolor: (theme) =>
                            theme.palette.mode === "light"
                              ? "common.white"
                              : "rgba(255,255,255,0.03)",
                        },
                      }}
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Subcategory"
                      value={selectedSubcategoryId}
                      onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          bgcolor: (theme) =>
                            theme.palette.mode === "light"
                              ? "common.white"
                              : "rgba(255,255,255,0.03)",
                        },
                      }}
                    >
                      <MenuItem value="">All Subcategories</MenuItem>
                      {filteredSubcategories.map((sub) => (
                        <MenuItem key={sub._id || (sub.id as string)} value={sub._id || (sub.id as string)}>
                          {sub.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  fontWeight="800"
                  sx={{
                    mb: 1.5,
                    display: "block",
                    color: "text.secondary",
                    letterSpacing: 1,
                  }}
                >
                  PRODUCTS TO ORDER
                </Typography>
                <Stack spacing={2}>
                  {items.map((item, index) => (
                    <Grid container spacing={2} key={index} alignItems="center">
                      <Grid size={{ xs: 8 }}>
                        <TextField
                          select
                          fullWidth
                          label="Product"
                          value={item.productId || ""}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "productId",
                              e.target.value
                            )
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "14px",
                              bgcolor: (theme) =>
                                theme.palette.mode === "light"
                                  ? "common.white"
                                  : "rgba(255,255,255,0.03)",
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select a product
                          </MenuItem>
                          {filteredProductsByFilters.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <Typography variant="body2" fontWeight="600">
                                  {product.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontWeight="800"
                                  color="primary.main"
                                >
                                  ${product.price.toFixed(2)}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 3 }}>
                        <TextField
                          type="number"
                          fullWidth
                          label="Qty"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "quantity",
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "14px",
                              bgcolor: (theme) =>
                                theme.palette.mode === "light"
                                  ? "common.white"
                                  : "rgba(255,255,255,0.03)",
                            },
                          }}
                          inputProps={{ min: 1 }}
                        />
                      </Grid>
                      <Grid
                        size={{ xs: 1 }}
                        display="flex"
                        justifyContent="center"
                      >
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(index)}
                          disabled={items.length === 1 && item.productId === ""}
                          sx={{
                            bgcolor: "error.lighter",
                            borderRadius: "12px",
                            "&:hover": { bgcolor: "error.main", color: "white" },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Stack>

                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddItem}
                  disabled={isSubmitting}
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    fontWeight: "800",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    color: "primary.main",
                    bgcolor: "primary.lighter",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                    px: 2,
                    py: 1.5,
                  }}
                >
                  Add another product
                </Button>
              </Box>

              {/* Total Display */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
                      : "rgba(255,255,255,0.02)",
                  border: "1px dashed",
                  borderColor: "primary.main",
                  opacity: 0.9,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="900"
                  color="text.secondary"
                >
                  Total Invested
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="900"
                  color="primary.main"
                  sx={{ letterSpacing: -1 }}
                >
                  $
                  {totalAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ "& .MuiSvgIcon-root": { borderRadius: "6px" } }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="600"
                  >
                    I confirm these items are needed for stock replenishment
                  </Typography>
                }
              />
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 4, pt: 0 }}>
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              fontWeight: "800",
              textTransform: "none",
              borderRadius: "14px",
              px: 4,
              py: 1.5,
              color: "text.secondary",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!confirmed || items.every((i) => i.productId === "") || isSubmitting}
            sx={{
              borderRadius: "14px",
              px: 4,
              py: 1.5,
              fontWeight: "900",
              textTransform: "none",
              boxShadow: (theme) =>
                `0 8px 20px -6px ${theme.palette.primary.main}60`,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: (theme) =>
                  `0 12px 25px -6px ${theme.palette.primary.main}80`,
              },
              transition: "all 0.3s ease",
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Place Restock Order"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
