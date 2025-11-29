import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./DoctorDashboard.css";
import ReceptionPageTitle from "../../components/ReceptionPageTitle";

export default function DoctorLayout() {
  return (
    <div className="main-container">
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={true} />

      {/* Main Content */}
      <div className="main">
        {/* <ReceptionPageTitle/> */}
        <div className="main-content">
          <Outlet />
          
        </div>
      </div>

    </div>
  );
}
