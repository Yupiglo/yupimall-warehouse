"use client";

import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import Link from "next/link";
import { ReactNode } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
};

type BreadcrumbsHeaderProps = {
  items: BreadcrumbItem[]; // Previous items (Home, etc.)
  current: string; // The current active page name
  currentIcon?: ReactNode; // Icon for the current page
};

export default function BreadcrumbsHeader({
  items,
  current,
  currentIcon,
}: BreadcrumbsHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs
        separator={
          <ChevronRightIcon sx={{ fontSize: "1rem", color: "text.disabled" }} />
        }
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-ol": {
            alignItems: "center",
          },
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            component={item.href ? Link : "div"}
            href={item.href || "#"}
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {item.icon && (
              <Box
                component="span"
                sx={{
                  mr: 0.5,
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                  "& svg": { fontSize: "1.2rem" },
                }}
              >
                {item.icon}
              </Box>
            )}
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{
                color: "text.secondary",
                ...(item.href && {
                  "&:hover": { color: "primary.main" },
                }),
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="body2" fontWeight="600" color="text.primary">
            {current}
          </Typography>
          {currentIcon && (
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary.main", // Or specific color if passed
                mb: 0.2, // Small optical adjustment
                "& svg": { fontSize: "0.9rem" },
              }}
            >
              {currentIcon}
            </Box>
          )}
        </Stack>
      </Breadcrumbs>
    </Box>
  );
}
