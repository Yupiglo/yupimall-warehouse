"use client";

import {
  Box,
  TextField,
  InputAdornment,
  Stack,
  Button,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Assignment as OrderIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Update as ProcessingIcon,
} from "@mui/icons-material";
import { useState } from "react";
import CreateOrderModal from "./CreateOrderModal";
import StatsCard from "../common/StatsCard";

const statuses = [
  "All Status",
  "Pending",
  "Validated",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const timeRanges = [
  "Today",
  "This Week",
  "This Month",
  "Last 3 Months",
  "All Time",
];

interface OrdersHeaderProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  dynamicStats: {
    pending: number;
    processing: number;
    completed: number;
  };
}

export default function OrdersHeader({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dynamicStats,
}: OrdersHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderStats = [
    {
      id: 1,
      label: "Pending Orders",
      count: dynamicStats.pending,
      growth: "Live",
      icon: <PendingIcon />,
      color: "warning",
    },
    {
      id: 2,
      label: "Processing",
      count: dynamicStats.processing,
      growth: "Live",
      icon: <ProcessingIcon />,
      color: "info",
    },
    {
      id: 3,
      label: "Completed",
      count: dynamicStats.completed,
      growth: "Live",
      icon: <CompletedIcon />,
      color: "success",
    },
  ];

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
            Orders Management
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
              Live Order Processing
            </Typography>
          </Stack>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: "800",
            fontSize: "0.95rem",
            boxShadow: (theme) =>
              `0 10px 20px -5px ${theme.palette.primary.main}40`,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: (theme) =>
                `0 12px 25px -5px ${theme.palette.primary.main}60`,
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          Create Order
        </Button>
      </Stack>

      {/* Order Statistics Stats */}
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
          }}
        >
          <OrderIcon color="primary" sx={{ opacity: 0.8 }} /> Global Analytics
        </Typography>
        <Grid container spacing={3}>
          {orderStats.map((stat) => (
            <Grid key={stat.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <StatsCard
                label={stat.label}
                value={stat.count}
                growth={stat.growth}
                icon={stat.icon}
                color={stat.color as any}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2.5}
        sx={{
          p: 3,
          borderRadius: "24px",
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(255, 255, 255, 0.02)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <TextField
          placeholder="Search by Order ID, customer, phone..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" sx={{ opacity: 0.7 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            },
          }}
        />
        <Stack direction="row" spacing={2} sx={{ minWidth: { md: 450 } }}>
          <TextField
            select
            fullWidth
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Filter Status"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "common.white"
                    : "rgba(255,255,255,0.03)",
              },
            }}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            defaultValue="All Time"
            label="Reporting Period"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "common.white"
                    : "rgba(255,255,255,0.03)",
              },
            }}
          >
            {timeRanges.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>

      <CreateOrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
