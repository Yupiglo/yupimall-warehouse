"use client";

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";

type CardStatsProps = {
  title?: string;
  value?: string;
  change?: string;
  icon?: React.ReactNode;
  color?: string;
  bgColor?: string;
};

export default function CardStats({
  title,
  bgColor,
  icon,
  value,
  change,
}: CardStatsProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
      <Card
        sx={{
          background: (theme) =>
            theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(0,0,0,0.08)"
              : "rgba(255,255,255,0.08)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 10px 20px rgba(0,0,0,0.05)"
                : "0 10px 20px rgba(0,0,0,0.4)",
          },
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight="bold"
                sx={{ textTransform: "uppercase", letterSpacing: 1 }}
              >
                {title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                {value}
              </Typography>
            </Box>
            <Avatar
              sx={{
                background: (theme) => {
                  const key = (bgColor?.split(".")[0] ||
                    "primary") as keyof typeof theme.palette;
                  const paletteEntry = theme.palette[key];
                  const baseColor =
                    paletteEntry &&
                    typeof paletteEntry === "object" &&
                    "main" in paletteEntry
                      ? (paletteEntry as { main: string }).main
                      : theme.palette.primary.main;
                  return `linear-gradient(135deg, ${baseColor}15, ${baseColor}25)`;
                },
                color: (theme) => {
                  const key = (bgColor?.split(".")[0] ||
                    "primary") as keyof typeof theme.palette;
                  const paletteEntry = theme.palette[key];
                  return paletteEntry &&
                    typeof paletteEntry === "object" &&
                    "main" in paletteEntry
                    ? (paletteEntry as { main: string }).main
                    : theme.palette.primary.main;
                },
                width: 48,
                height: 48,
                // boxShadow: "0 4px 12px 0 rgba(0,0,0,0.1)",
              }}
            >
              {icon}
            </Avatar>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: change?.startsWith("+") ? "success.main" : "error.main",
                bgcolor: (theme) =>
                  change?.startsWith("+")
                    ? theme.palette.mode === "light"
                      ? "rgba(0, 178, 48, 0.1)"
                      : "rgba(0, 178, 48, 0.2)"
                    : theme.palette.mode === "light"
                    ? "rgba(253, 83, 83, 0.1)"
                    : "rgba(253, 83, 83, 0.2)",
                px: 1,
                py: 0.5,
                borderRadius: 1.5,
              }}
            >
              {change?.startsWith("+") ? (
                <TrendingUpIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
              )}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {change?.split(" ")[0]}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {change?.split(" ").slice(1).join(" ")}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
