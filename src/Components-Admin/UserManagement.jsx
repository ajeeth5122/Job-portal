import React, { useState } from 'react'
import './UserManagement.css'
import { useJobs } from '../JobContext'
import Searchicon from '../assets/icon_search.png'
import leftArrow from '../assets/left_arrow.png'
import rightArrow from '../assets/right_arrow.png'
import threedots from '../assets/ThreeDots.png'

export const UserManagement = () => {
  const { Alluser, currentEmployer } = useJobs()
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState(null); 
  const recordsPerPage = 5;


  const [usersList, setUsersList] = useState([
    ...Alluser.map((user, index) => {
      let status = "Active";
      if (index === 3 || index === 5) status = "Hold";
      if (index === 4) status = "Deactivated";
      return { ...user, status };
    }),
    {
      id: currentEmployer.id,
      role: "employer",
      status: "Active",
      profile: { fullName: currentEmployer.hrName },
      contact: { email: currentEmployer.email, city: "Chennai" },
      joinDate:currentEmployer.joinDate
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    setActiveMenuId(null);
  };

  const filteredUsers = usersList.filter((user) => {
    const name = user.profile.fullName.toLowerCase()
    const email = user.contact.email.toLowerCase()
    const role = user.role ? user.role : "candidate"

    return (
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      role.toLowerCase().includes(search.toLowerCase())
    )
  })

  // Dynamic Stats logic
  const totalUsers = usersList.length
  const candidates = usersList.filter(u => u.role !== "employer").length
  const employers = usersList.filter(u => u.role === "employer").length
  const activeNow = usersList.filter(u => u.status === "Active").length

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredUsers.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredUsers.length / recordsPerPage);

  const prevPage = () => { if (currentPage !== 1) setCurrentPage(currentPage - 1) };
  const nextPage = () => { if (currentPage !== nPages) setCurrentPage(currentPage + 1) };

  const formatDate = (dateString) => {
    if (!dateString) return "Oct 24, 2023";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="user-management-container">
      <div style={{ marginBottom: "25px" }} className='Admin-Welcome-Container'>
        <p className='Admin-Welcome-Note' >User Management</p>
        <p className='Admin-Welcome-para'>Manage and monitor all platform members and their activity.</p>
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
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {[...currentRecords].reverse().map((user) => {
              const isEmployer = user.role === "employer"
              const rawDate =  user.joinDate;

              return (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className={`avatar ${isEmployer ? 'employer-avatar' : ''}`}>
                        {user.profile.fullName.charAt(0)}
                      </div>
                      <div>
                        <p>{user.profile.fullName}</p>
                        <span>{user.contact.email}</span>
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
                  <td style={{ textAlign: "center" }} className="joined-date">
                    {user.joinDate}
                  </td>
                  <td className="um-actions">
                    <img
                      src={threedots}
                      alt="options"
                      className="action-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveMenuId(activeMenuId === user.id ? null : user.id)}
                    />

                    {activeMenuId === user.id && (
                      <div className="status-dropdown">
                        {user.status === "Active" && (
                          <>
                            <button onClick={() => handleStatusChange(user.id, "Deactivated")}>Deactivate</button>
                            <button onClick={() => handleStatusChange(user.id, "Hold")}>Hold</button>
                          </>
                        )} 
                        {user.status === "Hold" && (
                          <>
                            <button onClick={() => handleStatusChange(user.id, "Deactivated")}>Deactivate</button>
                            <button onClick={() => handleStatusChange(user.id, "Active")}>Activate</button>
                          </>
                        )}
                        {user.status === "Deactivated" && (
                          <>
                            <button onClick={() => handleStatusChange(user.id, "Active")}>Activate</button>
                            <button onClick={() => handleStatusChange(user.id, "Hold")}>Hold</button>
                          </>
                        )} 
                      </div>
                    )}
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