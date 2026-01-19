"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Stack,
  Button,
  Box,
  MenuItem,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Save as SaveIcon,
  MyLocation as LocationIcon,
} from "@mui/icons-material";
import ProfileSettings from "./ProfileSettings";

export default function ProfileDetails() {
  const [localisation, setLocalisation] = useState("Malibu, California");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setLocalisation(mapsUrl);
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Unable to retrieve your location");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Update your personal details and contact information.
            </Typography>

            <Stack spacing={3}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Nom"
                    defaultValue="Stark"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Prénoms"
                    defaultValue="Antony"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email Address"
                    defaultValue="tony@yupiflow.com"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Sexe"
                    defaultValue="M"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  >
                    <MenuItem value="M">Masculin</MenuItem>
                    <MenuItem value="F">Féminin</MenuItem>
                    <MenuItem value="O">Autre</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Localisation"
                    value={localisation}
                    onChange={(e) => setLocalisation(e.target.value)}
                    fullWidth
                    placeholder="Enter location or Google Maps link"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Get current location">
                              <IconButton
                                onClick={handleGetLocation}
                                disabled={loadingLocation}
                                color="primary"
                                size="small"
                              >
                                <LocationIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Adresse"
                    defaultValue="123 Ocean Drive"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                label="Bio"
                multiline
                rows={2}
                defaultValue="Product Manager with a passion for building great user experiences."
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <TextField
                label="Description"
                multiline
                rows={4}
                defaultValue="Avid traveler, technology enthusiast, and coffee lover. Always looking for new challenges and opportunities to grow."
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    borderRadius: "10px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    boxShadow: "none",
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={4}>
          <ProfileSettings />

          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(239, 68, 68, 0.1)"
                  : "#FEF2F2",
              border: "1px solid",
              borderColor: "error.light",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="error.main"
                gutterBottom
              >
                Danger Zone
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Once you delete your account, there is no going back.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{
                  py: 1.5,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "none",
                }}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
