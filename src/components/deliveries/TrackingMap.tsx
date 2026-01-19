"use client";

import { Box, Paper, Typography, Avatar, Stack } from "@mui/material";
import { alpha, keyframes } from "@mui/material/styles";
import DefaultAvatar from "@/assets/AvatarBig.png";
import {
  NearMe as NavigationIcon,
  Home as HomeIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";

// Animation for the pulsing effect around the courier
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(14, 165, 233, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0);
  }
`;

// Animation to move along the path
const moveAlongPath = keyframes`
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
`;

export default function TrackingMap() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#f8fafc" : "#0f172a",
        border: "1px solid",
        borderColor: "divider",
        perspective: "1000px", // Enable 3D perspective
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
      }}
    >
      {/* 3D Tilted Map Plane */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          transform: "rotateX(20deg) scale(1.1)", // Tilt backward
          transformOrigin: "center 80%",
          position: "relative",
        }}
      >
        {/* Abstract Map Background */}
        <Box
          component="svg"
          viewBox="0 0 800 400"
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.6,
          }}
        >
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(14, 165, 233, 0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Ambient Glow */}
          <rect width="100%" height="100%" fill="url(#glow)" />

          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="url(#gridGradient)"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Abstract Roads/Blocks */}
          <path
            d="M -50 200 H 850 M 400 -50 V 450"
            stroke="currentColor"
            strokeWidth="30"
            opacity="0.03"
          />
          <path
            d="M 150 -50 L 150 450 M 650 -50 L 650 450"
            stroke="currentColor"
            strokeWidth="15"
            opacity="0.03"
          />
          {/* Diagonal Architecture hint */}
          <path
            d="M 0 400 L 400 0 M 400 400 L 800 0"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.03"
          />
        </Box>

        {/* The Route Path (SVG) */}
        <Box
          component="svg"
          viewBox="0 0 800 400"
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            filter: "drop-shadow(0 0 8px rgba(14, 165, 233, 0.3))",
          }}
        >
          <defs>
            <linearGradient
              id="routeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#0ea5e9" /> {/* Sky Blue */}
              <stop offset="50%" stopColor="#8b5cf6" /> {/* Violet */}
              <stop offset="100%" stopColor="#f43f5e" /> {/* Rose */}
            </linearGradient>
          </defs>
          {/* Background Path (Track) */}
          <path
            id="route-path"
            d="M 50 350 C 200 350, 200 100, 400 100 C 600 100, 600 250, 750 250"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.05"
          />
          {/* Active Gradient Path */}
          <path
            d="M 50 350 C 200 350, 200 100, 400 100 C 600 100, 600 250, 750 250"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </Box>

        {/* Destination Marker */}
        <Box
          sx={{
            position: "absolute",
            right: "5%",
            top: "62%",
            transform: "translate(50%, -50%)",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "success.main",
              color: "white",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              boxShadow:
                "0 0 0 6px rgba(34, 197, 94, 0.2), 0 10px 20px rgba(0,0,0,0.2)",
              animation: `${pulse} 3s infinite`,
            }}
          >
            <HomeIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        {/* Moving Courier Marker */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            offsetPath: `path("M 50 350 C 200 350, 200 100, 400 100 C 600 100, 600 250, 750 250")`,
            animation: `${moveAlongPath} 12s linear infinite alternate`,
            offsetRotate: "auto",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              transform: "rotateX(-20deg)", // Counter-rotate to face camera
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "4px solid white",
                overflow: "hidden",
                boxShadow:
                  "0 10px 25px -5px rgba(14, 165, 233, 0.5), 0 0 0 4px rgba(14, 165, 233, 0.2)",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                src={DefaultAvatar.src}
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>

            {/* Live Indicator Dot */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 14,
                height: 14,
                bgcolor: "#22c55e",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />

            {/* Tooltip Overlay */}
            <Paper
              elevation={6}
              sx={{
                position: "absolute",
                bottom: "135%",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                px: 2,
                py: 0.8,
                borderRadius: "12px",
                fontWeight: "800",
                fontSize: "0.75rem",
                bgcolor: "background.paper",
                boxShadow: "0 8px 20px -5px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  animation: "pulse 1s infinite",
                }}
              />
              John (Courier)
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Static Overlays - Glassmorphism UI */}
      <Stack
        direction="column"
        spacing={1.5}
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 10,
        }}
      >
        {[
          {
            icon: <NavigationIcon fontSize="inherit" />,
            label: "ETA",
            value: "12 min",
            color: "primary",
          },
          {
            icon: <SpeedIcon fontSize="inherit" />,
            label: "Speed",
            value: "45 km/h",
            color: "secondary",
          },
        ].map((item, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: "16px",
              bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
              backdropFilter: "blur(16px) saturate(180%)", // Premium Frosted Glass
              border: "1px solid",
              borderColor: "rgba(255,255,255,0.3)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              minWidth: 140,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateX(-4px)",
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
              },
            }}
          >
            <Box
              sx={{
                p: 0.8,
                bgcolor: `${item.color}.main`,
                borderRadius: "10px",
                color: "white",
                display: "flex",
                fontSize: "1rem",
                boxShadow: `0 4px 10px ${
                  item.color === "primary"
                    ? "rgba(14, 165, 233, 0.4)"
                    : "rgba(139, 92, 246, 0.4)"
                }`,
              }}
            >
              {item.icon}
            </Box>
            <Box>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
                fontWeight="600"
                lineHeight={1}
                sx={{ mb: 0.3 }}
              >
                {item.label}
              </Typography>
              <Typography variant="subtitle1" fontWeight="900" lineHeight={1}>
                {item.value}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
