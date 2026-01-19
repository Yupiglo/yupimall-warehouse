"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  Breadcrumbs,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import Link from "next/link";
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ShowChart as VolumeIcon,
} from "@mui/icons-material";
import { LinksEnum } from "@/utilities/pagesLInksEnum";
import DefaultAvatar from "@/assets/AvatarBig.png";

const distributors = [
  {
    id: "#DST-001",
    name: "Global Logistics Inc.",
    location: "New York, USA",
    volume: "High",
    contact: "+1 202-555-0192",
    email: "contact@global-logistics.com",
    status: "Active",
    ordersProcessed: 1250,
    performance: "98%",
  },
];

export default function DistributorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  // Mock finding distributor by ID
  const distributor =
    distributors.find((d) => d.id === decodedId) || distributors[0];

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
        <Link
          href={LinksEnum.distributors}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="body2"
            fontWeight="500"
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            Distributors
          </Typography>
        </Link>
        <Typography variant="body2" fontWeight="700" color="text.primary">
          {distributor.name}
        </Typography>
      </Breadcrumbs>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton
          onClick={() => router.push("/distributors")}
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "white"
                : "rgba(255,255,255,0.05)",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "grey.50"
                  : "rgba(255,255,255,0.1)",
              transform: "translateX(-2px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <BackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: -0.5,
              }}
            >
              {distributor.name}
            </Typography>
            <Chip
              label={distributor.status}
              size="small"
              sx={{
                fontWeight: "800",
                fontSize: "0.65rem",
                borderRadius: "6px",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "common.white"
                    : "rgba(255, 255, 255, 0.05)",
                color: "success.main",
                border: "1px solid",
                borderColor: "success.main",
                height: 24,
              }}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            {distributor.id} • {distributor.location}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() =>
            router.push(
              `/distributors/${encodeURIComponent(distributor.id)}/edit`
            )
          }
          sx={{
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: "800",
            px: 4,
            py: 1.5,
            boxShadow: (theme) =>
              `0 10px 20px -5px ${theme.palette.primary.main}40`,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: (theme) =>
                `0 12px 25px -5px ${theme.palette.primary.main}60`,
            },
          }}
        >
          Edit Profile
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "24px",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(30, 30, 30, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
              overflow: "visible",
            }}
          >
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Box
                sx={{ position: "relative", display: "inline-block", mb: 2 }}
              >
                <Avatar
                  src={DefaultAvatar.src}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid",
                    borderColor: "background.paper",
                    boxShadow: "0 12px 24px -10px rgba(0,0,0,0.2)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "success.main",
                    border: "3px solid white",
                  }}
                />
              </Box>
              <Typography variant="h5" fontWeight="900" gutterBottom>
                {distributor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Premium Retail Partner
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2} alignItems="flex-start">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "10px",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`,
                      color: "primary.main",
                      display: "flex",
                    }}
                  >
                    <EmailIcon fontSize="small" />
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="caption" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {distributor.email}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "10px",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.info.main}15, ${theme.palette.info.main}25)`,
                      color: "info.main",
                      display: "flex",
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="caption" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {distributor.contact}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "10px",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.warning.main}15, ${theme.palette.warning.main}25)`,
                      color: "warning.main",
                      display: "flex",
                    }}
                  >
                    <LocationIcon fontSize="small" />
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="caption" color="text.secondary">
                      Headquarters
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {distributor.location}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>
                  Performance Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{
                        p: 3,
                        borderRadius: "20px",
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Avatar
                        sx={{
                          background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.success.main}15, ${theme.palette.success.main}25)`,
                          color: "success.main",
                          borderRadius: "14px",
                          width: 56,
                          height: 56,
                        }}
                      >
                        <VolumeIcon />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight="700"
                          textTransform="uppercase"
                        >
                          Total Orders
                        </Typography>
                        <Typography variant="h4" fontWeight="900">
                          {distributor.ordersProcessed}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{
                        p: 3,
                        borderRadius: "20px",
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Avatar
                        sx={{
                          background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.secondary.main}15, ${theme.palette.secondary.main}25)`,
                          color: "secondary.main",
                          borderRadius: "14px",
                          width: 56,
                          height: 56,
                        }}
                      >
                        <BusinessIcon />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight="700"
                          textTransform="uppercase"
                        >
                          Market Share
                        </Typography>
                        <Typography variant="h4" fontWeight="900">
                          {distributor.volume}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
