"use client";

import { Box, Stack, Breadcrumbs, Typography } from "@mui/material";
import CouriersHeader from "@/components/couriers/CouriersHeader";
import CouriersTable from "@/components/couriers/CouriersTable";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Moped as CourierIcon,
} from "@mui/icons-material";

export default function CouriersPage() {
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
            Couriers
          </Typography>
          <CourierIcon
            sx={{ ml: 0.5, fontSize: "1.2rem", color: "primary.main" }}
          />
        </Box>
      </Breadcrumbs>

      <Stack spacing={4}>
        <CouriersHeader />
        <CouriersTable />
      </Stack>
    </Box>
  );
}
