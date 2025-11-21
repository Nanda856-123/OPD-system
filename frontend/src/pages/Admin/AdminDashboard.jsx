import React from "react";
import {Box,Typography,Button,Card,CardContent,Grid,} from "@mui/material";
import { Link } from "react-router-dom";
import ReceptionPageTitle from "../../components/ReceptionPageTitle";
import Sidebar from "./Sidebar";
import DoctorCard from "../Reception/DoctorCard";

export default function AdminDashboard() {
  return (
    <div>
      <div className="main-container">
        <Sidebar />
        <div className='main'>
         <ReceptionPageTitle/>
          <div className="main-content">
            <DoctorCard/>
            {/* add dashboard elements here */}
          </div>
        </div>
      </div>
    </div>
  );
}
