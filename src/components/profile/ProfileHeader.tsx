"use client";

import {
  Box,
  Typography,
  Avatar,
  Stack,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  PhotoCamera as CameraIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

export default function ProfileHeader() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid",
        borderColor: "divider",
        overflow: "visible",
        position: "relative",
        mb: 4,
      }}
    >
      <Box
        sx={{
          height: 160,
          borderRadius: "16px 16px 0 0",
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        }}
      />
      <CardContent sx={{ pt: 0, pb: 3, px: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems={{ xs: "center", sm: "flex-end" }}
          sx={{ mt: -6 }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                border: "4px solid",
                borderColor: "background.paper",
                boxShadow: (theme) => theme.shadows[3],
                bgcolor: "primary.main",
                fontSize: "3rem",
              }}
            >
              AS
            </Avatar>
            <IconButton
              sx={{
                position: "absolute",
                bottom: 4,
                right: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { bgcolor: "action.hover" },
                width: 32,
                height: 32,
              }}
              size="small"
            >
              <CameraIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          <Box
            sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" }, pb: 1 }}
          >
            <Typography variant="h5" fontWeight="bold">
              Antony STARK
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Administrator | member since Oct 2025
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
