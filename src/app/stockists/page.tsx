"use client";

import { Box } from "@mui/material";
import StockistsHeader from "@/components/stockists/StockistsHeader";
import StockistsTable from "@/components/stockists/StockistsTable";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { LinksEnum } from "@/utilities/pagesLinksEnum";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Store as StockistIcon,
} from "@mui/icons-material";

export default function StockistsPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Breadcrumbs
        separator={
          <ChevronRightIcon sx={{ fontSize: "1rem", color: "text.disabled" }} />
        }
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Box
          component={Link}
          href={LinksEnum.dashboard}
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": { color: "primary.main" },
            transition: "color 0.2s",
          }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
          <Typography variant="body2" fontWeight="500">
            Home
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" fontWeight="700" color="text.primary">
            Stockists
          </Typography>
          <StockistIcon
            sx={{ ml: 0.5, fontSize: "1.2rem", color: "primary.main" }}
          />
        </Box>
      </Breadcrumbs>

      <StockistsHeader />
      <StockistsTable />
    </Box>
  );
}
