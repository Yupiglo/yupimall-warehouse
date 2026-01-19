"use client";

import { Box, Stack, Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  LocalShipping as DeliveryIcon,
} from "@mui/icons-material";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import DeliveriesHeader from "@/components/deliveries/DeliveriesHeader";
import DeliveriesTable from "@/components/deliveries/DeliveriesTable";

export default function DeliveriesPage() {
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.primary",
          }}
        >
          <Typography variant="body2" fontWeight="700">
            Deliveries
          </Typography>
          <DeliveryIcon
            sx={{ ml: 0.5, fontSize: "1.1rem", color: "primary.main" }}
          />
        </Box>
      </Breadcrumbs>

      <Stack spacing={4}>
        <DeliveriesHeader />
        <DeliveriesTable />
      </Stack>
    </Box>
  );
}
