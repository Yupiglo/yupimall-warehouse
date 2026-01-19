"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Switch,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Save as SaveIcon } from "@mui/icons-material";
import ChangePasswordModal from "./ChangePasswordModal";

export default function ProfileSettings() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "divider",
          background: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(30, 30, 30, 0.6)",
          backdropFilter: "blur(12px)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
            Preferences
          </Typography>
          <Stack spacing={2}>
            {[
              {
                label: "Email Notifications",
                desc: "Receive email updates for important alerts.",
              },
              {
                label: "Push Notifications",
                desc: "Get real-time updates on your device.",
              },
              { label: "Dark Mode", desc: "Use dark theme by default." },
            ].map((setting, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderRadius: "12px",
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
                }}
              >
                <Box>
                  <Typography variant="subtitle2" fontWeight="700">
                    {setting.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {setting.desc}
                  </Typography>
                </Box>
                <Switch defaultChecked color="primary" />
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
            Security
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.03),
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.error.main, 0.1),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="subtitle2" fontWeight="700">
                Password
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last changed 3 months ago
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => setIsPasswordModalOpen(true)}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Change Password
            </Button>
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                borderRadius: "10px",
                fontWeight: "bold",
                px: 3,
                py: 1,
                boxShadow: "none",
                textTransform: "none",
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </CardContent>
      </Card>

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
