"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function WelcomeBanner() {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: { xs: 6, md: 10 },
        borderRadius: 2,
        mb: 4,
        backgroundImage: "linear-gradient(45deg, #1976d2, #2196f3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: "800px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Staňte se odborníky na technologie tepelných čerpadel a fotovoltaiky
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            {session?.user
              ? `Vítejte zpět, ${session.user.name}! Pokračujte ve svém vzdělávání.`
              : "Připojte se k našemu vzdělávacímu programu a rozvíjejte své dovednosti."}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              href="/modules"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                backgroundColor: "white",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "grey.100",
                },
              }}
            >
              Začněte studovat
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/modules/browse"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "grey.100",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Prohlédnout moduly
            </Button>
          </Box>
        </Box>
      </Container>
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          right: -100,
          top: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: 50,
          bottom: -100,
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
      />
    </Box>
  );
}
