import React from 'react'
import { FaUsers } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineGeneratingTokens } from "react-icons/md";

const ReceptionPageTitle = () => {
  return (
    <div className="dashboard-title">
            <h4 className='mt-5 mb-5'>Dashboard</h4>
            <div className="container-fluid">
                <div className="header-body">
                  <div className="row">
                    <div className="col-xl-3 col-lg-6">
                      <div className="card card-stats mb-4 mb-xl-0">
                        <div className="card-body">
                          <div className="row">
                            <div className="col">
                              <h5 className="card-title text-uppercase text-muted">Booking</h5>
                              <span className="h2 font-weight-bold mb-0">32</span>
                            </div>
                            <div className="col-auto">
                              <div className="icon-shape bg-danger text-white shadow">
                                <SlCalender />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <div className="card card-stats mb-4 mb-xl-0">
                        <div className="card-body">
                          <div className="row">
                            <div className="col">
                              <h5 className="card-title text-uppercase text-muted">Doctors</h5>
                              <span className="h2 font-weight-bold mb-0">27</span>
                            </div>
                            <div className="col-auto">
                              <div className="icon-shape bg-warning text-white shadow">
                                <FaUserDoctor/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <div className="card card-stats mb-4 mb-xl-0">
                        <div className="card-body">
                          <div className="row">
                            <div className="col">
                              <h5 className="card-title text-uppercase text-muted">Patients</h5>
                              <span className="h2 font-weight-bold">49</span>
                            </div>
                            <div className="col-auto">
                              <div className="icon-shape bg-success text-white shadow">
                                <FaUsers/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <div className="card card-stats mb-4 mb-xl-0">
                        <div className="card-body">
                          <div className="row">
                            <div className="col">
                              <h5 className="card-title text-uppercase text-muted">Tokens</h5>
                              <span className="h2 font-weight-bold">49</span>
                            </div>
                            <div className="col-auto">
                              <div className="icon icon-shape bg-info text-white shadow">
                                <MdOutlineGeneratingTokens/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
  )
}

export default ReceptionPageTitle
