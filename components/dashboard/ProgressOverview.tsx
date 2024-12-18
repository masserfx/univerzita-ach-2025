"use client";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSession } from "next-auth/react";

interface ProgressStats {
  completedModules: number;
  totalModules: number;
  certificates: number;
  streak: number;
  lastActivity: string;
  recentAchievements: {
    title: string;
    date: string;
    type: "certificate" | "completion" | "achievement";
  }[];
}

// Mock data - v produkci by byla načítána z API
const mockProgressStats: ProgressStats = {
  completedModules: 8,
  totalModules: 15,
  certificates: 3,
  streak: 5,
  lastActivity: "2024-01-20",
  recentAchievements: [
    {
      title: "Certifikát: Základy tepelných čerpadel",
      date: "2024-01-18",
      type: "certificate",
    },
    {
      title: "Dokončen modul: Fotovoltaické systémy",
      date: "2024-01-15",
      type: "completion",
    },
    {
      title: "Získáno ocenění: 5 dní v řadě",
      date: "2024-01-20",
      type: "achievement",
    },
  ],
};

export default function ProgressOverview() {
  const { data: session } = useSession();
  const progress = mockProgressStats;

  const getProgressColor = (percent: number) => {
    if (percent >= 75) return "success";
    if (percent >= 50) return "primary";
    if (percent >= 25) return "warning";
    return "error";
  };

  const completionPercentage = Math.round(
    (progress.completedModules / progress.totalModules) * 100
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Váš pokrok
      </Typography>
      <Grid container spacing={3}>
        {/* Progress Overview Cards */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        variant="determinate"
                        value={completionPercentage}
                        size={80}
                        color={getProgressColor(completionPercentage)}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="caption" component="div">
                          {completionPercentage}%
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Celkový pokrok
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Dokončené moduly
                    </Typography>
                    <Typography variant="h6">
                      {progress.completedModules} z {progress.totalModules}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={completionPercentage}
                      color={getProgressColor(completionPercentage)}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Chip
                      icon={<EmojiEventsIcon />}
                      label={`${progress.certificates} certifikátů`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={`${progress.streak} dní v řadě`}
                      color="secondary"
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Achievements */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Nedávné úspěchy
              </Typography>
              <Timeline>
                {progress.recentAchievements.map((achievement, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot
                        color={
                          achievement.type === "certificate"
                            ? "success"
                            : achievement.type === "completion"
                            ? "primary"
                            : "secondary"
                        }
                      >
                        {achievement.type === "certificate" ? (
                          <EmojiEventsIcon />
                        ) : achievement.type === "completion" ? (
                          <SchoolIcon />
                        ) : (
                          <TrendingUpIcon />
                        )}
                      </TimelineDot>
                      {index < progress.recentAchievements.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2">{achievement.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(achievement.date).toLocaleDateString("cs-CZ")}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
