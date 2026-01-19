"use client";

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  BoxProps,
} from "@mui/material";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  growth?: string;
  icon: ReactNode;
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  sx?: BoxProps["sx"];
}

export default function StatsCard({
  label,
  value,
  growth,
  icon,
  color = "primary",
  sx,
}: StatsCardProps) {
  return (
    <Card
      sx={{
        borderRadius: "24px",
        backgroundImage: "none",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(0,0,0,0.08)"
            : "rgba(255,255,255,0.08)",
        background: (theme) =>
          theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 20px 40px -10px rgba(0,0,0,0.05)"
              : "0 20px 40px -10px rgba(0,0,0,0.5)",
        },
        ...sx,
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack direction="row" spacing={2.5} alignItems="center">
          <Avatar
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              bgcolor: (theme) => {
                const isDark = theme.palette.mode === "dark";
                const baseColor = theme.palette[color].main;
                return isDark
                  ? `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(
                      baseColor.slice(3, 5),
                      16
                    )}, ${parseInt(baseColor.slice(5, 7), 16)}, 0.15)`
                  : `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(
                      baseColor.slice(3, 5),
                      16
                    )}, ${parseInt(baseColor.slice(5, 7), 16)}, 0.1)`;
              },
              color: `${color}.main`,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="800"
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              {label}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mt: 0.5 }}
            >
              <Typography
                variant="h4"
                fontWeight="900"
                sx={{ letterSpacing: -1 }}
              >
                {value}
              </Typography>
              {growth && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    bgcolor: "success.lighter",
                    color: "success.main",
                    px: 1,
                    py: 0.3,
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: "success.lighter",
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" fontWeight="900">
                    {growth}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
