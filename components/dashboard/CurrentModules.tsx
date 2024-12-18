"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  LinearProgress,
  Chip,
} from "@mui/material";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  duration: number;
  type: "technical" | "business" | "process";
  lastAccessed?: string;
}

// Mock data - v produkci by byla načítána z API
const mockCurrentModules: Module[] = [
  {
    id: "1",
    title: "Základy tepelných čerpadel",
    description: "Seznámení s principy fungování tepelných čerpadel",
    progress: 75,
    duration: 120,
    type: "technical",
    lastAccessed: "2024-01-19",
  },
  {
    id: "2",
    title: "Prodejní dovednosti",
    description: "Efektivní techniky prodeje a komunikace se zákazníkem",
    progress: 30,
    duration: 90,
    type: "business",
    lastAccessed: "2024-01-20",
  },
  {
    id: "3",
    title: "Fotovoltaické systémy",
    description: "Komplexní přehled fotovoltaických systémů",
    progress: 0,
    duration: 150,
    type: "technical",
  },
];

const getModuleTypeColor = (type: Module["type"]) => {
  switch (type) {
    case "technical":
      return "primary";
    case "business":
      return "success";
    case "process":
      return "warning";
    default:
      return "default";
  }
};

const getModuleTypeLabel = (type: Module["type"]) => {
  switch (type) {
    case "technical":
      return "Technický";
    case "business":
      return "Obchodní";
    case "process":
      return "Procesní";
    default:
      return type;
  }
};

export default function CurrentModules() {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Aktuální moduly</Typography>
        <Button
          component={Link}
          href="/modules"
          color="primary"
          endIcon={<PlayArrowIcon />}
        >
          Všechny moduly
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockCurrentModules.map((module) => (
          <Grid item xs={12} md={4} key={module.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Chip
                    label={getModuleTypeLabel(module.type)}
                    color={getModuleTypeColor(module.type)}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  {module.lastAccessed && (
                    <Typography variant="caption" color="text.secondary">
                      Naposledy: {new Date(module.lastAccessed).toLocaleDateString("cs-CZ")}
                    </Typography>
                  )}
                </Box>

                <Typography variant="h6" gutterBottom>
                  {module.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {module.description}
                </Typography>

                <Box sx={{ mt: "auto" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                      }}
                    >
                      <AccessTimeIcon
                        fontSize="small"
                        sx={{ mr: 0.5 }}
                      />
                      <Typography variant="caption">
                        {module.duration} min
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: "auto" }}
                    >
                      {module.progress}% dokončeno
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={module.progress}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    component={Link}
                    href={`/modules/${module.id}`}
                    variant={module.progress > 0 ? "outlined" : "contained"}
                    fullWidth
                    startIcon={
                      module.progress > 0 ? (
                        <PlayArrowIcon />
                      ) : (
                        <BookmarkIcon />
                      )
                    }
                  >
                    {module.progress > 0
                      ? "Pokračovat"
                      : "Začít modul"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
