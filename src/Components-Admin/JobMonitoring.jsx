import React, { useState, useMemo, useEffect, useRef } from 'react';
import './JobMonitoring.css';
import { JobPreviewModal } from './JobPreviewModal';

export const JobMonitoring = () => {
    const [jobs, setJobs] = useState([
        { id: 1, role: 'UI UX Desinger', company: 'HCL Tech', status: 'Posted', date: '2026-04-06', isFlagged: false, location: 'Chennai, India', experience: '2 to 3 years', salary: '₹ 20,000 - 25,000', type: 'Full-Time', openings: 2, applicants: '100+', skills: ['figma', 'wireframe', 'user research', 'prototype', 'interactions'] },
        { id: 2, role: 'Content Writer', company: 'Infosys', status: 'Updated', date: '2026-04-05', isFlagged: true, location: 'Bangalore', experience: '1 to 3 years', salary: '₹ 15,000 - 20,000', type: 'Full-Time', openings: 1, applicants: '50+', skills: ['SEO', 'Copywriting', 'Blog Post'] },
        { id: 3, role: 'Frontend Developer', company: 'TATA', status: 'Updated', date: '2026-03-28', isFlagged: false, location: 'Mumbai', experience: '3+ years', salary: '₹ 40,000 - 60,000', type: 'Full-Time', openings: 5, applicants: '200+', skills: ['React', 'CSS', 'HTML', 'JS'] },
        { id: 4, role: 'Marketing Manger', company: 'Wipro', status: 'Posted', date: '2026-04-01', isFlagged: false, location: 'Chennai', experience: '5+ years', salary: '₹ 80,000+', type: 'Full-Time', openings: 1, applicants: '30+', skills: ['Digital Marketing', 'Lead Gen'] },
        { id: 5, role: 'Backend Developer', company: 'Tech Mahindra', status: 'Posted', date: '2026-01-15', isFlagged: false },
        { id: 6, role: 'Network Engineer', company: 'L&T Services', status: 'Updated', date: '2025-12-20', isFlagged: false },
        { id: 7, role: 'Network Engineer', company: 'L&T Services', status: 'Updated', date: '2026-04-07', isFlagged: false },
        { id: 8, role: 'React Developer', company: 'Google', status: 'Posted', date: '2026-04-07', isFlagged: false },
        { id: 9, role: 'Product Manager', company: 'Amazon', status: 'Updated', date: '2026-04-04', isFlagged: false },
        { id: 10, role: 'Cyber Security', company: 'Cisco', status: 'Posted', date: '2026-03-15', isFlagged: true },
        { id: 11, role: 'Data Scientist', company: 'Meta', status: 'Posted', date: '2026-04-03', isFlagged: false },
        { id: 12, role: 'DevOps Engineer', company: 'Microsoft', status: 'Updated', date: '2026-02-10', isFlagged: false },
        { id: 13, role: 'QA Tester', company: 'Accenture', status: 'Rejected', date: '2026-04-06', isFlagged: false },
        { id: 14, role: 'Mobile Developer', company: 'Apple', status: 'Approved', date: '2026-03-30', isFlagged: false },
        { id: 15, role: 'Cloud Architect', company: 'Oracle', status: 'Posted', date: '2026-03-01', isFlagged: false },
        { id: 16, role: 'Technical Lead', company: 'IBM', status: 'Updated', date: '2026-04-07', isFlagged: false },
        { id: 17, role: 'Full Stack Dev', company: 'Netflix', status: 'Posted', date: '2025-05-20', isFlagged: false },
        { id: 18, role: 'Sales Executive', company: 'Salesforce', status: 'Approved', date: '2026-04-01', isFlagged: false },
        { id: 19, role: 'HR Manager', company: 'Adobe', status: 'Posted', date: '2026-04-02', isFlagged: false },
        { id: 20, role: 'Graphic Designer', company: 'Canva', status: 'Updated', date: '2026-04-06', isFlagged: false },
        { id: 21, role: 'Blockchain Dev', company: 'Binance', status: 'Rejected', date: '2026-04-07', isFlagged: true },
        { id: 22, role: 'Support Engineer', company: 'Dell', status: 'Posted', date: '2026-03-25', isFlagged: false },
    ]);

    const [activeMenu, setActiveMenu] = useState(null);
    const menuRef = useRef(null);
    const [filterType, setFilterType] = useState('Newest');


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenu !== null && menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeMenu]);

    // --- PAGINATION LOGIC ---
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const postsPerPage = 10;



    // --- LOGIC: FILTERING & SORTING  ---
    const filteredJobs = useMemo(() => {
        let result = [...jobs];
        const now = new Date();

        const getDaysDiff = (dateStr) => {
            const date = new Date(dateStr);
            return (now - date) / (1000 * 60 * 60 * 24);
        };

        switch (filterType) {
            case 'Recent': case 'Newest':
                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'Last 10': result = result.slice(0, 10); break;
            case 'Last 20': result = result.slice(0, 20); break;
            case 'Flagged': result = result.filter(j => j.isFlagged); break;
            case 'Rejected': result = result.filter(j => j.status === 'Rejected'); break;
            case 'Approved': result = result.filter(j => j.status === 'Approved'); break;
            case 'Posted': result = result.filter(j => j.status === 'Posted'); break;
            case 'Updated': result = result.filter(j => j.status === 'Updated'); break;
            case '1 Day': result = result.filter(j => getDaysDiff(j.date) <= 1); break;
            case '2 Days': result = result.filter(j => getDaysDiff(j.date) <= 2); break;
            case '3 Days': result = result.filter(j => getDaysDiff(j.date) <= 3); break;
            case '1 Week': result = result.filter(j => getDaysDiff(j.date) <= 7); break;
            case '1 Month': result = result.filter(j => getDaysDiff(j.date) <= 30); break;
            case '1 Year': result = result.filter(j => getDaysDiff(j.date) <= 365); break;
            default: break;
        }
        return result;
    }, [jobs, filterType]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredJobs.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredJobs.length / postsPerPage);


    useEffect(() => {
        setCurrentPage(1);
    }, [filterType]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setActiveMenu(null);
    };


    const handleApprove = (id) => {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Approved' } : j));
    };

    const handleReject = (id) => {
        if (window.confirm("Reject this job?")) {
            setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Rejected' } : j));
        }
    };

    const handleToggleFlag = (id) => {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, isFlagged: !j.isFlagged } : j));
        setActiveMenu(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Permanent delete?")) {
            setJobs(prev => prev.filter(j => j.id !== id));
        }
    };

    return (
        <div className="job-monitoring-component">
            <div className="monitoring-header-top">
                <div className="header-text-group">
                    <h1 className="main-title">Job Monitoring</h1>
                    <p className="sub-title">Monitor and manage all job postings, application activity, and overall platform performance</p>
                </div>
                <div className="sort-group">
                    <span>Sort by:</span>
                    <select className="sort-select" onChange={(e) => setFilterType(e.target.value)}>
                        <option value="Newest">Newest</option>
                        <option value="Recent">Recent</option>
                        <option value="Last 10">Last 10</option>
                        <option value="Last 20">Last 20</option>
                        <option value="Flagged">Flagged</option>
                        <option value="Approved">Verified/Approved</option>
                        <option value="Rejected">Deactivated/Rejected</option>
                        <option value="Posted">Posted Jobs</option>
                        <option value="Updated">Updated Jobs</option>
                        <option value="1 Day">Last 1 Day</option>
                        <option value="2 Days">Last 2 Days</option>
                        <option value="3 Days">Last 3 Days</option>
                        <option value="1 Week">Last 1 Week</option>
                        <option value="1 Month">Last 1 Month</option>
                        <option value="1 Year">Last 1 Year</option>
                    </select>
                </div>
            </div>

            <div className="monitoring-container">
                <div className="table-header">
                    <div className="header-cell role-col">Roles</div>
                    <div className="header-cell company-col">Companies</div>
                    <div className="header-cell status-col">Status</div>
                    <div className="header-cell date-col">Date</div>
                    <div className="header-cell actions-col">Actions</div>
                </div>

                {currentPosts.length > 0 ? (
                    currentPosts.map((job) => (
                        <div key={job.id} className={`job-row ${job.isFlagged ? 'flagged-row' : ''}`}>
                            <div className="cell role-col">
                                <span className="text-role">{job.role}</span>
                                {job.isFlagged && <span className="flag-indicator">🚩</span>}
                            </div>
                            <div className="cell company-col text-company">{job.company}</div>
                            <div className="cell status-col">
                                <span className={`status-pill ${job.status.toLowerCase()}`}>{job.status}</span>
                            </div>
                            <div className="cell date-col text-date">{job.date}</div>
                            <div className="cell actions-col">
                                <div className="action-icons-container">
                                    {/* <button onClick={() => handleApprove(job.id)} className="btn-icon check">✔</button>
                                    <button onClick={() => handleReject(job.id)} className="btn-icon cross">✖</button>
                                    <button onClick={() => handleDelete(job.id)} className="btn-icon trash">🗑</button>
                                    <button onClick={() => setSelectedJob(job)} className="btn-icon eye">👁</button> */}
                                    <div className="more-component"ref={activeMenu === job.id ? menuRef : null}>
                                        <button onClick={() => setActiveMenu(activeMenu === job.id ? null : job.id)} className="btn-icon more">•••</button>
                                        {activeMenu === job.id && (
                                            <div className="action-dropdown">
                                                {/* <button onClick={() => alert('Edit Mode')}>Edit Job</button> */}
                                                <button onClick={() => handleToggleFlag(job.id)}>
                                                    {job.isFlagged ? 'Unflag' : 'Flag Employer'}
                                                </button>
                                                <button onClick={() => handleApprove(job.id)} >Approve / Verify</button>
                                                <button onClick={() => handleReject(job.id)} >Reject / Deactivate</button>
                                                <button onClick={() => handleDelete(job.id)} >Delete</button>
                                                <button onClick={() => setSelectedJob(job)} >Quick View</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">No jobs match this filter.</div>
                )}

                {/* Pagination Section */}
                {totalPages > 0 && (
                    <div className="pagination-bar">
                        <button
                            className="page-nav-btn"
                            disabled={currentPage === 1}
                            onClick={() => paginate(currentPage - 1)}
                        > &lt; </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                className={`page-num-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="page-nav-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => paginate(currentPage + 1)}
                        > &gt; </button>
                    </div>
                )}
            </div>
            {selectedJob && <JobPreviewModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </div>
    );
};