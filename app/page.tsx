import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import ProgressOverview from "../components/dashboard/ProgressOverview";
import CurrentModules from "../components/dashboard/CurrentModules";
import PlatformBenefits from "../components/dashboard/PlatformBenefits";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Banner */}
      <WelcomeBanner />

      {/* Progress Overview */}
      <ProgressOverview />

      {/* Current Modules */}
      <CurrentModules />

      {/* Platform Benefits */}
      <PlatformBenefits />
    </Container>
  );
}
