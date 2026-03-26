import React, { createContext, useState, useContext } from 'react';
import { Joblist } from './JobList';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    
    const [jobs, setJobs] = useState(Joblist); // Total JobList common for jobseeker and employer   
    const [activeMenuId, setActiveMenuId] = useState(null); // Using Id to Toggle Menu in Notification Window
    const [employeractiveMenuId, setEmployerActiveMenuId] = useState(null);
    const [companyProfile, setCompanyProfile] = useState([]); //From About your company

    const [Alluser, setAlluser] = useState([
        {
            id: "1",
            profile: { "fullName": "Harshavarthini A", "gender": "Female", "dob": "1999-08-22", "maritalStatus": "Single", "nationality": "Indian" },
            currentDetails: { "jobTitle": "Frontend Developer", "company": "Pixel Logic", experience: "2 Years", "currentLocation": "Chennai", "prefLocation": "Chennai" },
            contact: { "mobile": "+91 9123456780", "altMobile": "", "email": "HarshavarthiniAJ.dev@email.com", "altEmail": "", "address": "No 5, Velachery Main Rd", "street": "Velachery", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600042", "country": "India" },
            resume: { "size": "850KB", "portfolio": "" },
            education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "KV School", "percentage": "95%", "location": "Chennai", "year": "2015" }, "hsc": { "stream": "Biology-Maths", "institution": "KV School", "location": "Chennai", "year": "2017", "percentage": "90%" }, "graduations": [{ "id": 1, "degree": "B.Tech IT", "status": "Completed", "dept": "IT", "percentage": "8.8 CGPA", "startYear": "2017", "endYear": "2021", "college": "SSN College", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "Frontend Developer", "company": "Pixel Logic", "startDate": "2021-07-01", "endDate": "Present", "industry": "Software", "jobType": "Full-Time", "location": "Chennai", "responsibilities": "Building responsive UI using React and Tailwind CSS." }] },
            skills: ["React", "JavaScript", "Tailwind CSS", "Git"],
            languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }, { "name": "Malayalam", "proficiency": "Fluent" }],
            certs: [{ "name": "Meta Frontend Certificate", "file": "meta_fe.pdf" }],
            preferences: [{ "currentCTC": "5 LPA", "expectedCTC": "8 LPA", "jobType": "Hybrid", "role": "Senior Frontend Developer", "ready": "Yes", "relocate": "No" }],
            appliedJobs: [],
            savedJobs: []
        },
        {
            id: "2",
            profile: { "fullName": "Ajeeth ", "gender": "Male", "dob": "2001-03-10", "maritalStatus": "Single", "nationality": "Indian" },
            currentDetails: { "jobTitle": "Data Analyst Trainee", "company": "DataPoint Solutions", experience: "Fresher", "currentLocation": "Coimbatore", "prefLocation": "Bangalore" },
            contact: { "mobile": "+91 9988776655", "altMobile": "", "email": "AjeetH.data@email.com", "altEmail": "", "address": "7/2, Peelamedu", "street": "Avinashi Road", "city": "Coimbatore", "state": "Tamil Nadu", "pincode": "641004", "country": "India" },
            resume: { "size": "1.1MB", "portfolio": "" },
            education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "SVM School", "percentage": "89%", "location": "Coimbatore", "year": "2017" }, "hsc": { "stream": "Computer Science", "institution": "SVM School", "location": "Coimbatore", "year": "2019", "percentage": "92%" }, "graduations": [{ "id": 1, "degree": "B.Sc Data Science", "status": "Completed", "dept": "Science", "percentage": "8.2 CGPA", "startYear": "2019", "endYear": "2022", "college": "PSG Arts", "city": "Coimbatore", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "Frontend Developer", "company": "Pixel Logic", "startDate": "2021-07-01", "endDate": "Present", "industry": "Software", "jobType": "Full-Time", "location": "Chennai", "responsibilities": "Building responsive UI using React and Tailwind CSS." }] },
            skills: ["Python", "SQL", "Tableau", "Excel"],
            languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Professional" }, { "name": "Malayalam", "proficiency": "Fluent" }],
            certs: [{ "name": "Google Data Analytics", "file": "g_data.pdf" }],
            preferences: [{ "currentCTC": "0", "expectedCTC": "4 LPA", "jobType": "Full-Time", "role": "Junior Data Analyst", "ready": "Yes", "relocate": "Yes" }],
            appliedJobs: [
                
            ],
            savedJobs: []
        },
        {
            id: "3",
            profile: { "fullName": "Surya vardhan KGF", "gender": "Male", "dob": "1996-11-30", "maritalStatus": "Married", "nationality": "Indian" },
            currentDetails: { "jobTitle": "Backend Engineer", "company": "CloudScale Systems", experience: "7 Years", "currentLocation": "Bangalore", "prefLocation": "Remote" },
            contact: { "mobile": "+91 9000112233", "altMobile": "", "email": "Surya.dev@email.com", "altEmail": "", "address": "HSR Layout Sector 2", "street": "27th Main", "city": "Bangalore", "state": "Karnataka", "pincode": "560102", "country": "India" },
            resume: { "size": "2MB", "portfolio": "" },
            education: { "highestQual": "Master's Degree", "sslc": { "institution": "Government Hr Sec", "percentage": "85%", "location": "Madurai", "year": "2012" }, "hsc": { "stream": "Pure Science", "institution": "Government Hr Sec", "location": "Madurai", "year": "2014", "percentage": "80%" }, "graduations": [{ "id": 1, "degree": "MCA", "status": "Completed", "dept": "Computer Apps", "percentage": "7.5 CGPA", "startYear": "2017", "endYear": "2019", "college": "Anna University", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "Senior Backend Developer", "company": "CloudScale Systems", "startDate": "2020-01-15", "endDate": "Present", "industry": "SaaS", "jobType": "Full-Time", "location": "Bangalore", "responsibilities": "Managing microservices and database optimization." }] },
            skills: ["Node.js", "MongoDB", "AWS", "Docker"],
            languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }],
            certs: [{ "name": "AWS Certified Developer", "file": "aws_dev.pdf" }],
            preferences: [{ "currentCTC": "12 LPA", "expectedCTC": "18 LPA", "jobType": "Remote", "role": "Backend Lead", "ready": "Yes", "relocate": "No" }],
            appliedJobs: [],
            savedJobs: []
        },
        {
            id: "4",
            profile: { "fullName": "Chutki Bheem", "gender": "Female", "dob": "2000-02-14", "maritalStatus": "Single", "nationality": "Indian" },
            currentDetails: { "jobTitle": "Content Writer", "company": "Media Works", experience: "9 Year", "currentLocation": "Chennai", "prefLocation": "Chennai" },
            contact: { "mobile": "+91 9444123456", "altMobile": "", "email": "Chuki.write@email.com", "altEmail": "", "address": "Anna Nagar East", "street": "3rd Cross", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600102", "country": "India" },
            resume: { "size": "900KB", "portfolio": "" },
            education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "Holy Cross", "percentage": "96%", "location": "Trichy", "year": "2016" }, "hsc": { "stream": "Arts", "institution": "Holy Cross", "location": "Trichy", "year": "2018", "percentage": "94%" }, "graduations": [{ "id": 1, "degree": "B.A. English", "status": "Completed", "dept": "Literature", "percentage": "82%", "startYear": "2018", "endYear": "2021", "college": "Loyola College", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "Content Creator", "company": "Media Works", "startDate": "2022-05-10", "endDate": "Present", "industry": "Marketing", "jobType": "Contract", "location": "Chennai", "responsibilities": "SEO writing and social media management." }] },
            skills: ["SEO", "Copywriting", "Canva", "WordPress"],
            languages: [{ "name": "English", "proficiency": "Fluent" }, { "name": "Tamil", "proficiency": "Native" }],
            certs: [{ "name": "HubSpot Content Marketing", "file": "hubspot.pdf" }],
            preferences: [{ "currentCTC": "3.5 LPA", "expectedCTC": "5 LPA", "jobType": "Full-Time", "role": "Senior Content Strategist", "ready": "Yes", "relocate": "No" }],
            appliedJobs: [],
            savedJobs: []
        },
        {
            id: "5",
            profile: { "fullName": "Thomas Antony", "gender": "Male", "dob": "1997-07-07", "maritalStatus": "Single", "nationality": "Indian" },
            currentDetails: { "jobTitle": "DevOps Engineer", "company": "InfraGenie", experience: "4 Years", "currentLocation": "Hyderabad", "prefLocation": "Chennai" },
            contact: { "mobile": "+91 8877665544", "altMobile": "", "email": "Thomas.devops@email.com", "altEmail": "", "address": "Madhapur", "street": "HITEC City", "city": "Hyderabad", "state": "Telangana", "pincode": "500081", "country": "India" },
            resume: { "size": "1.5MB", "portfolio": "" },
            education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "Zion Matric", "percentage": "88%", "location": "Kanchi", "year": "2013" }, "hsc": { "stream": "CS", "institution": "Zion Matric", "location": "Kanchi", "year": "2015", "percentage": "82%" }, "graduations": [{ "id": 1, "degree": "B.E. ECE", "status": "Completed", "dept": "Engineering", "percentage": "7.8 CGPA", "startYear": "2015", "endYear": "2019", "college": "Sathyabama University", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "DevOps Associate", "company": "InfraGenie", "startDate": "2020-08-01", "endDate": "Present", "industry": "IT", "jobType": "Full-Time", "location": "Hyderabad", "responsibilities": "CI/CD pipeline automation and Kubernetes management." }] },
            skills: ["Kubernetes", "Jenkins", "Terraform", "Linux"],
            languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }, { "name": "Telugu", "proficiency": "Basic" }],
            certs: [{ "name": "CKA Certification", "file": "cka.pdf" }],
            preferences: [{ "currentCTC": "9 LPA", "expectedCTC": "13 LPA", "jobType": "Full-Time", "role": "DevOps Architect", "ready": "Yes", "relocate": "Yes" }],
            appliedJobs: [],
            savedJobs: []
        },
        {
            id: "6",
            profile: { "fullName": "Karthiga", "gender": "Female", "dob": "1995-12-05", "maritalStatus": "Single", "nationality": "Indian" },
            currentDetails: { "jobTitle": "Product Manager", "company": "FinTech Hub", experience: "8 Years", "currentLocation": "Bangalore", "prefLocation": "Bangalore" },
            contact: { "mobile": "+91 9112233445", "altMobile": "", "email": "Karthiga.pm@email.com", "altEmail": "", "address": "Indiranagar", "street": "100ft Road", "city": "Bangalore", "state": "Karnataka", "pincode": "560038", "country": "India" },
            resume: { "size": "1.8MB", "portfolio": "" },
            education: { "highestQual": "MBA", "sslc": { "institution": "BVB School", "percentage": "94%", "location": "Erode", "year": "2011" }, "hsc": { "stream": "Commerce", "institution": "BVB School", "location": "Erode", "year": "2013", "percentage": "96%" }, "graduations": [{ "id": 1, "degree": "MBA", "status": "Completed", "dept": "Management", "percentage": "9.0 CGPA", "startYear": "2017", "endYear": "2019", "college": "IIM Bangalore", "city": "Bangalore", "state": "Karnataka", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "Product Manager", "company": "FinTech Hub", "startDate": "2019-05-01", "endDate": "Present", "industry": "Banking", "jobType": "Full-Time", "location": "Bangalore", "responsibilities": "Roadmap planning and stakeholder management." }] },
            skills: ["Agile", "Jira", "Market Research", "Product Strategy"],
            languages: [{ "name": "English", "proficiency": "Fluent" }, { "name": "Tamil", "proficiency": "Fluent" }, { "name": "Kannada", "proficiency": "Basic" }],
            certs: [{ "name": "CSPO", "file": "cspo.pdf" }],
            preferences: [{ "currentCTC": "22 LPA", "expectedCTC": "28 LPA", "jobType": "Full-Time", "role": "Senior PM", "ready": "Yes", "relocate": "No" }],
            appliedJobs: [],
            savedJobs: []
        },
        {
            id: "7",
            profile: { "fullName": "Sudhakar Kagitapu", "gender": "Male", "dob": "2002-01-20", "maritalStatus": "Single", "nationality": "Indian" },
            currentDetails: { "jobTitle": "QA Automation Engineer", "company": "TestX", experience: "Fresher", "currentLocation": "Chennai", "prefLocation": "Chennai" },
            contact: { "mobile": "+91 8080808080", "altMobile": "", "email": "Sudhakar.qa@email.com", "altEmail": "", "address": "T Nagar", "street": "Burkit Rd", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600017", "country": "India" },
            resume: { "size": "1.1MB", "portfolio": "" },
            education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "Don Bosco", "percentage": "91%", "location": "Chennai", "year": "2018" }, "hsc": { "stream": "CS", "institution": "Don Bosco", "location": "Chennai", "year": "2020", "percentage": "87%" }, "graduations": [{ "id": 1, "degree": "B.E. CSE", "status": "Completed", "dept": "Engineering", "percentage": "8.0 CGPA", "startYear": "2020", "endYear": "2024", "college": "Velammal Engineering", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Fresher", "hasExperience": "No", "entries": [] },
            skills: ["Selenium", "Java", "Manual Testing", "Python"],
            languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }],
            certs: [{ "name": "ISTQB Foundation", "file": "istqb.pdf" }],
            preferences: [{ "currentCTC": "0", "expectedCTC": "4.5 LPA", "jobType": "Full-Time", "role": "QA Engineer", "ready": "Yes", "relocate": "No" }],
            appliedJobs: [],
            savedJobs: []
        },
        {
            id: "8",
            profile: { "fullName": "Naveen chand", "gender": "male", "dob": "1998-04-12", "maritalStatus": "Single", "nationality": "Indian" },
            currentDetails: { "jobTitle": "Full Stack Developer", "company": "AppSmiths", experience: "2.5 Years", "currentLocation": "Pune", "prefLocation": "Remote" },
            contact: { "mobile": "+91 7766554433", "altMobile": "", "email": "abi.dev@email.com", "altEmail": "", "address": "Viman Nagar", "street": "Lane 4", "city": "Pune", "state": "Maharashtra", "pincode": "411014", "country": "India" },
            resume: { "size": "1.3MB", "portfolio": "https://abi-codes.io" },
            education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "SBOA", "percentage": "98%", "location": "Madurai", "year": "2014" }, "hsc": { "stream": "CS", "institution": "SBOA", "location": "Madurai", "year": "2016", "percentage": "95%" }, "graduations": [{ "id": 1, "degree": "B.Tech IT", "status": "Completed", "dept": "IT", "percentage": "9.1 CGPA", "startYear": "2016", "endYear": "2020", "college": "TCE Madurai", "city": "Madurai", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "Full Stack Dev", "company": "AppSmiths", "startDate": "2020-09-10", "endDate": "Present", "industry": "Software", "jobType": "Full-Time", "location": "Pune", "responsibilities": "MERN stack development." }] },
            skills: ["React", "Node.js", "Express", "PostgreSQL"],
            languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }],
            certs: [{ "name": "MERN Stack Mastery", "file": "mern.pdf" }],
            preferences: [{ "currentCTC": "7.5 LPA", "expectedCTC": "12 LPA", "jobType": "Remote", "role": "Senior Full Stack Developer", "ready": "Yes", "relocate": "No" }],
            appliedJobs: [],
            savedJobs: []
        },
        {
            id: "9",
            profile: { "fullName": "Gowtham Sam Sundar", "gender": "Male", "dob": "1994-09-18", "maritalStatus": "Married", "nationality": "Indian" },
            currentDetails: { "jobTitle": "Cybersecurity Analyst", "company": "SafeNet", experience: "6 Years", "currentLocation": "Bangalore", "prefLocation": "Bangalore" },
            contact: { "mobile": "+91 9898989898", "altMobile": "", "email": "Samsunder.sec@email.com", "altEmail": "", "address": "Whitefield", "street": "ITPL Main Rd", "city": "Bangalore", "state": "Karnataka", "pincode": "560066", "country": "India" },
            resume: { "size": "1.6MB", "portfolio": "" },
            education: { "highestQual": "Master's Degree", "sslc": { "institution": "DAV", "percentage": "82%", "location": "Chennai", "year": "2010" }, "hsc": { "stream": "CS", "institution": "DAV", "location": "Chennai", "year": "2012", "percentage": "78%" }, "graduations": [{ "id": 1, "degree": "M.Tech Cyber", "status": "Completed", "dept": "CS", "percentage": "8.5 CGPA", "startYear": "2016", "endYear": "2018", "college": "Amrita Vishwa Vidyapeetham", "city": "Coimbatore", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "Security Lead", "company": "SafeNet", "startDate": "2018-06-01", "endDate": "Present", "industry": "Security", "jobType": "Full-Time", "location": "Bangalore", "responsibilities": "Pentesting and vulnerability assessment." }] },
            skills: ["Metasploit", "Ethical Hacking", "Python", "SOC"],
            languages: [{ "name": "English", "proficiency": "Fluent" }, { "name": "Tamil", "proficiency": "Native" }, { "name": "Hindi", "proficiency": "Conversational" }],
            certs: [{ "name": "CEH", "file": "ceh.pdf" }],
            preferences: [{ "currentCTC": "18 LPA", "expectedCTC": "25 LPA", "jobType": "Full-Time", "role": "Security Manager", "ready": "Yes", "relocate": "No" }],
            appliedJobs: [],
            savedJobs: []
        },
        {
            id: "10",
            profile: { "fullName": "Lithin", "gender": "male", "dob": "1997-11-11", "maritalStatus": "Single", "nationality": "Indian" },
            currentDetails: { "jobTitle": "HR Generalist", "company": "Global Talent", experience: "4 Years", "currentLocation": "Chennai", "prefLocation": "Chennai" },
            contact: { "mobile": "+91 9333222111", "altMobile": "", "email": "Lithinandco.hr@email.com", "altEmail": "", "address": "Mylapore", "street": "Luz Church Rd", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600004", "country": "India" },
            resume: { "size": "1.2MB", "portfolio": "" },
            education: { "highestQual": "Master's Degree", "sslc": { "institution": "Rosary Matric", "percentage": "90%", "location": "Chennai", "year": "2013" }, "hsc": { "stream": "Commerce", "institution": "Rosary Matric", "location": "Chennai", "year": "2015", "percentage": "93%" }, "graduations": [{ "id": 1, "degree": "MBA HR", "status": "Completed", "dept": "Management", "percentage": "78%", "startYear": "2019", "endYear": "2021", "college": "Ethiraj College", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
            experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ "id": 1, "title": "HR Associate", "company": "Global Talent", "startDate": "2021-06-01", "endDate": "Present", "industry": "HR Services", "jobType": "Full-Time", "location": "Chennai", "responsibilities": "End-to-end recruitment and payroll." }] },
            skills: ["Recruitment", "Employee Engagement", "Payroll", "MS Office"],
            languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }],
            certs: [{ "name": "SHRM Certified", "file": "shrm.pdf" }],
            preferences: [{ "currentCTC": "6 LPA", "expectedCTC": "9 LPA", "jobType": "Full-Time", "role": "HR Manager", "ready": "Yes", "relocate": "No" }],
            appliedJobs: [],
            savedJobs: []
        }
    ]
    )
    const currentUserId = "2";
    const currentUser = Alluser.find(user => user.id === currentUserId);
    const savedJobs = currentUser.savedJobs;  //created to show the data in Myjobs.jsx
    const appliedJobs = currentUser.appliedJobs; //created to show the data in Myjobs.jsx
    //static employer data
    const [currentEmployer, setCurrentEmployer] = useState({
        id: "EMP001",
        companyId: "INF008",
        company: "Infotech",
        hrName: "Sudhakar",
        email: "hr@pixellogic.com",
        role: "employer",
        companyLogo: "",
        jobPosted: [],
        messages: [],
    });
    // Chats/messages between Employer and Jobseeker 1:1;
    const [chats, setChats] = useState([
        // Employer
        { id: currentEmployer.id, name: currentEmployer.hrName, role: "employer", messages: currentEmployer.messages },

        ...Alluser.map(user => ({
            id: parseInt(user.id),
            name: user.profile.fullName,
            role: "jobseeker",
            messages: [],
            isChatEnded: false
        }))
    ]);
    // Logic to post a Job from postpreview.jsx
    const postJob = (newJobData) => {
        const newId = jobs.length > 0 ? Math.max(...jobs.map(j => Number(j.id))) + 1 : 1;
        const postingSource = "Company Jobs";

        const stringId = String(newId);
        // const postingSource = userType === "employer" ? "Company Jobs" : "Consultant Jobs";
        const cleanIndustry = newJobData.category;
        const cleanDept = newJobData.department;
        const cleanEdu = newJobData.education;
        const cleanSkills = newJobData.skills;
        const cleanHighlights = newJobData.jobHighlights.filter(item => item.trim() !== "");
        const cleanRes = newJobData.responsibilities.filter(item => item.trim() !== "");
        const cleanOpenings = parseInt(newJobData.openings);
        const cleanTags = [newJobData.jobCategory];
        const JOB_STATUS = {
            hiring: { text: 'Hiring in Progress', type: 'progress' },
            reviewing: { text: 'Reviewing Application', type: 'reviewing' },
            done: { text: 'Hiring Done', type: 'done' }
        };
        const newJob = {
            id: stringId,
            title: newJobData.jobTitle,
            company: currentEmployer.company,
            companyId: currentEmployer.companyId,
            logo: "",
            posted: new Date().toISOString(),
            PostedBy: postingSource,
            IndustryType: cleanIndustry,
            Department: cleanDept,
            EducationRequired: cleanEdu,
            KeySkills: cleanSkills,
            JobHighlights: cleanHighlights,
            Responsibilities: cleanRes,
            WorkType: newJobData.workType,
            Shift: newJobData.shift,
            duration: newJobData.workDuration,
            salary: newJobData.salary,
            experience: newJobData.experience,
            location: newJobData.location,
            openings: cleanOpenings,
            applicants: newJobData.app,
            ratings: 4.2,
            reviewNo: 100,
            tags: cleanTags,
            companyOverview: "Infotech Overview",
            jobDescription: newJobData.jobDescription,
            jobStatus: JOB_STATUS.hiring
            // status: { text: 'Hiring in Progress', type: 'progress' }
        };
        setJobs((prev) => [newJob, ...prev]);
        
        setCurrentEmployer((prevEmployer) => ({
            ...prevEmployer,
            jobPosted: [newJob, ...prevEmployer.jobPosted]
        }));
        console.log(newJob)
        alert(`Job "${newJob.title}" posted successfully!`);
    };
    // 2. Edit status for an Existing Job, found in Postedjob.jsx
    const editJob = (jobId, status) => {
        setJobs((prev) =>
            prev.map((job) => (job.id === jobId ? { ...job, ...status } : job))
        );

        setAlluser((prevUsers) =>
            prevUsers.map((user) => {
                if (user.id === currentUserId) {
                    return {
                        ...user,
                        savedJobs: user.savedJobs.map((job) =>
                            job.id === jobId ? { ...job, ...status } : job
                        ),
                        appliedJobs: user.appliedJobs.map((job) =>
                            job.id === jobId ? { ...job, ...status } : job
                        ),

                    };
                }
                return user;
            })
            
        );
        setCurrentEmployer((prev) => ({
        ...prev,
        jobPosted: prev.jobPosted.map((job) =>
            job.id === jobId ? { ...job, ...status } : job
        ),
    }));
        {console.log( currentEmployer.jobPosted)}
    };
    // Toggle End Conversation Logic In Employer Chat Window
    const [isChatEnded, setIsChatEnded] = useState(false);
    const [employerNotifications, setEmployerNotifications] = useState([{
        id: "emp_initial",
        text: "Welcome Employer! Start posting jobs to find the best candidates.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
    }]);
    // NotificationData previously passed from AfterLoginLanding page
    const [notificationsData, setNotificationsData] = useState([{
        id: Date.now(),
        text: "Welcome to Job Portal",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
    }]);

    const [employershowNotification, setEmployerShowNotification] = useState(false);
    // New Messages Notification Logic
    const [showNotification, setShowNotification] = useState(false);

    const addEmployerNotification = (text) => {
        const newNotif = {
            id: msg.id,
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false
        };
        setEmployerNotifications(prev => [newNotif, ...prev]);
    };
    // to add NewNotification in NotificationData
    const addNotification = (text, targetId = null) => {
        const newNotif = {
            id: Date.now(),
            text: text,
            targetId: targetId,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false
        };
        setNotificationsData(prev => [newNotif, ...prev]);
    };
    const getFormattedDate = () => {
        return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };
    const isJobSaved = (jobId) => {
        const user = Alluser.find(u => u.id === currentUserId);
        return user ? user.savedJobs.some((job) => job.id === jobId) : false;
    };
    const isJobApplied = (jobId) => {
        const user = Alluser.find(u => u.id === currentUserId);
        return user ? user.appliedJobs.some((job) => job.id === jobId) : false;
    };

    //When jobseeker apply, adding some data in Schema both in joblist, appliedbos and also in employerposted jobs//
    const applyForJob = (originalJob) => {
        // 1. Check if already applied
        if (isJobApplied(originalJob.id)) return;
        console.log(originalJob)
        setAlluser((prevUsers) =>
            prevUsers.map((user) => {
                if (user.id === currentUserId) {
                    return {
                        ...user,
                        appliedJobs: [
                            ...(user.appliedJobs || []),
                            {
                                ...originalJob,
                                applicants: (originalJob.applicants || 0) + 1,
                                appliedDate: `Applied on ${getFormattedDate()}`,
                                status: "Application Submitted",
                                jobStatus: originalJob.jobStatus,
                                applicationStatus: [
                                    { label: 'Application Submitted', sub: "Success message...", status: 'completed' },
                                    { label: 'Resume Screening', sub: "Reviewing...", status: 'pending' },
                                    { label: 'Recruiter Review', sub: "Manual review...", status: 'pending' },
                                    { label: 'Shortlisted', sub: "Passed initial stages...", status: 'pending' },
                                    { label: 'Interview Called', sub: "Reached out...", status: 'pending' },
                                ]
                            }
                        ]
                    };
                }
                return user;
            })
            
        );

        // 2. Update Global Jobs List
        setJobs((prevJobs) =>
            prevJobs.map((job) =>
                job.id === originalJob.id
                    ? { ...job, applicants: (job.applicants || 0) + 1 }
                    : job
            )
        );

        // 3. Update Local Employer State (for the logged-in employer)
        if (currentEmployer.companyId === originalJob.companyId) {
            setCurrentEmployer(prev => ({
                ...prev,
                jobPosted: prev.jobPosted.map(job =>
                    job.id === originalJob.id
                        ? {
                            ...job,
                            applicants: (job.applicants || 0) + 1,
                            applicantsList: [
                                ...(job.applicantsList || []),
                                {
                                    userId: currentUserId,
                                    status: "Application Submitted", 
                                    appliedDate: getFormattedDate()
                                }
                            ]
                        }
                        : job
                )
            }));
        }

        alert(`Successfully applied to ${originalJob.title} at ${originalJob.company}!`);
    };

    const toggleSaveJob = (originalJob) => {
        setAlluser((prevUsers) =>
            prevUsers.map((user) => {
                if (user.id === currentUserId) {
                    const isSaved = user.savedJobs.some((job) => job.id === originalJob.id);

                    if (isSaved) {
                        return {
                            ...user,
                            savedJobs: user.savedJobs.filter((job) => job.id !== originalJob.id),
                        };
                    } else {
                        const newSavedJob = {
                            ...originalJob,
                            savedDate: `Saved on ${getFormattedDate()}`,
                        };
                        return {
                            ...user,
                            savedJobs: [...user.savedJobs, newSavedJob],
                        };
                    }
                }
                return user;
            })
        );
    };

    //*Note : need to check this function used in a component..?
    const addJob = (newJob) => {
        setJobs((prevJobs) => [...prevJobs, newJob]);
    };

    //**Delete job from Joblist,Jobseeker Applied/saved list, and also in employerposted jobs */
    const deleteJob = (jobId) => {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));

        setAlluser((prevUsers) =>
            prevUsers.map((user) => ({
                ...user,
                savedJobs: user.savedJobs.filter((job) => job.id !== jobId),
                appliedJobs: user.appliedJobs.filter((job) => job.id !== jobId),
            }))
        );
        if (currentEmployer) {
        setCurrentEmployer((prev) => ({
            ...prev,
            jobPosted: (prev.jobPosted).filter((job) => job.id !== jobId)
        }));
        
    }

        addNotification("Job posting has been successfully deleted.");
    };

    const [activeSidebarUsers, setActiveSidebarUsers] = useState([]);

    const addChatToSidebar = (userId) => {
        if (!activeSidebarUsers.includes(parseInt(userId))) {
            setActiveSidebarUsers(prev => [...prev, parseInt(userId)]);
        }
    };

    //**Update Dynamic application status, update status in both appliedjobs and employer postedjobs array */
    const updateApplicantStatus = (userId, jobId, newStatus) => {
        const workflow = [
            "Application Submitted",
            "Resume Screening",
            "Recruiter Review",
            "Shortlisted",
            "Interview Called"
        ];

        const currentIndex = workflow.indexOf(newStatus);
        const isRejected = newStatus === "Rejected";

        setAlluser(prevUsers =>
            prevUsers.map(user => {
                // SEEKER UPDATE
                if (user.id === userId) {
                    return {
                        ...user,
                        appliedJobs: user.appliedJobs.map(aj =>
                            aj.id === jobId
                                ? {
                                    ...aj,
                                    status: newStatus,
                                    applicationStatus: aj.applicationStatus.map((step, idx) => ({
                                        ...step,
                                        status: isRejected
                                            ? (idx <= currentIndex ? 'completed' : 'hidden')
                                            : (idx <= currentIndex ? 'completed' : 'pending')
                                    }))
                                }
                                : aj
                        )
                    };
                }
                if (currentEmployer) {
        setCurrentEmployer(prev => ({
            ...prev,
            jobPosted: prev.jobPosted.map(job =>
                job.id === jobId
                    ? { ...job,applicants: job.applicants  } 
                    : job
            )
        }));
    }
                // if (user.role === "employer" && user.id === currentEmployer?.id) {
                //     return {
                //         ...user,
                //         jobPosted: user.jobPosted.map(job =>
                //             job.id === jobId
                //                 ? { ...job, applicants: job.applicants } 
                //                 : job
                //         )
                //     };
                // }
                return user;
            })
        );
        
    };

    //**Not yet used In anycomponent need to check/ Remove */
    const withdrawJobFromUser = (userId, jobId) => {
        setAlluser(prevUsers =>
            prevUsers.map(user => {
                if (user.id === userId) {
                    return {
                        ...user,
                        appliedJobs: user.appliedJobs.filter(aj => aj.id !== jobId)
                    };
                }
                return user;
            })
        );
    };

    const withdrawApplication = (originalJob) => {
    // 1. Remove from User's applied list
    if (window.confirm("Are you sure you want to withdraw?")){
    setAlluser((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === currentUserId) {
          return {
            ...user,
            appliedJobs: (user.appliedJobs || []).filter(
              (job) => job.id !== originalJob.id
            ),
          };
        }

        // 2. Decrement applicant count for the employer
        if (currentEmployer.id === originalJob.companyId) {
          return {
            ...user,
            jobPosted: user.jobPosted.map((job) =>
              job.id === originalJob.id
                ? { ...job, applicants: Math.max((job.applicants || 0) - 1, 0) }
                : job
            ),
          };
        }
        return user;
      })
    );

    // 3. Update Global Jobs List
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === originalJob.id
          ? { ...job, applicants: Math.max((job.applicants || 0) - 1, 0) }
          : job
      )
    );

    // 4. Update Local Employer State
    if (currentEmployer.id === originalJob.companyId) {
      setCurrentEmployer((prev) => ({
        ...prev,
        jobPosted: prev.jobPosted.map((job) =>
          job.id === originalJob.id
            ? { ...job, applicants: Math.max((job.applicants || 0) - 1, 0) }
            : job
        ),
      }));
    }
    alert(`Successfully withdrawn your application for ${originalJob.title}.`);
    navigate('/Job-portal/jobseeker/withdrawn');
  }};

    //Dynamic Action count used in EDashboard & postedjobs Component//
    const getJobStats = (jobId) => {
        const jobExists = jobs.some(j => j.id === jobId);
    if (!jobExists) return { total: 0, new: 0, screening: 0, interview: 0, rejected: 0 };
    
        const jobApplicants = Alluser.filter(user =>
            user.appliedJobs?.some(aj => aj.id === jobId)
        );

        const getCountByStatus = (statusList) => {
            return jobApplicants.filter(user => {
                const jobInfo = user.appliedJobs.find(aj => aj.id === jobId);
                return statusList.includes(jobInfo?.status);
            }).length;
        };

        return {
            total: jobApplicants.length, 

            new: getCountByStatus(["Application Submitted"]),
            screening: getCountByStatus(["Resume Screening", "Recruiter Review",]),
            shortlisted: getCountByStatus(["Shortlisted"]),
            interview: getCountByStatus(["Interview Called"]),
            rejected: getCountByStatus(["Rejected"])
        };
    };

    const removeRejectedJob = (originalJob) => {
          if (window.confirm("Remove this rejected application from history?")) {
            // Update User's appliedJobs
            setAlluser(prev => prev.map(user => {
              if (user.id === currentUserId) {
                return {
                  ...user,
                  appliedJobs: user.appliedJobs?.filter(j => j.id !== originalJob.id)
                };
              }
              return user;
            }));
    
            navigate('/Job-portal/jobseeker/myjobs');
          }
        };

    return (
        <JobContext.Provider value={{
            jobs, chats, setChats, setJobs, isJobSaved, isChatEnded, setIsChatEnded, employeractiveMenuId, setEmployerActiveMenuId,
            employerNotifications, setEmployerNotifications, employershowNotification, setEmployerShowNotification,
            setNotificationsData, addNotification, toggleSaveJob, applyForJob, notificationsData, showNotification, setShowNotification,
            activeMenuId, setActiveMenuId, addJob, deleteJob, postJob, editJob, Alluser, setAlluser, activeSidebarUsers,
            addChatToSidebar, currentUser, withdrawJobFromUser, updateApplicantStatus, isJobApplied, companyProfile, setCompanyProfile, currentEmployer,
            getJobStats, savedJobs, appliedJobs, currentUserId, setCurrentEmployer,withdrawApplication,removeRejectedJob
        }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);

