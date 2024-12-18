"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import DevicesIcon from "@mui/icons-material/Devices";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const benefits = [
  {
    title: "Odborné vzdělávání",
    description:
      "Získejte hluboké znalosti v oblasti tepelných čerpadel a fotovoltaiky od expertů v oboru.",
    icon: SchoolIcon,
  },
  {
    title: "Flexibilní studium",
    description:
      "Studujte kdykoliv a kdekoliv. Platforma je optimalizována pro všechna zařízení.",
    icon: DevicesIcon,
  },
  {
    title: "Certifikace",
    description:
      "Získejte uznávané certifikáty potvrzující vaše znalosti a dovednosti.",
    icon: EmojiEventsIcon,
  },
  {
    title: "Podpora",
    description:
      "Využijte našeho chatbota a podpory expertů pro zodpovězení vašich dotazů.",
    icon: SupportAgentIcon,
  },
];

export default function PlatformBenefits() {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        O platformě
      </Typography>
      <Grid container spacing={3}>
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        color: "white",
                      }}
                    >
                      <Icon sx={{ fontSize: 30 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontSize: "1.1rem" }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {benefit.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
