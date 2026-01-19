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
  Switch,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultAvatar from "@/assets/AvatarBig.png";

const couriers = [
  {
    id: "#COU-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    vehicle: "Motorcycle",
    deliveries: 124,
    status: "Active",
  },
  {
    id: "#COU-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 891",
    vehicle: "Bicycle",
    deliveries: 85,
    status: "Active",
  },
  {
    id: "#COU-003",
    name: "Mike Tyson",
    email: "mike.t@example.com",
    phone: "+1 234 567 892",
    vehicle: "Car",
    deliveries: 210,
    status: "On Delivery",
  },
  {
    id: "#COU-004",
    name: "Sarah Connor",
    email: "sarah.c@example.com",
    phone: "+1 234 567 893",
    vehicle: "Van",
    deliveries: 45,
    status: "Offline",
  },
];

export default function CouriersTable() {
  const router = useRouter();
  // State to manage toggle status locally for demonstration
  const [courierList, setCourierList] = React.useState(couriers);

  const handleToggleStatus = (id: string) => {
    setCourierList((prev) =>
      prev.map((courier) =>
        courier.id === id
          ? {
              ...courier,
              status: courier.status === "Active" ? "Inactive" : "Active",
            }
          : courier
      )
    );
  };

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
            {[
              "Courier",
              "Contact Info",
              "Vehicle",
              "Total Deliveries",
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
          {courierList.map((courier) => (
            <TableRow
              key={courier.id}
              hover
              onClick={() =>
                router.push(`/couriers/${encodeURIComponent(courier.id)}`)
              }
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
                    src={DefaultAvatar.src}
                  >
                    {courier.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="800">
                      {courier.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="600"
                    >
                      {courier.id}
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
                {courier.vehicle}
              </TableCell>
              <TableCell sx={{ fontWeight: "800" }}>
                {courier.deliveries}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Switch
                    checked={
                      courier.status === "Active" ||
                      courier.status === "On Delivery"
                    } // Treat 'On Delivery' as Active for toggle visually
                    onChange={() => handleToggleStatus(courier.id)}
                    size="small"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "primary.main",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "primary.main",
                        },
                    }}
                  />
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
                        theme.palette.mode === "light"
                          ? "white"
                          : "rgba(255,255,255,0.05)",
                      color:
                        courier.status === "Active"
                          ? "success.main"
                          : courier.status === "Inactive" ||
                            courier.status === "Offline"
                          ? "text.disabled"
                          : "info.main",
                      border: "1px solid",
                      borderColor:
                        courier.status === "Active"
                          ? "success.main"
                          : courier.status === "Inactive" ||
                            courier.status === "Offline"
                          ? "text.disabled"
                          : "info.main",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="View Profile">
                    <IconButton
                      size="small"
                      onClick={() =>
                        router.push(
                          `/couriers/${encodeURIComponent(courier.id)}`
                        )
                      }
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
                  <Tooltip title="Edit Info">
                    <IconButton
                      size="small"
                      onClick={() =>
                        router.push(
                          `/couriers/${encodeURIComponent(courier.id)}/edit`
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
