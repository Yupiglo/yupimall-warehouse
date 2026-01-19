"use client";

import {
  Box,
  Typography,
  Stack,
  useTheme,
  Chip,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { mockProducts } from "@/data/mocks/products";

const data = mockProducts.map((item, index) => ({
  ...item,
  label: String.fromCharCode(65 + index), // A, B, C, ...
}));

export default function ProductChartMui() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        pb: 3,
        pr: 3,
      }}
    >
      {/* Chart Section */}
      <Box sx={{ flexGrow: 1, width: "100%", minHeight: 400 }}>
        <BarChart
          dataset={data}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "label",
              tickLabelStyle: {
                fill: theme.palette.text.secondary,
                fontSize: 12,
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
              valueFormatter: (value) => `${value} units`,
            },
          ]}
          height={400}
          slotProps={{
            legend: {
              hidden: true,
            } as any,
          }}
          colors={data.map((d) => d.color)}
          margin={{ top: 40, bottom: 20, left: 0, right: 0 }}
          sx={{
            "& .MuiBarElement-root": {
              rx: 4,
            },
          }}
        />
      </Box>

      {/* Legend Section */}
      <Box sx={{ mt: 0, pt: 1, borderTop: 1, borderColor: "divider" }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2}>
          {data.map((item) => (
            <Stack
              key={item.name}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Chip
                label={item.label}
                size="small"
                sx={{ height: 20, fontSize: "0.7rem", fontWeight: "bold" }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="medium"
              >
                {item.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
