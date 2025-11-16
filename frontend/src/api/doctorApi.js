import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// today appointments
export const getTodayAppointments = (doctorId) =>
  API.get("/doctor/today-appointments", { params: { doctorId } });

// patient history
export const getPatientHistory = (patientId) =>
  API.get(`/doctor/patient-history/${patientId}`);

// consultation
export const getConsultation = (appointmentId) =>
  API.get(`/doctor/consultation/${appointmentId}`);

// save/update
export const saveConsultation = (appointmentId, data) =>
  API.put(`/doctor/consultation/${appointmentId}`, data);

// complete appointment
export const completeAppointment = (appointmentId) =>
  API.put(`/doctor/complete/${appointmentId}`);
