import React, { useState } from 'react'
import './ActivityMonitor.css'
import YellowProfile from '../assets/AdminAssets/YellowBGProfile.png'
import Jobposted from '../assets/AdminAssets/JobPostedAdmin.png'
import BlueProfile from '../assets/AdminAssets/BlueBGProfile.png'
import ActiveEmployers from '../assets/AdminAssets/ActiveEmployers.png'
import SuspAct from '../assets/AdminAssets/SuspAct.png'
import Login from '../assets/AdminAssets/LoginToday.png'
import Interview from '../assets/AdminAssets/InterviewAdmin.png'
import Rejection from '../assets/AdminAssets/Rejection.png'
import GreenProfile from '../assets/AdminAssets/GreenBGProfile.png'
import RedProfile from '../assets/AdminAssets/RedBGProfile.png'
import SupportTicket from '../assets/AdminAssets/SupportTicket.png'
import Msgsent from '../assets/AdminAssets/Msgsent.png'
import EmailsSent from '../assets/AdminAssets/EmailsSent.png'
export const ActivityMonitor = () => {


  const [activeTab, setActiveTab] = useState("AdminMonitor");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [companyData,setCompanyData]  =useState( [
    { id: 1, name: "Info Tech Developer", user: "Jerold Rubin", date: "11 February 2026", certificate: "Yes", verification: "Pending" },
    { id: 2, name: "Tech Innavote", user: "Deepika", date: "9 February 2026", certificate: "Yes", verification: "Pending" },
    { id: 3, name: "Sales Hub", user: "Nancy", date: "15 February 2026", certificate: "No", verification: "Pending" },
    { id: 4, name: "Adhway Creations", user: "Praveen Raj", date: "3 March 2026", certificate: "Yes", verification: "Pending" },
    { id: 5, name: "R.K Global Solution", user: "Lakshmi", date: "9 March 2026", certificate: "No", verification: "Pending" },
    { id: 6, name: "Insite Analytics", user: "Ibrahim", date: "12 March 2026", certificate: "No", verification: "Pending" },
    { id: 7, name: "Digital Solution", user: "Vishnu", date: "15 March 2026", certificate: "Yes", verification: "Pending" },
  ]);
  
  const handleStatusChange = (id, newStatus) => {
    const updatedData = companyData.map((item) =>
      item.id === id ? { ...item, verification: newStatus } : item
    );
    setCompanyData(updatedData);
    setOpenDropdownId(null);
  };

  return (
    <>
      <div style={{ margin: "30px" }}>
        <div>
          <div className="toggle-ActivityMonitor-main">
            <button
              className={`AdminActivity-select ${activeTab === "AdminMonitor" ? "active" : ""}`}
              onClick={() => setActiveTab("AdminMonitor")}
            >
              Admin Monitoring
            </button>
            <button
              className={`AdminActivity-select ${activeTab === "CompanyApproval" ? "active" : ""}`}
              onClick={() => setActiveTab("CompanyApproval")}
            >
              Company Approval
            </button>

          </div>

          {activeTab === "AdminMonitor" && (
            <>
              <p style={{ fontSize: "18px", fontWeight: "500" }}>Admin Activity Monitoring</p>
              <div className='Admin-Monitor-Overview'>
                <div className="admin-card-container">
                  <div className="admin-card-header">

                    <img src={YellowProfile} width={30} alt="New User" />

                    <h3 className="admin-card-title">New User Registrations</h3>
                  </div>

                  <hr className="admin-divider" />

                  <div className="admin-stats-row">
                    <div className="admin-stat-item">
                      <div className="admin-stat-value-group">
                        <span className="admin-stat-number">245</span>
                        <span className="admin-stat-label">Today</span>
                      </div>
                      <div className="admin-progress-bar">
                        <div className="admin-progress-fill admin-bg-green" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="admin-stat-item">
                      <div className="admin-stat-value-group">
                        <span className="admin-stat-number">1820</span>
                        <span className="admin-stat-label">This week</span>
                      </div>
                      <div className="admin-progress-bar">
                        <div className="admin-progress-fill admin-bg-yellow" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="admin-card-container">
                  <div className="admin-card-header">

                    <img src={Jobposted} width={30} alt="New User" />

                    <h3 className="admin-card-title">Job Posted</h3>
                  </div>

                  <hr className="admin-divider" />

                  <div className="admin-stats-row">
                    <div className="admin-stat-item">
                      <div className="admin-stat-value-group">
                        <span className="admin-stat-number">178</span>
                        <span className="admin-stat-label">Today</span>
                      </div>
                      <div className="admin-progress-bar">
                        <div className="admin-progress-fill admin-bg-green" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="admin-stat-item">
                      <div className="admin-stat-value-group">
                        <span className="admin-stat-number">975</span>
                        <span className="admin-stat-label">This week</span>
                      </div>
                      <div className="admin-progress-bar">
                        <div className="admin-progress-fill admin-bg-red" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-card-container">
                  <div className="admin-card-header">
                    <img src={BlueProfile} width={30} alt="New User" />
                    <h3 className="admin-card-title">Total Application</h3>
                  </div>

                  <hr className="admin-divider" />

                  <div className="admin-stats-row">
                    <div className="admin-stat-item">
                      <div className="admin-stat-value-group">
                        <span className="admin-stat-number">1420</span>
                        <span className="admin-stat-label">Today</span>
                      </div>
                      <div className="admin-progress-bar">
                        <div className="admin-progress-fill admin-bg-green" style={{ width: '70%' }}></div>
                      </div>
                    </div>

                    <div className="admin-stat-item">
                      <div className="admin-stat-value-group">
                        <span className="admin-stat-number">975</span>
                        <span className="admin-stat-label">This week</span>
                      </div>
                      <div className="admin-progress-bar">
                        <div className="admin-progress-fill admin-bg-yellow" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-card-container">
                  <div className="admin-card-header">
                    <img src={ActiveEmployers} width={30} alt="New User" />
                    <h3 className="admin-card-title">Active Employers</h3>
                  </div>

                  <hr className="admin-divider" />

                  <div className="admin-stats-row">
                    <div className="admin-stat-item">
                      <div className="admin-stat-value-group">
                        <span className="admin-stat-number">312</span>
                        <span className="admin-stat-label">Today</span>
                      </div>
                      <div className="admin-progress-bar">
                        <div className="admin-progress-fill admin-bg-green" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="admin-stat-item">
                      <div className="admin-stat-value-group">
                        <span className="admin-stat-number">40</span>
                        <span className="admin-stat-label">This week</span>
                      </div>
                      <div className="admin-progress-bar">
                        <div className="admin-progress-fill admin-bg-red" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <p style={{ fontSize: "18px", fontWeight: "500" }}>Platform Activity Overview</p>
              <div style={{ display: "flex", gap: "40px" }}>

                <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)", borderRadius: "10px", flex: "1.5" }}>
                  <h4 style={{ textAlign: "center", background: "#ADCEED", padding: "15px", marginTop: "0px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>User Activity</h4>
                  <div style={{ padding: "0px 12px", marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={Login} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Login Today</p>
                      </div>
                      <div><span className="admin-stat-number">312</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={YellowProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Profile Update</p>
                      </div>
                      <div><span className="admin-stat-number">134</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={SuspAct} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Suspecious Activity</p>
                      </div>
                      <div><span className="admin-stat-number">13</span></div>
                    </div>
                  </div>


                </div>
                <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)", borderRadius: "10px", flex: "2" }}>
                  <h4 style={{
                    textAlign: "center", background: "#ADCEED", padding: "15px", marginTop: "0px", borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px"
                  }}>Application Status</h4>
                  <div style={{ margin: "15px 12px", padding: "0px 50px" }}>
                    <p style={{ padding: "5px 20px", marginTop: "15px", fontWeight: "500" }}>Total Application : 8350</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={BlueProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Shortlisted</p>
                      </div>
                      <span className="admin-stat-number">450</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={Interview} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Interviews</p>
                      </div>
                      <div><span className="admin-stat-number">310</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={Rejection} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Rejections</p>
                      </div>
                      <div><span className="admin-stat-number">31</span></div>
                    </div>
                  </div>


                </div>
                <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)", borderRadius: "10px", flex: "1.5" }}>
                  <h4 style={{ textAlign: "center", background: "#ADCEED", padding: "15px", marginTop: "0px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>Employer Activity</h4>
                  <div style={{ padding: "0px 12px", marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={BlueProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>New Employers</p>
                      </div>
                      <div><span className="admin-stat-number">45</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={GreenProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Job Postings</p>
                      </div>
                      <div><span className="admin-stat-number">92</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={RedProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Rejected Jobs</p>
                      </div>
                      <div><span className="admin-stat-number">05</span></div>
                    </div>
                  </div>


                </div>

              </div>
              <p style={{ fontSize: "18px", fontWeight: "500" }}>Job & Communication</p>
              <div style={{ display: "flex", gap: "40px" }}>

                <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)", borderRadius: "10px", flex: "1.5" }}>
                  <h4 style={{
                    textAlign: "center", background: "#ADCEED", padding: "15px", marginTop: "0px", borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px"
                  }}>Job Tracking</h4>
                  <div style={{ padding: "0px 12px", marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={BlueProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Job Posted</p>
                      </div>
                      <div><span className="admin-stat-number">312</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={GreenProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Job Approved</p>
                      </div>
                      <div><span className="admin-stat-number">134</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={RedProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Expired Jobs</p>
                      </div>
                      <div><span className="admin-stat-number">13</span></div>
                    </div>
                  </div>


                </div>
                <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)", borderRadius: "10px", flex: "1.5" }}>
                  <h4 style={{
                    textAlign: "center", background: "#ADCEED", padding: "15px", marginTop: "0px", borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px"
                  }}>Communication Logs</h4>
                  <div style={{ padding: "0px 12px", marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={Msgsent} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Message Sent</p>
                      </div>
                      <div><span className="admin-stat-number">312</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={SupportTicket} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Support Tickets</p>
                      </div>
                      <div><span className="admin-stat-number">134</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={EmailsSent} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Emails sent</p>
                      </div>
                      <div><span className="admin-stat-number">13</span></div>
                    </div>
                  </div>


                </div>
                <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)", borderRadius: "10px", flex: "1.5" }}>
                  <h4 style={{
                    textAlign: "center", background: "#ADCEED", padding: "15px", marginTop: "0px", borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px"
                  }}>Employer Activity</h4>
                  <div style={{ padding: "0px 12px", marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={BlueProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>New Employers</p>
                      </div>
                      <div><span className="admin-stat-number">45</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={GreenProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Job Postings</p>
                      </div>
                      <div><span className="admin-stat-number">92</span></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <img src={RedProfile} width={20} height={20} alt="" />
                        <p style={{ margin: "0px 5px" }}>Rejected Jobs</p>
                      </div>
                      <div><span className="admin-stat-number">05</span></div>
                    </div>
                  </div>


                </div>

              </div>
            </>
          )}


          {activeTab === "CompanyApproval" && (
            <div className="C-Approval-container">
              <h2 className="C-Approval-title">Company Approval</h2>
              <div className="C-Approval-table-wrapper">
                <div className="C-Approval-header-row">
                  <div className="C-Approval-col">Company Name</div>
                  <div className="C-Approval-col">Submitted By</div>
                  <div className="C-Approval-col">Date of submission</div>
                  <div className="C-Approval-col">Certificate</div>
                  <div className="C-Approval-col">Verification</div>
                  <div className="C-Approval-col">Status</div>
                </div>
                {companyData.map((company) => (
                  <div className="C-Approval-data-row" key={company.id}>
                    <div className="C-Approval-col C-Approval-name">{company.name}</div>
                    <div className="C-Approval-col">
                      <div className="C-Approval-user-info">
                        <div className="C-Approval-avatar"></div>
                        <span>{company.user}</span>
                      </div>
                    </div>
                    <div className="C-Approval-col">{company.date}</div>
                    <div className="C-Approval-col">
                      <span className={company.certificate === "Yes" ? "C-Approval-badge-yes" : "C-Approval-badge-no"}>
                        {company.certificate}
                      </span>
                    </div>
                    <div className="C-Approval-col">
                      <span className={`C-Approval-${company.verification}`}>
                        {company.verification}
                      </span>
                    </div>
                    <div className="C-Approval-col C-Approval-dots">
                      <span 
                onClick={() => setOpenDropdownId(openDropdownId === company.id ? null : company.id)}
                style={{ cursor: 'pointer', padding: '5px' }}
              >
                ...
              </span>
              {openDropdownId === company.id && (
        <div className="C-Approval-dropdown">
          {["Pending", "Hold", "Reject", "Verified"]
            .filter((status) => status !== company.verification) // Current status-ai hide panrom
            .map((status) => (
              <div 
                key={status} 
                onClick={() => {
                  handleStatusChange(company.id, status);
                  setOpenDropdownId(null); // Select panna udane close aagum
                }}
              >
                {status}
              </div>
            ))}
        </div>
      )}
                    </div>

                  </div>
                  
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


    </>
  );
};