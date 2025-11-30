import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosinterceptor";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import Button from "../../components/Button";

const ViewBill = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axiosInstance.get(`/billing/${id}`);
        setBill(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch bill");
      }
    };
    fetchBill();
  }, [id]);

  if (!bill) return <p>Loading...</p>;
  console.log(bill)
const printBill = () => {
  window.print();
};

  return (
 <div className="main-container">
      <Sidebar />

      <div className="main">
        <div className="container mt-4">
          <div
            style={{
              width: "90%",
              margin: "auto",
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "5px" }}>
              MEDICAL OPD INVOICE
            </h2>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
              City Hospital, Kerala | Phone: +91 000-4444-2222
            </p>
            <hr />

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <p><strong>Bill ID:</strong> {bill._id}</p>
              <p><strong>Date:</strong> {new Date(bill.createdAt).toDateString()}</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              <div>
                <h3 style={{ marginBottom: "10px" }}>Patient Details</h3>
                <p><strong>Name:</strong> {bill.patientId.name}</p>
                <p><strong>OPD ID:</strong> {bill.opdId}</p>
                <p><strong>Mobile:</strong> {bill.patientId.contact_number}</p>
              </div>

              <div>
                <h3 style={{ marginBottom: "10px" }}>Doctor Details</h3>
                <p><strong>Name:</strong> {bill.doctorId.name}</p>
              </div>
            </div>

            <hr />

            <h3 style={{ marginTop: "20px" }}>Charges</h3>
            <table
              style={{
                width: "100%",
                marginTop: "10px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={tableHeader}>Description</th>
                  <th style={tableHeader}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tableCell}>Consultation Fee</td>
                  <td style={tableCell}>{bill.consultation_fee}</td>
                </tr>

                {bill.additional_charges?.map((c, i) => (
                  <tr key={i}>
                    <td style={tableCell}>{c.name}</td>
                    <td style={tableCell}>{c.amount}</td>
                  </tr>
                ))}

                <tr>
                  <td style={tableCell}>Discount</td>
                  <td style={tableCell}>- {bill.discount}</td>
                </tr>
              </tbody>
            </table>

            <div
              style={{
                marginTop: "30px",
                textAlign: "right",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Total Amount: ₹{bill.total_amount}
            </div>

            <hr />

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Thank you for visiting! Wishing you good health.
            </p>
            <div className="d-flex justify-content-center pt-3"><Button btnHandler={printBill}>Print</Button></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const tableHeader = {
  padding: "10px",
  borderBottom: "1px solid #ccc",
  textAlign: "left",
};

const tableCell = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default ViewBill;
