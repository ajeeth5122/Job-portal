import React from 'react'
import './EHeader.css'
import search from '../assets/icon_search.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import bell_dot from '../assets/header_bell_dot.png'
import profile from '../assets/header_profile.png'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useJobs } from '../JobContext'
import { ENotification } from './ENotification'


export const EHeader = () => {
     const { employershowNotification, setEmployerShowNotification, employerNotifications } = useJobs();
    const location = useLocation();

    const newNotificationsCount = employerNotifications
    ? employerNotifications.filter(n => !n.isRead).length
    : 0;
    
     const toggleNotification = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEmployerShowNotification(!employershowNotification);
    };

    return (
        <header className="header">
            <div className="logo">job portal</div>
            <div className='E-Header-search'>
                <img className="E-searchicon" src={search} alt="search icon" />
                <input className="input" type="text" placeholder='Search for jobs and applicants' />
            </div>
             <div className="auth-links">
                {/* Chat Icon */}
                <Link to="/Job-portal/Employer/Chat">
                    <img
                        className={location.pathname === "/Job-portal/Employer/Chat" ? 'jheader-icons-active' : 'jheader-icons'}
                        src={chat}
                        width={40}
                        alt='Chat'
                    />
                </Link>

                {/* Notification Bell Icon */}
                <div className="notification-wrapper" style={{ position: 'relative' }}>
                    <Link to="#" onClick={toggleNotification}>
                        <img
                            className={employershowNotification ? 'jheader-icons-active' : 'jheader-icons'}
                            src={newNotificationsCount > 0 ?  bell_dot : bell }
                            width={40}
                            alt='Notifications'
                        />
                    </Link>

                    {employershowNotification && <ENotification />}
                </div>
                </div>

        </header>
    )
}