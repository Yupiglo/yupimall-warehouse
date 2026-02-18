"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Avatar,
  Stack,
  useTheme,
  Divider,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";
import { useColorMode } from "./ThemeRegistry/ColorModeContext";
import NotificationsMenu from "@/components/NotificationsMenu";
import CartDrawer from "@/components/CartDrawer";
import CurrencySelector from "@/components/CurrencySelector";
import { useCart } from "@/hooks/useCart";
import { useSession } from "next-auth/react";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const theme = useTheme();
  const colorMode = useColorMode();
  const { cartItemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(18, 18, 18, 0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          top: 0,
          width: { lg: `calc(100% - 280px)` },
          ml: { lg: "280px" },
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 70, md: 80 } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            sx={{
              mr: 2,
              display: { lg: "none" },
              bgcolor: "action.hover",
              borderRadius: "12px",
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Spacer to push actions to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Actions */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              onClick={colorMode.toggleColorMode}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.03)"
                    : "rgba(255,255,255,0.03)",
                borderRadius: "14px",
                p: 1.2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "rotate(15deg)",
                  bgcolor: "primary.lighter",
                },
              }}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon sx={{ fontSize: 20 }} />
              ) : (
                <Brightness4Icon sx={{ fontSize: 20 }} />
              )}
            </IconButton>

            {/* Currency Selector */}
            <CurrencySelector />

            {/* Cart Icon */}
            <IconButton
              onClick={() => setCartOpen(true)}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.03)"
                    : "rgba(255,255,255,0.03)",
                borderRadius: "14px",
                p: 1.2,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "primary.lighter",
                },
              }}
            >
              <Badge
                badgeContent={cartItemCount}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    minWidth: 18,
                    height: 18,
                  },
                }}
              >
                <CartIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>

            <NotificationsMenu />

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1, height: 24, alignSelf: "center", opacity: 0.5 }}
            />

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                pl: 1,
                pr: 0.5,
                py: 0.5,
                borderRadius: "16px",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  border: "2px solid",
                  borderColor: "primary.lighter",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  bgcolor: "primary.main",
                  fontWeight: "bold",
                }}
                src={user?.image || undefined}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  fontWeight="900"
                  sx={{ lineHeight: 1.2 }}
                >
                  {user?.name || "Utilisateur"}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary.main"
                  fontWeight="800"
                  sx={{
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {(user as any)?.role || "Warehouse Admin"}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
