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
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useStockEntries } from "@/hooks/useStock";

interface StockEntry {
  id: number;
  reference?: string;
  product?: {
    title?: string;
    sku?: string;
  };
  quantity: number;
  supplier?: string;
  created_at?: string;
}

export default function EntriesTable() {
  const router = useRouter();
  const { entries, loading, error } = useStockEntries();

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

  if (entries.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography color="text.secondary">Aucune entrée de stock</Typography>
      </Box>
    );
  }

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
              Entry ID
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
              Supplier
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
          {entries.map((entry) => (
            <TableRow
              key={entry.id}
              onClick={() =>
                router.push(`/entries/${encodeURIComponent(entry.id)}`)
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
                  {entry.id}
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
                      {entry.product}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="700"
                    >
                      SKU: {entry.sku}
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
                    {entry.quantity}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="text.secondary"
                >
                  {entry.supplier}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="caption"
                  fontWeight="700"
                  color="text.secondary"
                >
                  {entry.date}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="View Receipt">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "background.paper",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        "&:hover": { bgcolor: "primary.main", color: "white" },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/entries/${encodeURIComponent(entry.id)}`);
                      }}
                    >
                      <ViewIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Print Slip">
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
                          `/entries/${encodeURIComponent(entry.id)}?print=true`
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
