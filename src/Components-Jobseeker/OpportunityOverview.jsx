import React, { useState } from 'react'
import { Footer } from '../Components-LandingPage/Footer';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './OpportunityOverview.css'
import starIcon from '../assets/Star_icon.png'
import time from '../assets/opportunity_time.png'
import experience from '../assets/opportunity_bag.png'
import place from '../assets/opportunity_location.png'
import twitter from '../assets/socials-x.png'
import linkedin from '../assets/socials-linkedin.png'
import facebook from '../assets/socials-facebook.png'
import { formatPostedDate } from './OpportunitiesCard';
import { useJobs } from '../JobContext';
import { SearchBar } from './SearchBar'
import { Header } from '../Components-LandingPage/Header';

export const OpportunityOverview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { jobs, appliedJobs, toggleSaveJob, isJobSaved } = useJobs();

  const job = jobs.find(singleJob => singleJob.id === id) || appliedJobs.find(singleJob => singleJob.id === id);
  console.log(job)
  const isSaved = job ? isJobSaved(job.id) : false;
  const isApplied = appliedJobs.some(j => j.id === id);

  if (!job) {
      return (
          <>
            <Header />
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <h2>Job not found</h2>
                <p>This job may have been removed or you have already applied.</p>
                <button className="back-btn" onClick={() => navigate('/Job-portal/jobseeker/jobs')}>Back to Jobs</button>
            </div>
            <Footer />
          </>
      );
  }

  const similarJobs = jobs.filter((similarJob) => {
    return similarJob.id !== job.id && similarJob.Department.some(item => job.Department.includes(item));
  });

  const limitedSimilarJob = similarJobs.slice(0, 9);

  const [query, setQuery] = useState('');
  const [loc, setLoc] = useState(''); 
  const [exp, setExp] = useState('');

  const handleInitialSearch = () => {
    navigate('/Job-portal/jobseeker/searchresults', {
      state: {
        query: query,
        location: loc,
        experience: exp
      }
    })
  }

  return (
    <>
      <Header />

      <div className='opp-overview-content'>
        <div className='search-backbtn-container'>
          <button className="back-btn" onClick={() => navigate(-1)}>Back</button>

          <SearchBar 
            searchQuery={query} setSearchQuery={setQuery} 
            searchLocation={loc} setSearchLocation={setLoc} 
            searchExp={exp} setSearchExp={setExp} 
            onSearch={handleInitialSearch} 
           />
        </div>

        <div className='opp-overview-main'>
          <div className="opp-job-main">
            {/* Job Header  */}
            <div className="opp-overview-job-card">
              <div className="Opportunities-job-header">
                <div>
                  <h2 className="opp-topcard-job-title">{job.title}</h2>
                  <h5 className="Opportunities-job-company">
                    {job.company} <span className="Opportunities-divider">|</span>
                    <span className="star"><img src={starIcon} alt="star" /></span> {job.ratings} 
                    <span className="Opportunities-divider">|</span>
                    <span className="opp-reviews"> {job.reviewNo} Reviews</span>
                  </h5>
                </div>
                {job.logo ? (<img src={job.logo} alt={job.company} className="Opportunities-job-logo" />) : (<div className="Opportunities-job-logo-placeholder">{job.company.charAt(0).toUpperCase()}</div>)}
              </div>

              <div className="Opportunities-job-details">
                <p className='Opportunities-detail-line'><img src={time} className='card-icons' alt="time" />{job.duration}<span className="Opportunities-divider">|</span>₹ {job.salary} Lpa</p>
                <p className='Opportunities-detail-line'><img src={experience} className='card-icons' alt="exp" />{job.experience} years of experience</p>
                <p className='Opportunities-detail-line'><img src={place} className='card-icons' alt="loc" />{job.location}</p>
              </div>

              <div className='Opportunities-details-bottom'>
                <div className="Opportunities-job-tags">
                  {job.tags.map((tag, index) => (
                    <span key={index} className={`Opportunities-job-tag ${tag.toLowerCase()}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="Opportunities-job-type">
                  {job.WorkType}
                </div>
              </div>

              <hr className="Opportunities-separator" />

              <div className="Opportunities-job-footer">
                <div className="Opportunities-job-meta">
                  <p>{formatPostedDate(job.posted)} <span className="Opportunities-divider">|</span> Openings: {job.openings} <span className="Opportunities-divider">|</span> Applicants: {job.applicants}</p>
                </div>

                <div className="Opportunities-job-actions">
                  <button 
                    className={isSaved ? "Opportunities-apply-btn" : "Opportunities-save-btn"}
                    onClick={() => toggleSaveJob(job)}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </button>
      
                  <button 
                    className="Opportunities-apply-btn"
                    onClick={() => navigate (`/Job-portal/jobseeker/jobapplication/${job.id}`)}
                    disabled={isApplied}
                    style={{ 
                        opacity: isApplied ? 0.6 : 1, 
                        cursor: isApplied ? 'not-allowed' : 'pointer',
                        backgroundColor: isApplied ? '#6c757d' : '' // Optional grey out
                    }}
                  >
                    {isApplied ? "Applied" : "Apply"}
                  </button>
                </div>
              </div>
            </div>

            <div className="opp-job-details-card">
              <div className="opp-job-highlights">
                <h3>Job Highlights</h3>
                <ul>
                  {job.JobHighlights.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <h3>Company Overview</h3>
              <p>
                {job.companyOverview}
              </p>

              <h3>Job Description</h3>
              <p>
                {job.jobDescription}
              </p>

              <h3>Responsibilities</h3>
              <ul>
                {job.Responsibilities.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>Key Details:</h3>
              <p><strong>Role:</strong> {job.title}</p>
              <p><strong>Industry Type:</strong> {job.IndustryType.join(", ")}</p>
              <p><strong>Department:</strong> {job.Department.join(", ")}</p>
              <p><strong>Job Type:</strong> {job.WorkType}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Shift:</strong> {job.Shift}</p>

              <h3>Key Skills</h3>
              <div className="opp-key-skills-container">
                {job.KeySkills.map((item, i) => <span key={i}>{item}</span>)}
              </div>

              <hr className="Opportunities-separator" />

              <div className="opp-share-job">
                <div>
                  <p>Share This job</p>
                  <div className='opp-socials'>
                    <div><img src={linkedin} className='opp-socials-icon' alt="linkedin" /></div>
                    <div><img src={facebook} className='opp-socials-icon' alt="facebook" /></div>
                    <div><img src={twitter} className='opp-socials-icon' alt="twitter" /></div>
                  </div>
                </div>
                <button  onClick={() => navigate('/Job-portal/jobseeker/ReportAJob')} className="opp-report-btn">Report this job</button>
              </div>
            </div>
          </div>
          
          <div className="opp-job-sidebar">
            <h3>Similar Jobs</h3>
            {limitedSimilarJob.length > 0 ? limitedSimilarJob.map((sim) => (
              <div key={sim.id} onClick={() => navigate(`/Job-portal/jobseeker/OpportunityOverview/${sim.id}`)} className="opp-similar-job">
                <div className="Opportunities-job-header">
                  <div>
                    <h2 className="similar-job-title">{sim.title}</h2>
                    <p className="similar-job-company">{sim.company} <span className="Opportunities-divider">|</span><span className="star"><img src={starIcon} alt="star" /></span> {sim.ratings} <span className="Opportunities-divider">|</span><span> {sim.reviewNo} reviews</span></p>
                  </div>
                  {sim.logo ? (<img src={sim.logo} alt={sim.company} className="Opportunities-job-logo" />) : (<div className="Opportunities-job-logo-placeholder">{sim.company.charAt(0).toUpperCase()}</div>)}
                </div>
                <div className="Opportunities-job-details">
                  <p className='Opportunities-detail-line'>{sim.tags.join(", ")} - {sim.experience} years of experience</p>
                  <p className='Opportunities-detail-line'><img src={place} className='card-icons' alt="loc" />{sim.location}</p>
                </div>
                <div className="similar-job-footer">
                  <div className="Opportunities-job-type">
                    {sim.WorkType}
                  </div>
                  <p className='similar-job-footer-posted'>
                    {formatPostedDate(sim.posted)}
                  </p>
                </div>
              </div>
            )) : (
              <div>
                <p>Currently no similar jobs available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}