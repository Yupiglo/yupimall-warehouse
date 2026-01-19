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
import { Visibility as ViewIcon, Edit as EditIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultAvatar from "@/assets/AvatarBig.png";

const distributors = [
  {
    id: "#DST-001",
    name: "Global Logistics Inc.",
    location: "New York, USA",
    volume: "High",
    contact: "+1 202-555-0192",
    status: "Active",
  },
  {
    id: "#DST-002",
    name: "EuroTransit GmbH",
    location: "Berlin, Germany",
    volume: "Medium",
    contact: "+49 30 123456",
    status: "Active",
  },
  {
    id: "#DST-003",
    name: "Asia Pacific Trade",
    location: "Singapore",
    volume: "Very High",
    contact: "+65 6789 1234",
    status: "Inactive",
  },
  {
    id: "#DST-004",
    name: "Nordic Supply Chain",
    location: "Stockholm, Sweden",
    volume: "Low",
    contact: "+46 8 555 123",
    status: "Active",
  },
];

export default function DistributorsTable() {
  const router = useRouter();
  const [list, setList] = React.useState(distributors);

  const handleToggleStatus = (id: string) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
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
              "Distributor",
              "Location",
              "Monthly Volume",
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
          {list.map((item) => (
            <TableRow
              key={item.id}
              hover
              onClick={() =>
                router.push(`/distributors/${encodeURIComponent(item.id)}`)
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
                  label={item.volume}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    borderRadius: "8px",
                    bgcolor: item.volume.includes("High")
                      ? "success.lighter"
                      : "background.paper",
                    color: item.volume.includes("High")
                      ? "success.main"
                      : "text.secondary",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "600", color: "text.secondary" }}>
                {item.contact}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
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
                      bgcolor: (theme) =>
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
              <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="View Profile">
                    <IconButton
                      size="small"
                      onClick={() =>
                        router.push(
                          `/distributors/${encodeURIComponent(item.id)}`
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
                          `/distributors/${encodeURIComponent(item.id)}/edit`
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
