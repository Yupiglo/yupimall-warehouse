"use client";

import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  Notifications as SystemIcon,
  ShoppingCart as OrderIcon,
  LocalShipping as DeliveryIcon,
  Warning as AlertIcon,
  CheckCircle as SuccessIcon,
  MoreVert as MoreIcon,
  Circle as UnreadIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useNotifications, Notification } from "@/hooks/useNotifications";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";

const getIcon = (type: string) => {
  switch (type) {
    case "order":
      return <OrderIcon />;
    case "delivery":
      return <DeliveryIcon />;
    case "alert":
      return <AlertIcon />;
    case "success":
      return <SuccessIcon />;
    default:
      return <SystemIcon />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case "order":
      return "primary";
    case "delivery":
      return "info";
    case "alert":
      return "warning";
    case "success":
      return "success";
    default:
      return "secondary";
  }
};

export default function NotificationsList() {
  const { notifications, setNotifications, loading, markAsRead } = useNotifications();

  // Listen for real-time notifications
  useRealtimeNotifications((event) => {
    // Add to list if not already there
    const newNotif: Notification = {
      id: event.id,
      title: event.type === 'order_created' ? 'Nouvelle Commande' : 'Mise à jour Statut',
      message: `${event.user_name}: Commande #${event.tracking_code} (${event.status})`,
      category: 'order',
      type: 'order',
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications(prev => [newNotif, ...prev]);
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notifications.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: '24px' }}>
        <Typography color="text.secondary">No notification found.</Typography>
      </Paper>
    );
  }

  return (
    <Paper
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
        overflow: "hidden",
      }}
    >
      <List sx={{ p: 0 }}>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                p: 3,
                cursor: "pointer",
                transition: "all 0.2s",
                bgcolor: !notification.is_read
                  ? (theme) =>
                    alpha(
                      theme.palette[getColor(notification.type)].main,
                      0.04
                    )
                  : "transparent",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(0, 0, 0, 0.02)"
                      : "rgba(255, 255, 255, 0.02)",
                },
                borderBottom:
                  index !== notifications.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
              }}
              onClick={() => markAsRead(notification.id)}
            >
              <ListItemAvatar sx={{ mt: 0.5, mr: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: (theme) =>
                      alpha(
                        theme.palette[getColor(notification.type)].main,
                        0.1
                      ),
                    color: `${getColor(notification.type)}.main`,
                    borderRadius: "12px",
                    width: 48,
                    height: 48,
                  }}
                >
                  {getIcon(notification.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={!notification.is_read ? 800 : 700}
                      color="text.primary"
                    >
                      {notification.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="caption"
                        fontWeight="600"
                        color="text.secondary"
                      >
                        {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                      {!notification.is_read && (
                        <UnreadIcon
                          sx={{ fontSize: 10, color: "primary.main" }}
                        />
                      )}
                    </Box>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {notification.message}
                  </Typography>
                }
              />
              <Box sx={{ ml: 2, mt: 0.5 }}>
                <IconButton size="small" sx={{ color: "text.disabled" }}>
                  <MoreIcon />
                </IconButton>
              </Box>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
