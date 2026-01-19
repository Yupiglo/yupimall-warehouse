"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, // Header now handles horizontal spacing, or AppShell handles it for content
          ml: { lg: "280px" }, // Match drawer width
          transition: "margin 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
