"use client";

import {
  IconButton,
  Badge,
  Menu,
  Box,
  Typography,
  Divider,
  MenuItem,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const recentNotifications = notifications.slice(0, 5);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffMins < 1) return "A l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          bgcolor: open
            ? "primary.lighter"
            : (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.03)"
                  : "rgba(255,255,255,0.03)",
          borderRadius: "14px",
          p: 1.2,
          color: open ? "primary.main" : "inherit",
          transition: "all 0.3s ease",
          "&:hover": { bgcolor: "primary.lighter", color: "primary.main" },
        }}
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontWeight: 900,
              fontSize: "0.6rem",
              minWidth: 16,
              height: 16,
            },
          }}
        >
          <NotificationsIcon sx={{ fontSize: 20 }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 360,
              maxHeight: 520,
              mt: 2,
              borderRadius: "24px",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(30, 30, 30, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 20px 40px -12px rgba(0,0,0,0.15)"
                  : "0 20px 40px -12px rgba(0,0,0,0.5)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            p: 3,
            pt: 2,
            pb: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight="900">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Typography
              variant="caption"
              onClick={(e) => { e.stopPropagation(); markAllAsRead(); }}
              sx={{
                color: "primary.main",
                fontWeight: 800,
                bgcolor: "primary.lighter",
                px: 1,
                py: 0.2,
                borderRadius: "6px",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            >
              {unreadCount} NEW
            </Typography>
          )}
        </Box>
        <Divider sx={{ opacity: 0.5 }} />
        <Box sx={{ maxHeight: 360, overflowY: "auto", py: 1 }}>
          {loading ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <CircularProgress size={24} />
            </Box>
          ) : recentNotifications.length > 0 ? (
            recentNotifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => {
                  if (!notification.is_read) markAsRead(notification.id);
                  handleClose();
                }}
                sx={{
                  py: 2,
                  px: 3,
                  mx: 1,
                  borderRadius: "16px",
                  transition: "all 0.2s",
                  borderBottom: "1px solid transparent",
                  "&:hover": { bgcolor: "action.hover" },
                  whiteSpace: "normal",
                  display: "block",
                  ...(!notification.is_read && {
                    background: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(45, 63, 234, 0.03)"
                        : "rgba(138, 148, 255, 0.05)",
                  }),
                }}
              >
                <Stack spacing={0.8}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="900"
                      sx={{
                        color: notification.is_read
                          ? "text.secondary"
                          : "text.primary",
                      }}
                    >
                      {notification.title}
                    </Typography>
                    {!notification.is_read && (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          boxShadow: "0 0 8px rgba(45, 63, 234, 0.5)",
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="500"
                    sx={{ fontSize: "0.80rem" }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    fontWeight="700"
                  >
                    {formatTime(notification.created_at)}
                  </Typography>
                </Stack>
              </MenuItem>
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Aucune notification
              </Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ opacity: 0.5 }} />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button
            component={Link}
            href="/notifications"
            fullWidth
            onClick={handleClose}
            sx={{
              textTransform: "none",
              fontWeight: "900",
              borderRadius: "12px",
              py: 1,
              color: "primary.main",
              "&:hover": { bgcolor: "primary.lighter" },
            }}
          >
            Voir toutes les notifications
          </Button>
        </Box>
      </Menu>
    </>
  );
}
