import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import QuizIcon from "@mui/icons-material/Quiz";
import CertificateIcon from "@mui/icons-material/CardMembership";
import AssessmentIcon from "@mui/icons-material/Assessment";

interface Test {
  id: string;
  title: string;
  description: string;
  type: "theoretical" | "practical";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  passScore: number;
}

interface Certificate {
  id: string;
  title: string;
  moduleId: string;
  issuedDate: string;
  expiryDate?: string;
}

// Mock data - v produkci by byla načítána z API
const mockTests: Test[] = [
  {
    id: "tc-basic-quiz",
    title: "Základy tepelných čerpadel - Test",
    description: "Teoretický test ověřující znalosti principů tepelných čerpadel",
    type: "theoretical",
    difficulty: "beginner",
    duration: 30,
    passScore: 70,
  },
  {
    id: "pv-practical",
    title: "Fotovoltaické systémy - Praktický test",
    description: "Praktické řešení instalace a konfigurace fotovoltaického systému",
    type: "practical",
    difficulty: "intermediate",
    duration: 60,
    passScore: 80,
  },
];

const mockCertificates: Certificate[] = [
  {
    id: "cert-tc-basic",
    title: "Certifikát: Základy tepelných čerpadel",
    moduleId: "tc-basic",
    issuedDate: "2024-01-15",
    expiryDate: "2025-01-15",
  },
];

export default async function TestsAndCertificationsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Domů
          </Link>
          <Typography color="text.primary">Testy a certifikace</Typography>
        </Breadcrumbs>
      </Box>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Testy a certifikace
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Ověřte si své znalosti a získejte profesní certifikáty v oblasti
          tepelných čerpadel a fotovoltaiky.
        </Typography>
      </Box>

      {/* Tests Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Dostupné testy
        </Typography>
        <Grid container spacing={3}>
          {mockTests.map((test) => (
            <Grid item xs={12} md={6} key={test.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <QuizIcon
                      sx={{ mr: 2, color: "primary.main", fontSize: 40 }}
                    />
                    <Typography variant="h6">{test.title}</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {test.description}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip
                      label={
                        test.type === "theoretical" ? "Teoretický" : "Praktický"
                      }
                      color={test.type === "theoretical" ? "primary" : "secondary"}
                      size="small"
                    />
                    <Chip
                      label={
                        test.difficulty === "beginner"
                          ? "Začátečník"
                          : test.difficulty === "intermediate"
                          ? "Pokročilý"
                          : "Expert"
                      }
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">
                      Doba trvání: {test.duration} min
                    </Typography>
                    <Typography variant="body2">
                      Minimální skóre: {test.passScore}%
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    component={Link}
                    href={`/tests/${test.id}`}
                    variant="contained"
                    fullWidth
                  >
                    Začít test
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Certificates Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Vaše certifikáty
        </Typography>
        <Grid container spacing={3}>
          {mockCertificates.map((certificate) => (
            <Grid item xs={12} md={6} key={certificate.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CertificateIcon
                      sx={{ mr: 2, color: "success.main", fontSize: 40 }}
                    />
                    <Typography variant="h6">{certificate.title}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2">
                      Datum vydání: {certificate.issuedDate}
                    </Typography>
                    {certificate.expiryDate && (
                      <Typography variant="body2" color="text.secondary">
                        Platnost do: {certificate.expiryDate}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    component={Link}
                    href={`/modules/${certificate.moduleId}`}
                    variant="outlined"
                    fullWidth
                    startIcon={<AssessmentIcon />}
                  >
                    Zobrazit modul
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {mockCertificates.length === 0 && (
            <Grid item xs={12}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <CertificateIcon
                    sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Zatím nemáte žádné certifikáty
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Dokončete moduly a složte testy, abyste získali certifikáty.
                  </Typography>
                  <Button
                    component={Link}
                    href="/modules"
                    variant="contained"
                  >
                    Prozkoumat moduly
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
