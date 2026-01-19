"use client";

import { Box, Stack, Breadcrumbs, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Output as ExitIcon,
} from "@mui/icons-material";
import ExitsHeader from "@/components/exits/ExitsHeader";
import ExitsTable from "@/components/exits/ExitsTable";

export default function ExitsPage() {
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
          sx={{ mb: 3 }}
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
          <Typography
            variant="body2"
            fontWeight="500"
            sx={{ color: "text.secondary" }}
          >
            Stocks
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" fontWeight="600" color="text.primary">
              Stock Outflow
            </Typography>
            <ExitIcon
              sx={{
                ml: 0.5,
                fontSize: "0.9rem",
                color: "primary.main",
                mb: 0.1,
              }}
            />
          </Stack>
        </Breadcrumbs>
      </Box>

      <Stack spacing={4}>
        <ExitsHeader />
        <ExitsTable />
      </Stack>
    </Box>
  );
}
