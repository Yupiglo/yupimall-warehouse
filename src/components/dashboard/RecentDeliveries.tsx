import {
  Card,
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";
import AvatarSmall from "@/assets/Avatar.png";
interface RecentDeliveriesProps {
  items?: any[];
}

export default function RecentDeliveries({ items = [] }: RecentDeliveriesProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "success";
      case "reached_stockist":
        return "info";
      case "shipped_to_stockist":
        return "primary";
      case "reached_warehouse":
        return "warning";
      default:
        return "default";
    }
  };
  return (
    <Card
      sx={{
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: (theme) =>
            theme.palette.mode === "light" ? "#fafafa" : "#252525",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Recent Deliveries
        </Typography>
        <Button
          component={Link}
          href={LinksEnum.deliveries}
          variant="outlined"
          size="small"
          sx={{ borderRadius: 2 }}
        >
          View All Deliveries
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Courier</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((delivery: any) => (
              <TableRow
                key={delivery.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  #{delivery.trackingCode}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {delivery.userName || 'Guest'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "primary.main",
                        fontSize: '0.8rem'
                      }}
                    >
                      {delivery.status.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">Automatic</Typography>
                  </Stack>
                </TableCell>
                <TableCell color="text.secondary">
                  Warehouse
                </TableCell>
                <TableCell>
                  <Chip
                    label={delivery.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? "common.white"
                          : "rgba(255, 255, 255, 0.05)",
                      color: `${getStatusColor(delivery.status)}.main`,
                      border: "1px solid",
                      borderColor: `${getStatusColor(delivery.status)}.main`,
                      "& .MuiChip-label": { px: 1 },
                    }}
                  />
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 500, color: "text.secondary" }}
                >
                  {delivery.updatedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
