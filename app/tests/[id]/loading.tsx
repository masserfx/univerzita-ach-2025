import {
  Container,
  Box,
  Skeleton,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

export default function TestDetailLoading() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={300} height={24} />
      </Box>

      {/* Test Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Skeleton
                variant="circular"
                width={48}
                height={48}
                sx={{ mr: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={32} />
              </Box>
            </Box>
            <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Skeleton variant="rounded" width={100} height={24} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="40%" height={32} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="40%" height={32} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="40%" height={32} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Test Content */}
      <Card>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
            {[1, 2, 3].map((index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    sx={{ mr: 2 }}
                  />
                  <Skeleton variant="text" width="50%" height={24} />
                </Box>
                <Box sx={{ pl: 6 }}>
                  <Skeleton variant="text" width="90%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    {[1, 2, 3, 4].map((option) => (
                      <Grid item xs={12} key={option}>
                        <Skeleton
                          variant="rectangular"
                          height={48}
                          sx={{ borderRadius: 1 }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <Skeleton variant="rectangular" width={120} height={40} />
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
