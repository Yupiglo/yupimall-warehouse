"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoBig from "@/assets/Logo/LogoBig.png";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory2 as ProductsIcon,
  ShoppingCart as OrdersIcon,
  LocalShipping as DeliveriesIcon,
  Moped as CouriersIcon,
  Groups as CustomersIcon,
  SupervisorAccount as ManagersIcon,
  Notifications as NotificationsIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
  Input as EntriesIcon,
  Output as ExitsIcon,
  AssignmentInd as InscriptionsIcon,
} from "@mui/icons-material";

const navItems = [
  { name: "Dashboard", href: LinksEnum.dashboard, icon: <DashboardIcon /> },
  { name: "Products", href: LinksEnum.products, icon: <ProductsIcon /> },
  { name: "Orders", href: LinksEnum.orders, icon: <OrdersIcon /> },
  { name: "Entries", href: LinksEnum.entries, icon: <EntriesIcon /> },
  { name: "Exits", href: LinksEnum.exits, icon: <ExitsIcon /> },
  { name: "Deliveries", href: LinksEnum.deliveries, icon: <DeliveriesIcon /> },
  { name: "Couriers", href: LinksEnum.couriers, icon: <CouriersIcon /> },
  {
    name: "Distributors",
    href: LinksEnum.distributors,
    icon: <CustomersIcon />,
  },
  { name: "Stockists", href: LinksEnum.stockists, icon: <ManagersIcon /> },
  { name: "Inscriptions", href: LinksEnum.registrations, icon: <InscriptionsIcon /> },
  {
    name: "Notifications",
    href: LinksEnum.notifications,
    icon: <NotificationsIcon />,
  },
  { name: "Profile", href: LinksEnum.profile, icon: <ProfileIcon /> },
];

const drawerWidth = 280;

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        sx={{
          height: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
      >
        <Box sx={{ position: "relative", width: 130, height: 90 }}>
          <Image src={LogoBig} alt="YupiFlow" fill className="object-contain" />
        </Box>
      </Toolbar>

      <List sx={{ flex: 1, px: 2, pb: 2, overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.8 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => {
                  if (isMobile) onClose();
                }}
                sx={{
                  borderRadius: "16px",
                  py: 1.4,
                  px: 2.5,
                  transition: "all 0.3s ease",
                  backgroundColor: isActive
                    ? (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(45, 63, 234, 0.08)"
                        : "rgba(138, 148, 255, 0.15)"
                    : "transparent",
                  color: isActive ? "primary.main" : "text.secondary",
                  border: isActive ? "1px solid" : "1px solid transparent",
                  borderColor: isActive ? "primary.main" : "transparent",
                  boxShadow: isActive
                    ? (theme) =>
                      theme.palette.mode === "light"
                        ? "0 8px 12px -6px rgba(45, 63, 234, 0.15)"
                        : "0 8px 12px -6px rgba(0, 0, 0, 0.3)"
                    : "none",
                  "&:hover": {
                    backgroundColor: isActive
                      ? (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(45, 63, 234, 0.12)"
                          : "rgba(138, 148, 255, 0.2)"
                      : (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.02)"
                          : "rgba(255, 255, 255, 0.02)",
                    color: "primary.main",
                    transform: "translateX(6px)",
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "primary.main" : "text.secondary",
                    minWidth: 40,
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  slotProps={{
                    primary: {
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 900 : 600,
                      letterSpacing: isActive ? 0.5 : 0,
                    },
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      boxShadow: "0 0 10px rgba(45, 63, 234, 0.5)",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box
        sx={{
          p: 2,
          mt: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <ListItemButton
          component={Link}
          href={LinksEnum.logout}
          sx={{
            borderRadius: "12px",
            py: 1.2,
            color: "error.main",
            "&:hover": {
              backgroundColor: "error.main",
              color: "common.white",
              "& .MuiListItemIcon-root": { color: "common.white" },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            slotProps={{
              primary: { fontSize: "0.875rem", fontWeight: 700 },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundImage: "none",
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#ffffff" : "#121212",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "1px solid",
            borderColor: "divider",
            backgroundImage: "none",
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#ffffff" : "#121212",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
