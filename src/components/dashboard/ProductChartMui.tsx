"use client";

import {
  Box,
  Typography,
  Stack,
  useTheme,
  Chip,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useOperationalStats } from "@/hooks/useOperationalStats";

export default function ProductChartMui() {
  const theme = useTheme();
  const { data } = useOperationalStats();

  const chartData = data?.ordersByStatus || [];

  if (chartData.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Aucune donnée disponible
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        pb: 2,
        pr: 2,
      }}
    >
      {/* Chart Section */}
      <Box sx={{ flexGrow: 1, width: "100%", minHeight: 200 }}>
        <BarChart
          dataset={chartData}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "label",
              tickLabelStyle: {
                fill: theme.palette.text.secondary,
                fontSize: 10,
                fontWeight: "bold",
              },
            },
          ]}
          yAxis={[
            {
              disableLine: false,
              disableTicks: false,
            },
          ]}
          series={[
            {
              dataKey: "quantity",
              valueFormatter: (value) => `${value}`,
            },
          ]}
          height={200}
          slotProps={{
            legend: {
              hidden: true,
            } as any,
          }}
          colors={chartData.map((d) => d.color)}
          margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
          sx={{
            "& .MuiBarElement-root": {
              rx: 4,
            },
          }}
        />
      </Box>

      {/* Legend Section */}
      <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: "divider" }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1}>
          {chartData.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              alignItems="center"
              spacing={0.5}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: item.color,
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.65rem" }}
              >
                {item.label} ({item.quantity})
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
