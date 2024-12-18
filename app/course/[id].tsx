import { notFound } from "next/navigation";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const courses = {
  "1": {
    id: 1,
    nazev: "Úvod do programování",
    popis: "Základní kurz programování pro začátečníky.",
    lekce: [
      "Instalace vývojového prostředí",
      "Proměnné a datové typy",
      "Podmínky a cykly",
    ],
  },
  "2": {
    id: 2,
    nazev: "Základy JavaScriptu",
    popis: "Naučte se základy JavaScriptu a jeho použití ve webových aplikacích.",
    lekce: [
      "Syntaxe JavaScriptu",
      "Práce s DOM",
      "Funkce a objekty",
    ],
  },
  "3": {
    id: 3,
    nazev: "React pro začátečníky",
    popis: "Získejte základní znalosti frameworku React a jeho použití pro tvorbu moderních webových aplikací.",
    lekce: [
      "Komponenty",
      "Props a State",
      "JSX",
    ],
  },
};

interface Props {
  params: {
    id: string;
  };
}

export default async function CourseDetail({ params }: Props) {
  // Verify authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const course = courses[params.id as keyof typeof courses];
  if (!course) {
    notFound();
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {course.nazev}
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          gutterBottom 
          sx={{ 
            color: "text.secondary",
            mb: 4 
          }}
        >
          {course.popis}
        </Typography>

        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom
          sx={{ 
            mt: 4,
            borderBottom: 1,
            borderColor: "divider",
            pb: 1
          }}
        >
          Obsah kurzu:
        </Typography>

        <List>
          {course.lekce.map((lekce, index) => (
            <ListItem 
              key={index}
              sx={{
                borderLeft: 2,
                borderColor: "primary.main",
                pl: 2,
                mb: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
              <ListItemText 
                primary={`${index + 1}. ${lekce}`}
                primaryTypographyProps={{
                  fontWeight: index === 0 ? 'medium' : 'regular'
                }}
              />
            </ListItem>
          ))}
        </List>

        {session.user?.role === "admin" && (
          <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="subtitle2" color="primary">
              Administrátorská sekce
            </Typography>
            <Typography variant="body2">
              Zde můžete spravovat obsah kurzu a přidávat nové lekce.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
