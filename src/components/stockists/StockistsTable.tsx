"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box,
  Stack,
  Tooltip,
  Avatar,
  Switch,
  CircularProgress,
} from "@mui/material";
import { Visibility as ViewIcon, Edit as EditIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { StockistPackage } from "@/types";
import DefaultAvatar from "@/assets/Avatar.png";

const stockists: {
  id: string;
  name: string;
  location: string;
  package: StockistPackage;
  contact: string;
  status: string;
}[] = [
    {
      id: "#STK-001",
      name: "Urban Retailers",
      location: "East Coast, USA",
      package: "Prestige",
      contact: "+1 202-555-0192",
      status: "Active",
    },
    {
      id: "#STK-002",
      name: "Suburban Mart",
      location: "Midwest, USA",
      package: "Elite",
      contact: "+1 312-555-0145",
      status: "Active",
    },
    {
      id: "#STK-003",
      name: "QuickStop Inc.",
      location: "West Coast, USA",
      package: "Yupi",
      contact: "+1 415-555-0812",
      status: "Inactive",
    },
    {
      id: "#STK-004",
      name: "Metro Supplies",
      location: "South, USA",
      package: "Visionnaire",
      contact: "+1 678-555-0934",
      status: "Active",
    },
  ];

import { useStockists } from "@/hooks/useStockists";

export default function StockistsTable() {
  const router = useRouter();
  const { stockists, loading, error } = useStockists();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleToggleStatus = (id: string | number) => {
    // Placeholder for API call to toggle status
    console.log("Toggle status for", id);
  };

  const getPackageStyles = (pkg: StockistPackage) => {
    switch (pkg) {
      case "Yupi":
        return { color: "info", label: "Yupi" };
      case "Elite":
        return { color: "primary", label: "Elite" };
      case "Succes":
        return { color: "success", label: "Succes" };
      case "Prestige":
        return { color: "warning", label: "Prestige" };
      case "Visionnaire":
        return { color: "secondary", label: "Visionnaire" };
      case "Triomphe":
        return { color: "error", label: "Triomphe" };
      case "Prosperity":
        return { color: "success", label: "Prosperity" };
      default:
        return { color: "default", label: pkg };
    }
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "divider",
        background: (theme: any) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(30, 30, 30, 0.4)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.02)",
        overflow: "hidden",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: (theme: any) => theme.palette.action.hover }}>
            {[
              "Stockist",
              "Location",
              "Package",
              "Contact",
              "Active Status",
              "Actions",
            ].map((head) => (
              <TableCell
                key={head}
                align={head === "Actions" ? "right" : "left"}
                sx={{
                  fontWeight: "800",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  color: "text.secondary",
                  py: 2.5,
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stockists.map((item: any) => {
            const pkgStyle = getPackageStyles(item.package as StockistPackage);
            return (
              <TableRow
                key={item.id}
                hover
                onClick={() =>
                  router.push(`/stockists/${encodeURIComponent(item.id)}`)
                }
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: (theme: any) =>
                      theme.palette.mode === "light"
                        ? "rgba(59, 130, 246, 0.02)"
                        : "rgba(255, 255, 255, 0.03)",
                  },
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 44,
                        height: 44,
                        bgcolor: "info.lighter",
                        color: "info.main",
                        fontWeight: "800",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      }}
                      src={DefaultAvatar.src}
                    >
                      {item.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="800">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="600"
                      >
                        {item.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color="text.secondary"
                  >
                    {item.location}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={pkgStyle.label}
                    size="small"
                    sx={{
                      fontWeight: "800",
                      fontSize: "0.75rem",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      bgcolor: (theme: any) =>
                        theme.palette.mode === "light"
                          ? "white"
                          : "rgba(255,255,255,0.05)",
                      color: `${pkgStyle.color}.main`,
                      border: "1px solid",
                      borderColor: `${pkgStyle.color}.main`,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "600", color: "text.secondary" }}>
                  {item.contact}
                </TableCell>
                <TableCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Switch
                      checked={item.status === "Active"}
                      onChange={() => handleToggleStatus(item.id)}
                      size="small"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "info.main",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "info.main",
                        },
                      }}
                    />
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        fontWeight: "800",
                        fontSize: "0.65rem",
                        borderRadius: "6px",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        bgcolor: (theme: any) =>
                          theme.palette.mode === "light"
                            ? "white"
                            : "rgba(255,255,255,0.05)",
                        color:
                          item.status === "Active"
                            ? "success.main"
                            : "text.disabled",
                        border: "1px solid",
                        borderColor:
                          item.status === "Active"
                            ? "success.main"
                            : "text.disabled",
                      }}
                    />
                  </Stack>
                </TableCell>
                <TableCell align="right" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="View Profile">
                      <IconButton
                        size="small"
                        onClick={() =>
                          router.push(
                            `/stockists/${encodeURIComponent(item.id)}`
                          )
                        }
                        sx={{
                          borderRadius: "8px",
                          color: "primary.main",
                          bgcolor: "primary.lighter",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Info">
                      <IconButton
                        size="small"
                        onClick={() =>
                          router.push(
                            `/stockists/${encodeURIComponent(item.id)}/edit`
                          )
                        }
                        sx={{
                          borderRadius: "8px",
                          color: "info.main",
                          bgcolor: "info.lighter",
                          "&:hover": { bgcolor: "info.main", color: "white" },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
