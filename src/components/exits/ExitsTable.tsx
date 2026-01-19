"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { mockExits } from "@/data/mocks/exits";
import { Exit } from "@/types";

export default function ExitsTable() {
  const router = useRouter();

  return (
    <TableContainer
      sx={{
        borderRadius: "28px",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(30, 30, 30, 0.4)",
        backdropFilter: "blur(12px)",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 8px 32px rgba(0,0,0,0.02)",
        overflow: "hidden",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow
            sx={{
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(248, 249, 250, 0.5)"
                  : "rgba(255, 255, 255, 0.02)",
            }}
          >
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
                color: "text.secondary",
                py: 2.5,
              }}
            >
              Exit ID
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
                color: "text.secondary",
                py: 2.5,
              }}
            >
              Product
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
                color: "text.secondary",
                py: 2.5,
              }}
            >
              Quantity
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
                color: "text.secondary",
                py: 2.5,
              }}
            >
              Destination
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
                color: "text.secondary",
                py: 2.5,
              }}
            >
              Date
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: 1,
                color: "text.secondary",
                py: 2.5,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockExits.map((exit: Exit) => (
            <TableRow
              key={exit.id}
              onClick={() =>
                router.push(`/exits/${encodeURIComponent(exit.id)}`)
              }
              sx={{
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(45, 63, 234, 0.02)"
                      : "rgba(255, 255, 255, 0.03)",
                },
              }}
            >
              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight="800"
                  color="primary.main"
                >
                  {exit.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="900"
                      sx={{ mb: 0.2 }}
                    >
                      {exit.product}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="700"
                    >
                      SKU: {exit.sku}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "8px",
                    bgcolor: "action.hover",
                    display: "inline-block",
                  }}
                >
                  <Typography variant="body2" fontWeight="900">
                    {exit.quantity}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="text.secondary"
                >
                  {exit.destination}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="caption"
                  fontWeight="700"
                  color="text.secondary"
                >
                  {exit.date}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "background.paper",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        "&:hover": { bgcolor: "primary.main", color: "white" },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/exits/${encodeURIComponent(exit.id)}`);
                      }}
                    >
                      <ViewIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Print Waybill">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "background.paper",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        "&:hover": { bgcolor: "primary.main", color: "white" },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/exits/${encodeURIComponent(exit.id)}?print=true`
                        );
                      }}
                    >
                      <PrintIcon fontSize="inherit" />
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
