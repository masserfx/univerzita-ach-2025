import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import QuizIcon from "@mui/icons-material/Quiz";
import TimerIcon from "@mui/icons-material/Timer";
import GradeIcon from "@mui/icons-material/Grade";

interface Props {
  params: {
    id: string;
  };
}

// Mock data - v produkci by byla načítána z API
const mockTest = {
  id: "tc-basic-quiz",
  title: "Základy tepelných čerpadel - Test",
  description: "Teoretický test ověřující znalosti principů tepelných čerpadel",
  type: "theoretical",
  difficulty: "beginner",
  duration: 30,
  passScore: 70,
  questions: [
    {
      id: "q1",
      text: "Jaký je hlavní princip fungování tepelného čerpadla?",
      options: [
        "Přeměna elektrické energie na teplo",
        "Přenos tepla z chladnějšího místa na teplejší",
        "Spalování fosilních paliv",
        "Využití solární energie",
      ],
      correctAnswer: 1,
    },
    {
      id: "q2",
      text: "Co je to COP (Coefficient of Performance)?",
      options: [
        "Celková optimalizace provozu",
        "Poměr mezi získanou energií a spotřebovanou energií",
        "Certifikát optimálního provozu",
        "Kontrola operačního procesu",
      ],
      correctAnswer: 1,
    },
    {
      id: "q3",
      text: "Který typ tepelného čerpadla je nejběžnější v ČR?",
      options: [
        "Vzduch-voda",
        "Země-voda",
        "Voda-voda",
        "Vzduch-vzduch",
      ],
      correctAnswer: 0,
    },
  ],
};

export default async function TestDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // V produkci by zde bylo API volání pro získání detailu testu
  if (params.id !== mockTest.id) {
    notFound();
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Domů
          </Link>
          <Link
            href="/tests"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Testy
          </Link>
          <Typography color="text.primary">Detail testu</Typography>
        </Breadcrumbs>
      </Box>

      {/* Test Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <QuizIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
              <Typography variant="h4">{mockTest.title}</Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {mockTest.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Chip
                label={mockTest.type === "theoretical" ? "Teoretický" : "Praktický"}
                color="primary"
              />
              <Chip
                label={
                  mockTest.difficulty === "beginner"
                    ? "Začátečník"
                    : mockTest.difficulty === "intermediate"
                    ? "Pokročilý"
                    : "Expert"
                }
                variant="outlined"
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TimerIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        Doba trvání
                      </Typography>
                    </Box>
                    <Typography variant="h6">{mockTest.duration} minut</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <GradeIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        Minimální skóre
                      </Typography>
                    </Box>
                    <Typography variant="h6">{mockTest.passScore}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <QuizIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        Počet otázek
                      </Typography>
                    </Box>
                    <Typography variant="h6">{mockTest.questions.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            Test můžete kdykoliv přerušit a později se k němu vrátit. Pro získání
            certifikátu je nutné dosáhnout minimálního skóre {mockTest.passScore}%.
          </Alert>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href={`/tests/${mockTest.id}/start`}
            >
              Začít test
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Test Preview */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ukázka otázek
          </Typography>
          <Typography color="text.secondary" paragraph>
            Zde je náhled několika otázek z testu. Skutečný test může obsahovat
            jiné otázky.
          </Typography>

          {mockTest.questions.slice(0, 1).map((question, index) => (
            <Box key={question.id} sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Otázka {index + 1}: {question.text}
              </Typography>
              <FormControl component="fieldset" sx={{ ml: 2 }}>
                <RadioGroup>
                  {question.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={optionIndex.toString()}
                      control={<Radio disabled />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}

          <Alert severity="warning">
            Toto je pouze ukázka. V reálném testu budou otázky v náhodném pořadí
            a s časovým limitem.
          </Alert>
        </CardContent>
      </Card>
    </Container>
  );
}
