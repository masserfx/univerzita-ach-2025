import { Container, Typography, Box, Breadcrumbs } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import ModuleGrid from "../../components/modules/ModuleGrid";
import Link from "next/link";

export default async function ModulesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Domů
        </Link>
        <Typography color="text.primary">Moduly</Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Vzdělávací moduly
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Prozkoumejte naše vzdělávací moduly zaměřené na technologie tepelných
          čerpadel a fotovoltaiky. Vyberte si z technických, obchodních a
          procesních kurzů.
        </Typography>
      </Box>

      {/* Module Grid */}
      <ModuleGrid />
    </Container>
  );
}
