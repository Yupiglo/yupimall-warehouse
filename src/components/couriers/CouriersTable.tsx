"use client";

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
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";
import { useDeliveryPersonnel } from "@/hooks/useDeliveries";

export default function CouriersTable() {
  const router = useRouter();
  const { personnel, loading, error } = useDeliveryPersonnel();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>;
  }

  if (personnel.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography color="text.secondary">Aucun livreur trouvé</Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "divider",
        background: (theme) =>
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
          <TableRow sx={{ bgcolor: (theme) => theme.palette.action.hover }}>
            {["Livreur", "Contact", "Véhicule", "Livraisons", "Statut", "Actions"].map((head) => (
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
          {personnel.map((courier) => (
            <TableRow
              key={courier.id}
              hover
              onClick={() => router.push(`/couriers/${courier.id}`)}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: (theme) =>
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
                      bgcolor: "primary.lighter",
                      color: "primary.main",
                      fontWeight: "800",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    {courier.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="800">
                      {courier.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight="600">
                      #{courier.id}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" fontWeight="600">
                    {courier.email}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {courier.phone}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: "600", color: "text.secondary" }}>
                {courier.vehicle || "—"}
              </TableCell>
              <TableCell sx={{ fontWeight: "800" }}>
                {courier.totalDeliveries ?? 0}
              </TableCell>
              <TableCell>
                <Chip
                  label={courier.status}
                  size="small"
                  sx={{
                    fontWeight: "800",
                    fontSize: "0.65rem",
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    bgcolor: (theme) =>
                      theme.palette.mode === "light" ? "white" : "rgba(255,255,255,0.05)",
                    color:
                      courier.status === "Active" || courier.status === "active"
                        ? "success.main"
                        : courier.status === "Inactive" || courier.status === "Offline" || courier.status === "inactive"
                        ? "text.disabled"
                        : "info.main",
                    border: "1px solid",
                    borderColor:
                      courier.status === "Active" || courier.status === "active"
                        ? "success.main"
                        : courier.status === "Inactive" || courier.status === "Offline" || courier.status === "inactive"
                        ? "text.disabled"
                        : "info.main",
                  }}
                />
              </TableCell>
              <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="Voir le profil">
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/couriers/${courier.id}`)}
                      sx={{
                        borderRadius: "8px",
                        color: "primary.main",
                        bgcolor: "primary.lighter",
                        "&:hover": { bgcolor: "primary.main", color: "white" },
                      }}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Modifier">
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/couriers/${courier.id}/edit`)}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
