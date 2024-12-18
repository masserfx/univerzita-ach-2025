"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Chip,
  LinearProgress,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import QuizIcon from "@mui/icons-material/Quiz";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";

interface Chapter {
  id: string;
  title: string;
  description: string;
  type: "video" | "text" | "quiz";
  duration: number;
  completed?: boolean;
}

interface ModuleDetail {
  id: string;
  title: string;
  description: string;
  type: "technical" | "business" | "process";
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  progress: number;
  chapters: Chapter[];
}

// Mock data - v produkci by byla načítána z API
const mockModuleDetail: ModuleDetail = {
  id: "tc-basic",
  title: "Základy tepelných čerpadel",
  description: "Úvod do principů fungování tepelných čerpadel a jejich využití v praxi.",
  type: "technical",
  level: "beginner",
  duration: 120,
  progress: 30,
  chapters: [
    {
      id: "ch1",
      title: "Úvod do tepelných čerpadel",
      description: "Základní principy a typy tepelných čerpadel.",
      type: "video",
      duration: 15,
      completed: true,
    },
    {
      id: "ch2",
      title: "Princip fungování",
      description: "Detailní vysvětlení funkce tepelného čerpadla.",
      type: "text",
      duration: 20,
      completed: true,
    },
    {
      id: "ch3",
      title: "Test znalostí - Základy",
      description: "Ověření pochopení základních principů.",
      type: "quiz",
      duration: 10,
    },
    {
      id: "ch4",
      title: "Typy tepelných čerpadel",
      description: "Přehled různých typů a jejich využití.",
      type: "video",
      duration: 25,
    },
    {
      id: "ch5",
      title: "Praktické aplikace",
      description: "Reálné příklady instalací a použití.",
      type: "text",
      duration: 30,
    },
  ],
};

const getContentTypeIcon = (type: Chapter["type"]) => {
  switch (type) {
    case "video":
      return <PlayCircleOutlineIcon />;
    case "text":
      return <DescriptionIcon />;
    case "quiz":
      return <QuizIcon />;
  }
};

const getContentTypeLabel = (type: Chapter["type"]) => {
  switch (type) {
    case "video":
      return "Video";
    case "text":
      return "Text";
    case "quiz":
      return "Test";
  }
};

export default function ModuleContent() {
  const [activeStep, setActiveStep] = useState(0);
  const moduleData = mockModuleDetail;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box>
      {/* Module Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {moduleData.title}
            </Typography>
            <Typography color="text.secondary" paragraph>
              {moduleData.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Chip
                icon={<AccessTimeIcon />}
                label={`${moduleData.duration} minut`}
                variant="outlined"
              />
              <Chip
                label={`${moduleData.progress}% dokončeno`}
                color="primary"
                variant="outlined"
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={moduleData.progress}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>

          {/* Chapter List */}
          <Typography variant="h6" gutterBottom>
            Obsah modulu
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            {moduleData.chapters.map((chapter, index) => (
              <Step key={chapter.id}>
                <StepLabel
                  optional={
                    <Typography variant="caption">
                      {chapter.duration} min
                    </Typography>
                  }
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {chapter.title}
                    <Chip
                      label={getContentTypeLabel(chapter.type)}
                      size="small"
                      icon={getContentTypeIcon(chapter.type)}
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography>{chapter.description}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === moduleData.chapters.length - 1
                        ? "Dokončit"
                        : "Pokračovat"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Zpět
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === moduleData.chapters.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>Gratulujeme k dokončení modulu!</Typography>
              <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, mr: 1 }}>
                Začít znovu
              </Button>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
