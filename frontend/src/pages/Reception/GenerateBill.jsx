import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinterceptor";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import Button from "../../components/Button";
import { IoArrowBack } from "react-icons/io5";

const GenerateBill = () => {
  const { appointmentId } = useParams(); // get appointmentId from URL
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [consultationFee, setConsultationFee] = useState(300);
  const [additionalCharges, setAdditionalCharges] = useState([
    { name: "", amount: "" },
  ]);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axiosInstance.get(`/appointments/${appointmentId}`);
        setAppointment(res.data);
        setConsultationFee(res.data.consultation_fee || 300);
        setLoading(false);
      } catch (err) {
        console.log(err)
        toast.error("Failed to fetch appointment");
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [appointmentId]);

  // Calculate total amount
  useEffect(() => {
    let total = Number(consultationFee);
    additionalCharges.forEach((item) => {
      total += Number(item.amount || 0);
    });
    total -= Number(discount || 0);
    setTotalAmount(total);
  }, [consultationFee, additionalCharges, discount]);

  if (loading) return <p>Loading...</p>;
  if (!appointment) return <h3 style={{ padding: 30 }}>Invalid Appointment</h3>;

  // Add, update, remove charges
  const addChargeRow = () =>
    setAdditionalCharges([...additionalCharges, { name: "", amount: "" }]);
  const updateCharge = (index, field, value) => {
    const updated = [...additionalCharges];
    updated[index][field] = value;
    setAdditionalCharges(updated);
  };
  const removeCharge = (index) => {
    const updated = [...additionalCharges];
    updated.splice(index, 1);
    setAdditionalCharges(updated);
  };

  // Save bill
  const saveBillHandler = async () => {
    if(consultationFee<300) return toast.error("current minimum consultation charge is 300")
    const payload = {
      opdId: appointment.patient_id?.opd_id,
      patientId: appointment.patient_id?._id,
      doctorId: appointment.doctor_id?._id,
      appointmentId: appointment._id,
      consultation_fee: Number(consultationFee),
      additional_charges: additionalCharges.filter((c) => c.name && c.amount),
      discount: Number(discount),
      total_amount: totalAmount,
      payment_status: "unpaid",
    //   created_by: user._id,
    };
    console.log(payload)
    try {
      await axiosInstance.post("/billing/create", payload);
      toast.success("Bill generated successfully!");
      navigate("/appointments");
    } catch (err) {
      toast.error("Failed to generate bill");
      console.error(err);
    }
  };

  return (
    <div className="main-container">
      <Sidebar />
      <div className="main">
        <div className="dashboard-title d-flex justify-content-center pt-5">
          <h2>Generate Bill</h2>
        </div>
        <div className="container">
          <div className=" p-4 m-4">
            <div className="card w-75  m-auto mb-5">
            <h4 className="mb-3 ">Appointment Details</h4>
              <p className="mb-2">
                <strong>OPD ID:</strong> {appointment.patient_id?.opd_id}
              </p>
              <p className="mb-2">
                <strong>Patient Name:</strong> {appointment.patient_id?.name}
              </p>
              <p className="mb-2">
                <strong>Doctor:</strong> {appointment.doctor_id?.name}
              </p>
              <p>
                <strong>Date:</strong> {appointment.appointment_date}
              </p>
            </div>

            <div className="card w-75  m-auto">
              <h4 className="mb-3">Billing Details</h4>
              <div className="mb-3">
                <label>Consultation Fee</label>
                <input
                  type="number"
                  className="form-control"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Additional Charges</label>
                {additionalCharges.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex mb-2"
                    style={{ gap: "10px", alignItems: "center" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Charge Name"
                      value={item.name}
                      onChange={(e) =>
                        updateCharge(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      value={item.amount}
                      onChange={(e) =>
                        updateCharge(index, "amount", e.target.value)
                      }
                    />
                    {index > 0 && (
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCharge(index)}
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <Button onClick={addChargeRow}>+ Add Charge</Button>
              </div>

              <div className="mb-3">
                <label>Discount</label>
                <input
                  type="number"
                  className="form-control"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>
            <h4 className="text-center mt-3">Total Amount: ₹{totalAmount}</h4>

            <div className="text-center mt-3">
              <Button className="mt-3" btnHandler={saveBillHandler}>
                Save Bill
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateBill;
