"use client";

import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { LinksEnum } from "@/utilities/pagesLinksEnum";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  DoneAll as MarkReadIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import NotificationsList from "@/components/notifications/NotificationsList";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const { markAllAsRead } = useNotifications();

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Breadcrumbs
        separator={
          <ChevronRightIcon sx={{ fontSize: "1rem", color: "text.disabled" }} />
        }
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Box
          component={Link}
          href={LinksEnum.dashboard}
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": { color: "primary.main" },
            transition: "color 0.2s",
          }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
          <Typography variant="body2" fontWeight="500">
            Home
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" fontWeight="700" color="text.primary">
            Notifications
          </Typography>
          <NotificationIcon
            sx={{ ml: 0.5, fontSize: "1.2rem", color: "primary.main" }}
          />
        </Box>
      </Breadcrumbs>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -0.5,
              mb: 0.5,
            }}
          >
            Notifications
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight="500">
            Stay updated with system alerts and activities.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<MarkReadIcon />}
          onClick={markAllAsRead}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            borderColor: "divider",
            color: "text.secondary",
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
              bgcolor: "primary.lighter",
            },
          }}
        >
          Mark all as read
        </Button>
      </Stack>

      <NotificationsList />
    </Box>
  );
}
