"use client";

import {
  Box,
  TextField,
  Stack,
  InputAdornment,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Search as SearchIcon,
  Store as StoreIcon,
  Inventory as StockIcon,
  Warning as AlertIcon,
} from "@mui/icons-material";
import StatsCard from "../common/StatsCard";

import { useOperationalStats } from "@/hooks/useOperationalStats";

export default function StockistsHeader() {
  const { data } = useOperationalStats();

  const stockistStats = [
    {
      id: 1,
      label: "Total Stockists",
      value: data?.stats?.totalStockists?.toString() || "0",
      growth: "+4",
      icon: <StoreIcon />,
      color: "primary",
    },
    {
      id: 2,
      label: "Commandes Pays",
      value: data?.stats?.totalOrders?.toString() || "0",
      growth: "Live",
      icon: <AlertIcon />,
      color: "warning",
    },
    {
      id: 3,
      label: "Clients Pays",
      value: data?.stats?.totalConsumers?.toString() || "0",
      growth: "Global",
      icon: <StockIcon />,
      color: "success",
    },
  ];
  return (
    <Box sx={{ mb: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ mb: 0.5 }}
          >
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                background: (theme: any) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: -1,
              }}
            >
              Stockist Partners
            </Typography>
            <Box
              sx={{
                px: 1,
                py: 0.25,
                bgcolor: "warning.lighter",
                border: "1px solid",
                borderColor: "warning.main",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "warning.main",
                  boxShadow: "0 0 8px #f59e0b",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
              <Typography
                variant="caption"
                fontWeight="800"
                color="warning.main"
                sx={{ fontSize: "0.65rem", letterSpacing: 0.5 }}
              >
                LIVE INVENTORY
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body1" color="text.secondary" fontWeight="500">
            Monitor inventory levels across partner locations.
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stockistStats.map((stat) => (
          <Grid key={stat.id} size={{ xs: 12, md: 4 }}>
            <StatsCard
              label={stat.label}
              value={stat.value}
              growth={stat.growth}
              icon={stat.icon}
              color={stat.color as any}
            />
          </Grid>
        ))}
      </Grid>

      <TextField
        placeholder="Search stockists..."
        variant="outlined"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.disabled" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: (theme: any) =>
              theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
            transition: "all 0.2s",
            "& fieldset": {
              borderColor: "divider",
            },
            "&:hover": {
              bgcolor: (theme: any) =>
                theme.palette.mode === "light"
                  ? "white"
                  : "rgba(255,255,255,0.1)",
              "& fieldset": { borderColor: "primary.main" },
            },
            "&.Mui-focused": {
              bgcolor: (theme: any) =>
                theme.palette.mode === "light"
                  ? "white"
                  : "rgba(255,255,255,0.1)",
              boxShadow: (theme: any) =>
                `0 4px 20px -2px ${theme.palette.primary.main}20`,
            },
          },
        }}
      />
    </Box>
  );
}
