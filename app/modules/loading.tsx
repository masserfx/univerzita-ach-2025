import {
  Container,
  Box,
  Skeleton,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function ModulesLoading() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs Skeleton */}
      <Skeleton
        variant="rectangular"
        width={300}
        height={30}
        sx={{ mb: 3 }}
      />

      {/* Header Skeletons */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton variant="text" width="60%" height={24} />
      </Box>

      {/* Filters Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
        </Grid>
      </Box>

      {/* Module Cards Skeleton */}
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <Skeleton variant="rectangular" width={80} height={24} />
                    <Skeleton variant="rectangular" width={80} height={24} />
                  </Box>
                  <Skeleton variant="text" width="80%" height={32} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="90%" />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Skeleton variant="text" width={80} />
                    <Skeleton variant="text" width={80} />
                  </Box>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={4}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={36}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
