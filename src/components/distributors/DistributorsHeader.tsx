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
  Business as BusinessIcon,
  ShowChart as VolumeIcon,
  VerifiedUser as ActiveIcon,
} from "@mui/icons-material";
import StatsCard from "../common/StatsCard";

const distributorStats = [
  {
    id: 1,
    label: "Total Distributors",
    value: "154",
    growth: "+12",
    icon: <BusinessIcon />,
    color: "primary",
  },
  {
    id: 2,
    label: "Monthly Volume",
    value: "2.4M",
    growth: "+8%",
    icon: <VolumeIcon />,
    color: "info",
  },
  {
    id: 3,
    label: "Active Partners",
    value: "142",
    growth: "92%",
    icon: <ActiveIcon />,
    color: "success",
  },
];

export default function DistributorsHeader() {
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
              Distributor Network
            </Typography>
            <Box
              sx={{
                px: 1,
                py: 0.25,
                bgcolor: "success.lighter",
                border: "1px solid",
                borderColor: "success.main",
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
                  bgcolor: "success.main",
                  boxShadow: "0 0 8px #22c55e",
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
                color="success.main"
                sx={{ fontSize: "0.65rem", letterSpacing: 0.5 }}
              >
                LIVE NETWORK
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body1" color="text.secondary" fontWeight="500">
            Manage your global distributor partnerships and performance.
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {distributorStats.map((stat) => (
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
        placeholder="Search distributors..."
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
