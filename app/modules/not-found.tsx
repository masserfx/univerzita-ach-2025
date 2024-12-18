import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Breadcrumbs,
} from "@mui/material";
import Link from "next/link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ModuleNotFound() {
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
            href="/modules"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Moduly
          </Link>
          <Typography color="text.primary">Modul nenalezen</Typography>
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
        <ErrorOutlineIcon
          sx={{ fontSize: 64, color: "error.main", mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Modul nenalezen
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600 }}
        >
          Omlouváme se, ale požadovaný vzdělávací modul nebyl nalezen. Modul mohl
          být přesunut nebo odstraněn.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            href="/modules"
            variant="contained"
            color="primary"
          >
            Zpět na přehled modulů
          </Button>
          <Button
            component={Link}
            href="/"
            variant="outlined"
          >
            Přejít na úvodní stránku
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
