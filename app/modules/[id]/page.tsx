import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Paper,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import ModuleContent from "../../../components/modules/ModuleContent";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

// Mock function to validate module ID - v produkci by byla nahrazena API voláním
const isValidModuleId = (id: string) => {
  const validIds = ["tc-basic", "sales-skills", "pv-systems", "service-process", "energy-efficiency", "customer-care"];
  return validIds.includes(id);
};

export default async function ModuleDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (!isValidModuleId(params.id)) {
    notFound();
  }

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
          borderColor: "divider"
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
          <Typography color="text.primary">Detail modulu</Typography>
        </Breadcrumbs>
      </Paper>

      {/* Module Content */}
      <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
        <ModuleContent />
      </Box>
    </Container>
  );
}
