"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  LinearProgress,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import { useState } from "react";

interface Module {
  id: string;
  title: string;
  description: string;
  type: "technical" | "business" | "process";
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  progress?: number;
}

// Mock data - v produkci by byla načítána z API
const mockModules: Module[] = [
  {
    id: "tc-basic",
    title: "Základy tepelných čerpadel",
    description: "Úvod do principů fungování tepelných čerpadel a jejich využití.",
    type: "technical",
    level: "beginner",
    duration: 120,
    progress: 75,
  },
  {
    id: "sales-skills",
    title: "Prodejní dovednosti",
    description: "Efektivní techniky prodeje a komunikace se zákazníkem.",
    type: "business",
    level: "intermediate",
    duration: 90,
    progress: 30,
  },
  {
    id: "pv-systems",
    title: "Fotovoltaické systémy",
    description: "Komplexní přehled fotovoltaických systémů a jejich instalace.",
    type: "technical",
    level: "advanced",
    duration: 150,
  },
  {
    id: "service-process",
    title: "Servisní procesy",
    description: "Standardy a postupy pro servis a údržbu zařízení.",
    type: "process",
    level: "intermediate",
    duration: 60,
  },
  {
    id: "energy-efficiency",
    title: "Energetická účinnost",
    description: "Optimalizace energetické účinnosti a úspory energie.",
    type: "technical",
    level: "intermediate",
    duration: 180,
  },
  {
    id: "customer-care",
    title: "Péče o zákazníka",
    description: "Strategie pro dlouhodobou péči o zákazníky a budování vztahů.",
    type: "business",
    level: "beginner",
    duration: 90,
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

const getLevelLabel = (level: Module["level"]) => {
  switch (level) {
    case "beginner":
      return "Začátečník";
    case "intermediate":
      return "Pokročilý";
    case "advanced":
      return "Expert";
    default:
      return level;
  }
};

export default function ModuleGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const filteredModules = mockModules.filter((module) => {
    const matchesSearch = module.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || module.type === typeFilter;
    const matchesLevel = levelFilter === "all" || module.level === levelFilter;
    return matchesSearch && matchesType && matchesLevel;
  });

  return (
    <Box>
      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Hledat moduly..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Typ modulu</InputLabel>
              <Select
                value={typeFilter}
                label="Typ modulu"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">Všechny typy</MenuItem>
                <MenuItem value="technical">Technické</MenuItem>
                <MenuItem value="business">Obchodní</MenuItem>
                <MenuItem value="process">Procesní</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Úroveň</InputLabel>
              <Select
                value={levelFilter}
                label="Úroveň"
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <MenuItem value="all">Všechny úrovně</MenuItem>
                <MenuItem value="beginner">Začátečník</MenuItem>
                <MenuItem value="intermediate">Pokročilý</MenuItem>
                <MenuItem value="advanced">Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Module Grid */}
      <Grid container spacing={3}>
        {filteredModules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
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
              <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                    <Chip
                      label={getModuleTypeLabel(module.type)}
                      color={getModuleTypeColor(module.type)}
                      size="small"
                    />
                    <Chip
                      label={getLevelLabel(module.level)}
                      variant="outlined"
                      size="small"
                    />
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
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTimeIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {module.duration} min
                      </Typography>
                    </Box>
                    {module.progress !== undefined && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: "auto" }}
                      >
                        {module.progress}% dokončeno
                      </Typography>
                    )}
                  </Box>

                  {module.progress !== undefined && (
                    <LinearProgress
                      variant="determinate"
                      value={module.progress}
                      sx={{ mb: 2 }}
                    />
                  )}

                  <Button
                    component={Link}
                    href={`/modules/${module.id}`}
                    variant={module.progress ? "outlined" : "contained"}
                    fullWidth
                    startIcon={<PlayArrowIcon />}
                  >
                    {module.progress ? "Pokračovat" : "Začít modul"}
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
