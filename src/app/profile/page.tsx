"use client";

import { Box, Stack, Typography, Avatar } from "@mui/material";
import AvatarBig from "@/assets/AvatarBig.png";
import { Home as HomeIcon, Person as PersonIcon } from "@mui/icons-material";
import ProfileDetails from "@/components/profile/ProfileDetails";

import BreadcrumbsHeader from "@/components/common/BreadcrumbsHeader";
import PageHeader from "@/components/common/PageHeader";

export default function ProfilePage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <BreadcrumbsHeader
        items={[{ label: "Home", href: "/", icon: <HomeIcon /> }]}
        current="Profile"
        currentIcon={<PersonIcon />}
      />

      <PageHeader
        title="Account Settings"
        subtitle="Manage your personal information"
        height="auto"
      >
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: (theme) => theme.shadows[1],
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems="center"
          >
            <Avatar
              src={AvatarBig.src}
              alt="Antony STARK"
              sx={{
                width: 80,
                height: 80,
                boxShadow: (theme) => theme.shadows[2],
                bgcolor: "primary.main",
              }}
            />
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h5" fontWeight="800" gutterBottom>
                Antony STARK
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="600"
                >
                  Administrator
                </Typography>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    bgcolor: "divider",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="caption" color="text.disabled">
                  Member since Oct 2025
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </PageHeader>

      <Stack spacing={4}>
        <ProfileDetails />
      </Stack>
    </Box>
  );
}
