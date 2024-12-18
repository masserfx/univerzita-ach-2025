import {
  Container,
  Box,
  Skeleton,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function TestsAndCertificationsLoading() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs Skeleton */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={200} height={24} />
      </Box>

      {/* Page Header Skeletons */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton variant="text" width="60%" height={24} />
      </Box>

      {/* Tests Section */}
      <Box sx={{ mb: 6 }}>
        <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {[1, 2].map((index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  {/* Test Header */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ mr: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="80%" height={28} />
                    </Box>
                  </Box>

                  {/* Test Description */}
                  <Skeleton variant="text" width="100%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="90%" sx={{ mb: 2 }} />

                  {/* Test Tags */}
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Skeleton variant="rounded" width={100} height={24} />
                    <Skeleton variant="rounded" width={100} height={24} />
                  </Box>

                  {/* Test Info */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Skeleton variant="text" width={120} />
                    <Skeleton variant="text" width={120} />
                  </Box>

                  {/* Action Button */}
                  <Skeleton variant="rectangular" height={40} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Certificates Section */}
      <Box>
        <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {[1].map((index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  {/* Certificate Header */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ mr: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="90%" height={28} />
                    </Box>
                  </Box>

                  {/* Certificate Dates */}
                  <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    mb: 3
                  }}>
                    <Skeleton variant="text" width={150} />
                    <Skeleton variant="text" width={150} />
                  </Box>

                  {/* Action Button */}
                  <Skeleton 
                    variant="rectangular" 
                    height={40}
                    sx={{
                      borderRadius: 1
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
