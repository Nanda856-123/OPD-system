import React from "react";
import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Box sx={{ display: "flex" }}>

      {/* Main Content */}
<Box sx={{ flexGrow: 1, padding: 4 }}>
  <Typography variant="h4" fontWeight={700} mb={4}>
    Admin Dashboard
  </Typography>

  <Grid
    container
    spacing={4}
    justifyContent="center"
    alignItems="center"
  >
    {/* Departments */}
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ height: "320px",width: "320px",
 display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Departments
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/admin/departments"
            sx={{ mt: 2 }}
            fullWidth
          >
            Manage Departments
          </Button>
        </CardContent>
      </Card>
    </Grid>

    {/* Doctors */}
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ height: "320px",width: "320px",
 display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Doctors
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/admin/doctors"
            sx={{ mt: 2 }}
            fullWidth
          >
            Manage Doctors
          </Button>
        </CardContent>
      </Card>
    </Grid>

    {/* Schedules */}
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ height: "320px",width: "320px",
 display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Schedules
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/admin/schedules"
            sx={{ mt: 2 }}
            fullWidth
          >
            Manage Schedules
          </Button>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>

    </Box>
  );
}
