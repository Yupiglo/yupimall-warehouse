"use client";

import { useState } from "react";
import { Box, Typography, Breadcrumbs, Stack } from "@mui/material";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Inventory2 as InventoryIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsTable from "@/components/products/ProductsTable";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Breadcrumbs Header */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs
          separator={
            <ChevronRightIcon
              sx={{ fontSize: "1rem", color: "text.disabled" }}
            />
          }
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              alignItems: "center",
            },
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <HomeIcon
              sx={{ mr: 0.5, fontSize: "1.2rem", color: "primary.main" }}
            />
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{ color: "text.secondary" }}
            >
              Home
            </Typography>
          </Box>
          <Link
            href={LinksEnum.products}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Products
            </Typography>
          </Link>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" fontWeight="600" color="text.primary">
              Inventory
            </Typography>
            <InventoryIcon
              sx={{ fontSize: "0.9rem", color: "primary.main", mb: 0.2 }}
            />
          </Stack>
        </Breadcrumbs>
      </Box>

      <Stack spacing={4}>
        <ProductsHeader
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ProductsTable
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          selectedStatus={selectedStatus}
          searchQuery={searchQuery}
        />
      </Stack>
    </Box>
  );
}
