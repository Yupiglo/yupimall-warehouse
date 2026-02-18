"use client";

import { useState, useEffect } from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import { Home as HomeIcon, Person as PersonIcon } from "@mui/icons-material";
import ProfileDetails from "@/components/profile/ProfileDetails";
import BreadcrumbsHeader from "@/components/common/BreadcrumbsHeader";
import PageHeader from "@/components/common/PageHeader";
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("me");
        setProfile(response.data.user);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const displayName = profile?.name || user?.name || "Utilisateur";
  const displayRole = (user as any)?.role || "Warehouse";
  const displayAvatar = profile?.avatar || profile?.image || user?.image || undefined;
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    : null;

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
              src={displayAvatar}
              alt={displayName}
              sx={{
                width: 80,
                height: 80,
                boxShadow: (theme) => theme.shadows[2],
                bgcolor: "primary.main",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h5" fontWeight="800" gutterBottom>
                {displayName}
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
                  sx={{ textTransform: "capitalize" }}
                >
                  {displayRole}
                </Typography>
                {memberSince && (
                  <>
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        bgcolor: "divider",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography variant="caption" color="text.disabled">
                      Membre depuis {memberSince}
                    </Typography>
                  </>
                )}
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
