import {
  Container,
  Box,
  Skeleton,
  Paper,
  Card,
  CardContent,
} from "@mui/material";

export default function ModuleDetailLoading() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs Skeleton */}
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
        <Skeleton variant="text" width={300} height={24} />
      </Paper>

      {/* Module Content Skeleton */}
      <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            {/* Module Header */}
            <Box sx={{ mb: 3 }}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Skeleton variant="rectangular" width={120} height={32} />
                <Skeleton variant="rectangular" width={120} height={32} />
              </Box>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={8}
                sx={{ borderRadius: 1 }}
              />
            </Box>

            {/* Chapter List */}
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
            {[1, 2, 3, 4, 5].map((index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    sx={{ mr: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="40%" height={24} />
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Skeleton variant="rectangular" width={80} height={24} />
                      <Skeleton variant="text" width={60} />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ pl: 5 }}>
                  <Skeleton variant="text" width="70%" />
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Skeleton variant="rectangular" width={120} height={36} />
                    <Skeleton variant="rectangular" width={100} height={36} />
                  </Box>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
