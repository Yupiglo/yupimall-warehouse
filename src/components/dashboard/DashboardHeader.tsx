"use client";

import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";

export default function DashboardHeader() {
  return (
    <>
      {/* Breadcrumbs Header */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs
          separator={
            <ChevronRightIcon
              sx={{ fontSize: "1rem", color: "text.disabled" }}
            />
          }
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              alignItems: "center",
            },
          }}
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
              sx={{
                color: "text.secondary",
              }}
            >
              Home
            </Typography>
          </Box>
          <Link
            href={LinksEnum.dashboard}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Dashboard
            </Typography>
          </Link>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" fontWeight="600" color="text.primary">
              Overview
            </Typography>
            <LockIcon
              sx={{ fontSize: "0.9rem", color: "warning.main", mb: 0.2 }}
            />
          </Stack>
        </Breadcrumbs>
      </Box>

      {/* Page Title & Welcome */}
      <Box
        sx={{
          mb: 6,
          p: { xs: 3, md: 5 },
          borderRadius: 6,
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)"
              : "linear-gradient(135deg, #1e1e1e 0%, #121212 100%)",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(229, 231, 235, 0.5)"
              : "rgba(255, 255, 255, 0.05)",
          position: "relative",
          overflow: "hidden",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 20px 40px -15px rgba(0,0,0,0.05)"
              : "0 20px 40px -15px rgba(0,0,0,0.5)",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ sm: "center" }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="900"
                sx={{
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1.5,
                  letterSpacing: -1,
                }}
              >
                Welcome back, Warehouse!
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, fontWeight: 400, opacity: 0.8 }}
              >
                Your delivery ecosystem is performing at{" "}
                <span style={{ fontWeight: 700, color: "#00b230" }}>
                  Peak Efficiency
                </span>{" "}
                today. Everything is under control.
              </Typography>
            </Box>

            <Box sx={{ mt: { xs: 3, sm: 0 }, display: "flex", gap: 2 }}>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 700,
                  }}
                >
                  System Status
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent="flex-end"
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "success.main",
                      boxShadow: "0 0 10px #00b230",
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="700"
                    color="text.primary"
                  >
                    Operational
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* Dynamic Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: (theme) =>
              `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            left: "20%",
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: (theme) =>
              `radial-gradient(circle, ${theme.palette.secondary.main}10 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />
      </Box>
    </>
  );
}
