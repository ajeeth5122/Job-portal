import React, { useState, useEffect } from 'react'
import './UserManagement.css'
import { useJobs } from '../JobContext'
import Searchicon from '../assets/icon_search.png'
import leftArrow from '../assets/left_arrow.png'
import rightArrow from '../assets/right_arrow.png'
import { useLocation } from 'react-router-dom'
 
export const UserManagement = () => {
  const { Alluser, currentEmployer, updateUserStatus } = useJobs()
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const recordsPerPage = 5;
  const location = useLocation();
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [usersList, setUsersList] = useState([]);
 
  useEffect(() => {
    if (Alluser && currentEmployer) {
      setUsersList([
        ...Alluser.map((user, index) => {
          let status = user.status || "Active";
          if (!user.status) {
            if (index === 3 || index === 5) status = "Hold";
            if (index === 4) status = "Deactivated";
          }
          return { ...user, status };
        }),
        {
          id: currentEmployer.id,
          role: "employer",
          status: currentEmployer.status || "Active",
          profile: { fullName: currentEmployer.hrName },
          companyDetails: {
            companyName: currentEmployer.company,
            companyId: currentEmployer.companyId,
            planName: currentEmployer.membership?.planName || "Free Plan",
            planLevel: currentEmployer.membership?.planLevel || "1"
          },
          contact: { email: currentEmployer.email, city: "Chennai", mobile: "9876543210" },
          joinDate: currentEmployer.joinDate,
          lastseen: "Active Now"
        }
      ]);
    }
  }, [Alluser, currentEmployer]);
 
 
  const handleStatusChange = (id, newStatus) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    setSelectedUser(prev => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
   
    if (updateUserStatus) {
      updateUserStatus(id, newStatus);
    }
 
    setIsModalOpen(false);
    alert("Status updated and saved successfully!");
  };
 
  const handleDeleteReport = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsersList(prev => prev.filter(u => u.id !== id));
      setSelectedUser(null);
      setIsDetailView(false);
      alert("User deleted successfully!");
    }
  };
 
  const roleFilter = location.state?.filterRole || 'all';
 
  const filteredUsers = usersList.filter((user) => {
    const role = user.role?.toLowerCase() || "candidate";
    const name = user.profile?.fullName?.toLowerCase() || "";
    const email = user.contact?.email?.toLowerCase() || "";
    const matchesSearch = name.includes(search.toLowerCase()) || email.includes(search.toLowerCase()) || role.includes(search.toLowerCase());
   
    if (roleFilter === 'employer') return role === 'employer' && matchesSearch;
    if (roleFilter === 'candidate') return role === 'candidate' && matchesSearch;
    return matchesSearch;
  });
 
  const totalUsers = usersList.length
  const candidates = usersList.filter(u => u.role !== "employer").length
  const employers = usersList.filter(u => u.role === "employer").length
  const activeNow = usersList.filter(u => u.status === "Active").length
 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredUsers.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredUsers.length / recordsPerPage) || 1;
 
  const prevPage = () => { if (currentPage !== 1) setCurrentPage(currentPage - 1) };
  const nextPage = () => { if (currentPage !== nPages) setCurrentPage(currentPage + 1) };
 
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailView(true);
  };
 
  if (isDetailView && selectedUser) {
    const isEmployer = selectedUser.role === 'employer';
 
    return (
      <div className="detail-page-wrapper">
        <div className="detail-section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="detail-section-title" style={{ margin: 0 }}>
              {isEmployer ? "Employer Information" : "User Information"}
            </h3>
            <button onClick={() => setIsDetailView(false)} className="detail-btn-action" style={{ background: '#f1f5f9' }}>
              Back to List
            </button>
          </div>
         
          <div className="detail-form-group">
 
            <div className="detail-field-row">
              <label>Id :</label>
              <input type="text" readOnly value={selectedUser.id || ""} />  
            </div>
 
            <div className="detail-field-row">
              <label>{isEmployer ? "HR Name :" : "Name :"}</label>
              <input type="text" readOnly value={selectedUser.profile?.fullName || ""} />  
            </div>
 
            <div className="detail-field-row">
              <label>Mobile number :</label>
              <input type="text" readOnly value={selectedUser.contact?.mobile || "9876543210"} />
            </div>
 
            <div className="detail-field-row">
              <label>Mail ID :</label>
              <input type="text" readOnly value={selectedUser.contact?.email || ""} />
            </div>
 
            {/* <div className="detail-field-row">
              <label>User Type :</label>
              <input type="text" readOnly value={isEmployer ? "Employer" : "Jobseeker"} />
            </div> */}
           
           
            {isEmployer ? (
              <>
                <div className="detail-field-row">
                  <label>Company ID :</label>  
                  <input type="text" readOnly value={selectedUser.companyDetails.companyId || "N/A"} />
                </div>
 
                <div className="detail-field-row">
                  <label>Company Name :</label>  
                  <input type="text" readOnly value={selectedUser.companyDetails.companyName || "N/A"} />
                </div>
               
                <div className="detail-field-row">
                  <label>Join Date :</label>  
                  <input type="text" readOnly value={selectedUser.joinDate || "N/A"} />
                </div>
 
 
                <div className="detail-field-row">
                  <label>Membership Plan :</label>  
                  <input type="text" readOnly value={selectedUser.companyDetails?.planName || "Basic Plan"} />
                </div>
              </>
            ) : (
              <>
 
                <div className="detail-field-row">
                  <label>Preferred Role :</label>
                  <input type="text" readOnly value={selectedUser.preferences?.[0]?.role || "Candidate"} />
                </div>
 
                <div className="detail-field-row">
                  <label>Current Details :</label>  
                  <input type="text" readOnly value={selectedUser.currentDetails?.currentLocation || "Chennai"} />
                </div>
 
                <div className="detail-field-row">
                   <label>Education :</label>
                   <input type="text" readOnly value={selectedUser.education?.highestQual || "B.E / B.Tech / Graduate"} />
                </div>
 
                <div className="detail-field-row">
                  <label>Skills :</label>
                  <input type="text" readOnly value={Array.isArray(selectedUser.skills) ? selectedUser.skills.join(", ") : selectedUser.skills || "React, Node.js, JavaScript, CSS"} />
                </div>
              </>
            )}
 
            <div className="detail-field-row">
              <label>Current Status :</label>
              <input type="text" readOnly value={selectedUser.status} style={{ fontWeight: 'bold', color: selectedUser.status === 'Active' ? '#2e7d32' : selectedUser.status === 'Hold' ? '#f57c00' : '#d32f2f' }} />
            </div>
          </div>
        </div>
 
        <div className="detail-section-card">
          <h3 className="detail-section-title">Details</h3>
          <div className="detail-report-textbox">
            {isEmployer ? (
              `This employer registered on ${selectedUser.joinDate} and is currently managing corporate postings.`
            ) : (
              `An online job profile is like your own shop window. You can show employers what you have to offer, and make it easy for them to find you.`
            )}
          </div>
        </div>
 
        <div className="detail-top-actions">
          <button onClick={() => setIsModalOpen(!isModalOpen)} className="detail-btn-action">
            Edit Status
          </button>
          <button onClick={() => handleDeleteReport(selectedUser.id)} className="detail-btn-action detail-btn-delete">
            Delete
          </button>
        </div>
 
        {isModalOpen && (
          <div className="detail-status-modal-overlay">
            <div className="detail-status-modal-content">
              <h3>Select Status</h3>
              <div className="detail-status-modal-options">
                <button onClick={() => handleStatusChange(selectedUser.id, "Active")}>Active</button>
                <button onClick={() => handleStatusChange(selectedUser.id, "Hold")}>Hold</button>
                <button onClick={() => handleStatusChange(selectedUser.id, "Deactivated")}>Deactivated</button>
              </div>
              <button className="detail-status-modal-cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
 
  return (
    <div className="user-management-container">
      <div style={{ marginBottom: "25px" }} className='Admin-Welcome-Container'>
        <p style={{margin:"5px 0"}} className='Admin-Welcome-Note' >User Management</p>
        <p style={{margin:"5px 0"}} className='Admin-Welcome-para'>Manage and monitor all platform members and their activity.</p>
      </div>
 
      <div className="um-stats">
        <div className="um-card"><p>Total Users</p><h3>{totalUsers}</h3></div>
        <div className="um-card green"><p>Active Now</p><h3>{activeNow}</h3></div>
        <div className="um-card yellow"><p>Candidates</p><h3>{candidates}</h3></div>
        <div className="um-card black"><p>Employers</p><h3>{employers}</h3></div>
      </div>
 
      <div className="um-search-container">
        <div className="search-wrapper">
          <span className="search-icon"><img src={Searchicon} alt="Search" /></span>
          <input
            type="text"
            placeholder="Search by name, email or Role"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
 
      <div className="um-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Seen</th>
              <th>Joined Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {[...currentRecords].reverse().map((user) => {
              const isEmployer = user.role === "employer"
 
              return (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className={`avatar ${isEmployer ? 'employer-avatar' : ''}`}>
                        {user.profile?.fullName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p>{user.profile?.fullName}</p>
                        <span>{user.contact?.email}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className={`role ${isEmployer ? 'employer' : 'candidate'}`}>
                      {isEmployer ? "Employer" : "Candidate"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className={`status ${user.status?.toLowerCase() || 'active'}`}>
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }} className="last-seen">
                    {user.lastseen || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }} className="joined-date">
                    {user.joinDate}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      style={{
                        background: "#1E88E5",
                        color: "white",
                        borderRadius: "5px",
                        padding: "7px 10px",
                        outline: "none",
                        border: "none",
                        cursor: "pointer"
                      }}
                      onClick={() => handleViewDetails(user)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
 
        <div className="pagination-footer">
          <p>Page {currentPage} of {nPages}</p>
          <div className="pagination-btns">
            <button onClick={prevPage} disabled={currentPage === 1}>
              <img src={leftArrow} alt="prev" className="nav-arrow" />
            </button>
            <button onClick={nextPage} disabled={currentPage === nPages}>
              <img src={rightArrow} alt="next" className="nav-arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}