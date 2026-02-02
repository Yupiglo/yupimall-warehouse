"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Grid,
  Breadcrumbs,
  Avatar,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DefaultAvatar from "@/assets/AvatarBig.png";
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";

export default function DistributorEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  const [formData, setFormData] = useState({
    name: "Global Logistics Inc.",
    location: "New York, USA",
    contact: "+1 202-555-0192",
    email: "contact@global-logistics.com",
    status: "Active",
  });

  const handleSave = () => {
    console.log("Saving distributor:", formData);
    router.push(`/distributors/${encodeURIComponent(decodedId)}`);
  };

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
        <Link
          href={`/distributors/${encodeURIComponent(decodedId)}`}
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
            {decodedId.split("-")[0] + "..."}
          </Typography>
        </Link>
        <Typography variant="body2" fontWeight="700" color="text.primary">
          Edit
        </Typography>
      </Breadcrumbs>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton
          onClick={() =>
            router.push(`/distributors/${encodeURIComponent(decodedId)}`)
          }
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
          }}
        >
          <BackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
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
            Edit Distributor
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Update status only. Profile details are read-only.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
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
          Save Changes
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "24px",
              border: "1px solid",
              borderColor: "divider",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(30, 30, 30, 0.6)",
              backdropFilter: "blur(12px)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.info.main}15, ${theme.palette.info.main}25)`,
                    color: "info.main",
                  }}
                >
                  <BusinessIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Company Details (Read-Only)
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Avatar
                    src={DefaultAvatar.src}
                    sx={{
                      width: 100,
                      height: 100,
                      border: "4px solid",
                      borderColor: "background.paper",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
                <TextField
                  fullWidth
                  disabled
                  label="Company Name"
                  value={formData.name}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <TextField
                  fullWidth
                  disabled
                  label="Email Address"
                  value={formData.email}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <TextField
                  fullWidth
                  disabled
                  label="Phone Number"
                  value={formData.contact}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <TextField
                  fullWidth
                  disabled
                  label="Headquarters"
                  value={formData.location}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />

                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid",
                    borderColor: "primary.main",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      Active Permission
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Toggle to enable or disable this distributor account.
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.status === "Active"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: e.target.checked ? "Active" : "Inactive",
                          })
                        }
                      />
                    }
                    label={formData.status === "Active" ? "Active" : "Inactive"}
                    labelPlacement="start"
                    sx={{ ml: 0 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
