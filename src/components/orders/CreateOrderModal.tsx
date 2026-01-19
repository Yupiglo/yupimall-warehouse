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
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { mockTopCustomers } from "@/data/mocks/widgets";
import { Avatar } from "@mui/material";

import { mockProducts } from "@/data/mocks/products";

interface OrderItem {
  productId: number;
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
  const [customer, setCustomer] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<OrderItem[]>([
    { productId: 0, quantity: 1 },
  ]);
  const [confirmed, setConfirmed] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { productId: 0, quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems.length ? newItems : [{ productId: 0, quantity: 1 }]);
  };

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating Order:", {
      customer,
      description,
      items: items.filter((item) => item.productId !== 0),
      confirmed,
      totalAmount,
    });
    onClose();
    // Reset state
    setCustomer("");
    setDescription("");
    setItems([{ productId: 0, quantity: 1 }]);
    setConfirmed(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
              Create New Order
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="700"
            >
              INITIATE A NEW CUSTOMER TRANSACTION
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
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
          <Stack spacing={3.5}>
            {/* Customer & Description */}
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
                CUSTOMER DETAILS
              </Typography>
              <Stack spacing={2}>
                <TextField
                  select
                  label="Select Customer"
                  fullWidth
                  required
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? "common.white"
                          : "rgba(255,255,255,0.03)",
                    },
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          borderRadius: "16px",
                          mt: 1,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        },
                      },
                    },
                  }}
                >
                  {mockTopCustomers.map((cust) => (
                    <MenuItem key={cust.id} value={cust.title}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          src={
                            typeof cust.image === "string"
                              ? cust.image
                              : (cust.image as any)?.src || ""
                          }
                          sx={{
                            width: 28,
                            height: 28,
                            bgcolor: "primary.lighter",
                          }}
                        >
                          {cust.title.charAt(0)}
                        </Avatar>
                        <Stack spacing={0}>
                          <Typography variant="body2" fontWeight="600">
                            {cust.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            {cust.subtitle}
                          </Typography>
                        </Stack>
                      </Stack>
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Order Description"
                  placeholder="Enter order details or special notes..."
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
              </Stack>
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
                ORDER ITEMS
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
                            Number(e.target.value)
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
                        {mockProducts.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <Typography variant="body2" fontWeight="600">
                                {product.label}
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
                        disabled={items.length === 1 && item.productId === 0}
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
                Order Total
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
                  sx={{ "& .MuiSvgIcon-root": { borderRadius: "6px" } }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="600"
                >
                  I confirm this order is ready for processing
                </Typography>
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 4, pt: 0 }}>
          <Button
            onClick={onClose}
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
            disabled={!customer || items.every((i) => i.productId === 0)}
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
            Create Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
