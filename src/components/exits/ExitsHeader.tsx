"use client";

import {
  Box,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Typography,
  Grid,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Logout as ExitIcon,
  LocalShipping as ShippingIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { useState } from "react";
import AddExitModal from "./AddExitModal";
import StatsCard from "../common/StatsCard";

const exitsStats = [
  {
    id: 1,
    label: "Total Exits (Today)",
    value: "28",
    growth: "+8.4%",
    icon: <ExitIcon />,
    color: "primary",
  },
  {
    id: 2,
    label: "Items Shipped",
    value: "840",
    growth: "+15.2%",
    icon: <ShippingIcon />,
    color: "success",
  },
  {
    id: 3,
    label: "Recent Activity",
    value: "5m ago",
    growth: "Active",
    icon: <HistoryIcon />,
    color: "warning",
  },
];

export default function ExitsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box sx={{ mb: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ mb: 1 }}
          >
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: -1,
              }}
            >
              Stock Exits
            </Typography>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: "warning.lighter",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "warning.main",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(243, 156, 18, 0.4)",
                }}
              />
              <Typography
                variant="caption"
                fontWeight="900"
                sx={{ color: "warning.dark", letterSpacing: 0.5 }}
              >
                LIVE OUTFLOW
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body2" color="text.secondary" fontWeight="600">
            Manage and track outgoing inventory.
          </Typography>
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
            fontWeight: "900",
            boxShadow: (theme) =>
              `0 10px 20px -5px ${theme.palette.primary.main}40`,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: (theme) =>
                `0 12px 25px -5px ${theme.palette.primary.main}60`,
            },
          }}
        >
          Add Exit
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {exitsStats.map((stat) => (
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
        placeholder="Search exits, products, or destinations..."
        variant="outlined"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            "& fieldset": { borderColor: "divider" },
            "&:hover fieldset": { borderColor: "primary.main" },
          },
        }}
      />

      <AddExitModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
