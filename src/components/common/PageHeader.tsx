"use client";

import { Box, Typography, Stack, Card } from "@mui/material";
import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  description?: ReactNode; // Can be string or JSX elements
  children?: ReactNode; // For extra content like Status indicators or Profile Avatars
  height?: number | string;
};

export default function PageHeader({
  title,
  subtitle,
  description,
  children,
  height,
}: PageHeaderProps) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 6,
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)"
            : "linear-gradient(135deg, #1e1e1e 0%, #121212 100%)",
        boxShadow: (theme) =>
          theme.palette.mode === "light"
            ? "0 20px 40px -15px rgba(0,0,0,0.05)"
            : "0 20px 40px -15px rgba(0,0,0,0.5)",
      }}
    >
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          height: height || "auto",
          display: height ? "flex" : "block",
          alignItems: height ? "center" : "initial",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          spacing={3}
          sx={{ width: "100%", position: "relative", zIndex: 2 }}
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="900"
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1.5,
                letterSpacing: "-1px",
              }}
            >
              {title}
            </Typography>
            {(subtitle || description) && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: 600,
                  fontWeight: 400,
                  opacity: 0.8,
                  fontSize: "1rem",
                }}
              >
                {subtitle}
                {description}
              </Typography>
            )}
          </Box>

          {children && (
            <Box sx={{ mt: { xs: 3, sm: 0 }, minWidth: "fit-content" }}>
              {children}
            </Box>
          )}
        </Stack>

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
            zIndex: 1,
            pointerEvents: "none",
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
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </Box>
    </Card>
  );
}
