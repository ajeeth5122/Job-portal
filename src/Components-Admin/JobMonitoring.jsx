import React, { useState, useMemo, useEffect, useRef } from 'react';
import './JobMonitoring.css';
import { JobPreviewModal } from './JobPreviewModal';
import { useJobs } from '../JobContext';
import flag from '../assets/AdminAssets/Flag_mark.png'
import { JobMonitorOverview } from './JobMonitorOverview';

export const JobMonitoring = () => {
    const { jobs, setJobs, deleteJob } = useJobs();
    const [activeMenu, setActiveMenu] = useState(null);
    const menuRef = useRef(null);
    const [filterType, setFilterType] = useState('Newest');
    const [selectedJobId, setSelectedJobId] = useState(null);


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
    // const [selectedJob, setSelectedJob] = useState(null);
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
            // case '2 Days': result = result.filter(j => getDaysDiff(j.date) <= 2); break;
            // case '3 Days': result = result.filter(j => getDaysDiff(j.date) <= 3); break;
            case '1 Week': result = result.filter(j => getDaysDiff(j.date) <= 7); break;
            case '2 Week': result = result.filter(j => getDaysDiff(j.date) <= 8); break
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

    return (
        <>
            {!selectedJobId ? (
                <div className="job-monitoring-component">
                    <div className="monitoring-header-top">
                        <div className="header-text-group">
                            <h1 className="main-title">Job Monitoring</h1>
                            <p className="sub-title">Monitor and manage all job postings, application activity, and overall platform performance</p>
                        </div>

                    </div>

                    <div className="monitoring-container">
                        <div className="table-header">
                            <div>Id</div>
                            <div>Roles</div>
                            <div>Companies</div>
                            <div>Status</div>
                            <div>Posted Date</div>
                            <div style={{ textAlign: 'right' }}>Actions</div>
                        </div>

                        {currentPosts.length > 0 ? (
                            currentPosts.map((job) => (
                                <div key={job.id} className={`job-row ${job.isFlagged ? 'flagged-row' : ''}`}>
                                    <div className="cell id-col">
                                        <span className="text-id">#{job.id}</span>
                                    </div>
                                    <div className="cell role-col">
                                        <span className="text-role">{job.title}</span>
                                        {job.isFlagged && <span className="flag-indicator"><img src={flag} alt='flagged' className='flag-design' /></span>}
                                    </div>
                                    <div className="cell company-col text-company">{job.company}</div>
                                    <div className="cell status-col">
                                        <span className={`status-pill ${job.status || "posted"}`}>{job.status || "posted"}</span>
                                    </div>
                                    <div className="cell date-col text-date">{job.posted}</div>
                                    <div className="cell actions-col">
                                        <div className="action-icons-container">

                                            <div className="more-component" ref={activeMenu === job.id ? menuRef : null}>

                                                <button
                                                    style={{ padding: "7px 10px", cursor: 'pointer', fontSize: '11px' , backgroundColor: '#1E88E5', color: 'white', border: 'none', borderRadius: "5px" }}
                                                    onClick={() => setSelectedJobId(job.id)}
                                                >View Detail</button>
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
                    {/* {selectedJob && <JobPreviewModal job={selectedJob} onClose={() => setSelectedJob(null)} />} */}
                </div>
            ) : (<>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <button
                        onClick={() => setSelectedJobId(null)}
                        style={{ background: '#a09f9f', borderRadius: "5px", padding: "7px 11px", border: 'none', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}
                    >Back</button>


                </div>
                <JobMonitorOverview jobId={selectedJobId} setSelectedJobId={setSelectedJobId} />

            </>
            )}

        </>
    )
};