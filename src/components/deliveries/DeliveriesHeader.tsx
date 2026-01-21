"use client";

import {
  Box,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Search as SearchIcon,
  Add as AddIcon,
  LocalShipping as ShippingIcon,
  Pending as PendingIcon,
  CheckCircle as DeliveredIcon,
} from "@mui/icons-material";
import { useState } from "react";
import AddDeliveryModal from "./AddDeliveryModal";
import StatsCard from "../common/StatsCard";

const deliveryStats = [
  {
    id: 1,
    label: "Pending Deliveries",
    value: "14",
    growth: "+2.5%",
    icon: <PendingIcon />,
    color: "warning",
  },
  {
    id: 2,
    label: "In Transit",
    value: "8",
    growth: "+15.2%",
    icon: <ShippingIcon />,
    color: "info",
  },
  {
    id: 3,
    label: "Completed (Today)",
    value: "156",
    growth: "+24.8%",
    icon: <DeliveredIcon />,
    color: "success",
  },
];

export default function DeliveriesHeader() {
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
                background: (theme: any) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: -1,
              }}
            >
              Logistics
            </Typography>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: "info.lighter",
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
                  bgcolor: "info.main",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                }}
              />
              <Typography
                variant="caption"
                fontWeight="900"
                sx={{ color: "info.dark", letterSpacing: 0.5 }}
              >
                LIVE FLEET
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body2" color="text.secondary" fontWeight="600">
            Manage and track your delivery logistics in real-time.
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
            boxShadow: (theme: any) =>
              `0 10px 20px -5px ${theme.palette.primary.main}40`,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: (theme: any) =>
                `0 12px 25px -5px ${theme.palette.primary.main}60`,
            },
          }}
        >
          Assign Delivery
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {deliveryStats.map((stat) => (
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
        placeholder="Search Order ID, Customer, or Courier..."
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
            bgcolor: (theme: any) =>
              theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            "& fieldset": { borderColor: "divider" },
            "&:hover fieldset": { borderColor: "primary.main" },
          },
        }}
      />

      <AddDeliveryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
