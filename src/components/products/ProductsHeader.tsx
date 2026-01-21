"use client";

import {
  Box,
  TextField,
  Stack,
  InputAdornment,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  id: string;
  _id?: string;
  name: string;
  slug?: string;
}

const bestSellers = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    sales: 124,
    growth: "+12.5%",
    image:
      "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    sales: 98,
    growth: "+8.2%",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    sales: 85,
    growth: "+15.0%",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
];

type ProductsHeaderProps = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export default function ProductsHeader({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
}: ProductsHeaderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== "all") {
      fetchSubcategories(selectedCategory);
    } else {
      setSubcategories([]);
      setSelectedSubcategory("all");
    }
  }, [selectedCategory, setSelectedSubcategory]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("categories");
      const cats = response.data.getAllCategories || response.data.categories || response.data || [];
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      setLoadingSubs(true);
      const response = await axiosInstance.get(`categories/${categoryId}/subcategories`);
      const subs = response.data.getAllSubCategories || response.data.subcategories || response.data || [];
      setSubcategories(Array.isArray(subs) ? subs : []);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    } finally {
      setLoadingSubs(false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "flex-end" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
              letterSpacing: -1,
            }}
          >
            Product Inventory
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#00b230",
                boxShadow: "0 0 10px #00b230",
              }}
            />
            <Typography variant="body2" color="text.secondary" fontWeight="600">
              Live Stock Monitoring
            </Typography>
          </Stack>
        </Box>
      </Stack>

      {/* Best Selling Products Stats */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="subtitle1"
          fontWeight="800"
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "text.primary",
            textTransform: "uppercase",
            letterSpacing: 2,
            fontSize: "0.75rem",
          }}
        >
          <Box
            sx={{
              p: 0.8,
              bgcolor: "warning.main",
              borderRadius: "8px",
              display: "flex",
            }}
          >
            <StarIcon sx={{ color: "white", fontSize: "1.1rem" }} />
          </Box>
          Top Performance Products
        </Typography>
        <Grid container spacing={3}>
          {bestSellers.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  borderRadius: "24px",
                  background: (theme) =>
                    theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.08)"
                      : "rgba(255,255,255,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 20px 40px -15px rgba(0,0,0,0.1)"
                        : "0 20px 40px -15px rgba(0,0,0,0.4)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2.5} alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={product.image}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "16px",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="800"
                        sx={{ mb: 0.5 }}
                      >
                        {product.name}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 600,
                            bgcolor: (theme) =>
                              theme.palette.mode === "light"
                                ? "#f5f5f5"
                                : "rgba(255,255,255,0.05)",
                            px: 1.2,
                            py: 0.4,
                            borderRadius: "6px",
                          }}
                        >
                          {product.sales} sales
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "success.main",
                            bgcolor: (theme) =>
                              theme.palette.mode === "light"
                                ? "rgba(0, 178, 48, 0.1)"
                                : "rgba(0, 178, 48, 0.2)",
                            px: 1,
                            py: 0.5,
                            borderRadius: "8px",
                          }}
                        >
                          <TrendingUpIcon
                            sx={{ fontSize: "0.9rem", mr: 0.5 }}
                          />
                          <Typography variant="caption" fontWeight="900">
                            {product.growth}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            placeholder="Search products..."
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "primary.main", ml: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                "& fieldset": { borderColor: "divider" },
                "&:hover fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderWidth: "2px" },
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            select
            fullWidth
            label="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "common.white"
                    : "rgba(255, 255, 255, 0.03)",
                "& fieldset": { borderColor: "divider" },
              },
            }}
          >
            <MenuItem value="all">Toutes les catégories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            select
            fullWidth
            label="Sous-catégorie"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            disabled={selectedCategory === "all" || loadingSubs}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "common.white"
                    : "rgba(255, 255, 255, 0.03)",
                "& fieldset": { borderColor: "divider" },
              },
            }}
          >
            <MenuItem value="all">Toutes les sous-catégories</MenuItem>
            {loadingSubs ? (
              <MenuItem disabled><CircularProgress size={20} /></MenuItem>
            ) : (
              subcategories.map((sub) => (
                <MenuItem key={sub.id || sub._id} value={sub.id || sub._id}>
                  {sub.name}
                </MenuItem>
              ))
            )}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            select
            fullWidth
            label="Status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "common.white"
                    : "rgba(255, 255, 255, 0.03)",
                "& fieldset": { borderColor: "divider" },
              },
            }}
          >
            <MenuItem value="all">Tous les statuts</MenuItem>
            <MenuItem value="in_stock">En stock</MenuItem>
            <MenuItem value="low_stock">Stock bas</MenuItem>
            <MenuItem value="out_of_stock">Rupture</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

