import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Breadcrumbs,
} from "@mui/material";
import Link from "next/link";
import QuizIcon from "@mui/icons-material/Quiz";

export default function TestNotFound() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: "background.default",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
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
          <Typography color="text.primary">Test nenalezen</Typography>
        </Breadcrumbs>
      </Paper>

      {/* Error Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          textAlign: "center",
        }}
      >
        <QuizIcon
          sx={{ fontSize: 64, color: "error.main", mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Test nenalezen
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600 }}
        >
          Omlouváme se, ale požadovaný test nebyl nalezen. Test mohl být přesunut,
          odstraněn nebo ještě není k dispozici.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            href="/tests"
            variant="contained"
            color="primary"
          >
            Zpět na přehled testů
          </Button>
          <Button
            component={Link}
            href="/modules"
            variant="outlined"
          >
            Prozkoumat moduly
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
