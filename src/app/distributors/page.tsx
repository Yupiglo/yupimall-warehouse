"use client";

import { Box } from "@mui/material";
import DistributorsHeader from "@/components/distributors/DistributorsHeader";
import DistributorsTable from "@/components/distributors/DistributorsTable";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Business as DistributorIcon,
} from "@mui/icons-material";

export default function DistributorsPage() {
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
            Distributors
          </Typography>
          <DistributorIcon
            sx={{ ml: 0.5, fontSize: "1.2rem", color: "primary.main" }}
          />
        </Box>
      </Breadcrumbs>

      <DistributorsHeader />
      <DistributorsTable />
    </Box>
  );
}
