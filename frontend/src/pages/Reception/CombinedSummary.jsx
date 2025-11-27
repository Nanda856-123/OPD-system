import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Table, TableBody, TableRow, TableCell, TableContainer, Paper} from '@mui/material';
import Sidebar from './Sidebar'; 
import Button from '../../components/Button';

const CombinedSummary = () => {
  const { state } = useLocation();
  // state should include patient and appointment from backend response
  const { patient, appointment } = state || {};

  return (
    <div className="main-container">
      <Sidebar />
      <div className="main inner-page">
        <div className="container">
          <Typography variant="h4" sx={{ mb: 2 }}>Registration & Appointment Summary</Typography>

          <div style={{ marginBottom: 20 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Patient Details</Typography>
                <TableContainer component={Paper} sx={{ mt: 1 }}>
                  <Table>
                    <TableBody>
                      <TableRow><TableCell>Name</TableCell><TableCell>{patient?.name}</TableCell></TableRow>
                      <TableRow><TableCell>OPD ID</TableCell><TableCell>{patient?.opd_id}</TableCell></TableRow>
                      <TableRow><TableCell>Email</TableCell><TableCell>{patient?.email}</TableCell></TableRow>
                      <TableRow><TableCell>Age</TableCell><TableCell>{patient?.age}</TableCell></TableRow>
                      <TableRow><TableCell>Gender</TableCell><TableCell>{patient?.gender}</TableCell></TableRow>
                      <TableRow><TableCell>Contact</TableCell><TableCell>{patient?.contact_number}</TableCell></TableRow>
                      <TableRow><TableCell>Address</TableCell><TableCell>{patient?.address}</TableCell></TableRow>
                      <TableRow><TableCell>Registered Date</TableCell><TableCell>{new Date(patient?.registered_date).toLocaleString()}</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent>
                <Typography variant="h6">Appointment Details</Typography>
                <TableContainer component={Paper} sx={{ mt: 1 }}>
                  <Table>
                    <TableBody>
                      <TableRow><TableCell>Doctor</TableCell><TableCell>{appointment?.doctor_id?.name || appointment?.doctor_id}</TableCell></TableRow>
                      <TableRow><TableCell>Appointment Date</TableCell><TableCell>{appointment?.appointment_date ? new Date(appointment.appointment_date).toLocaleDateString() : ''}</TableCell></TableRow>
                      <TableRow><TableCell>Time Slot</TableCell><TableCell>{appointment?.time_slot}</TableCell></TableRow>
                      <TableRow><TableCell>Token Number</TableCell><TableCell>{appointment?.token_number}</TableCell></TableRow>
                      <TableRow><TableCell>Status</TableCell><TableCell>{appointment?.status}</TableCell></TableRow>
                      <TableRow><TableCell>Created At</TableCell><TableCell>{appointment?.createdAt ? new Date(appointment.createdAt).toLocaleString() : ''}</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>

         {/*  <div style={{ marginTop: 20 }}>
            <Button variant="contained" component={Link} to="/patients" sx={{ mr: 2 }}>View Patients</Button>
            <Button variant="outlined" component={Link} to="/appointments">View Appointments</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CombinedSummary;
