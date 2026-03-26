import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatarIcon from "../assets/header_profile.png";
import profileIcon from "../assets/icon_profile.png";
import settingsIcon from "../assets/icon_settings.png";
import helpIcon from "../assets/icon_help.png";
import "./AvatarMenu.css";
import {LogoutModal} from "../Components-JobseekerSignup/LogoutModal";

export const AvatarMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal state
  const menuRef = useRef(null);

  // Click outside logic to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    navigate('/Job-portal');
  };

  return (
    <div className="avatar-container" ref={menuRef}>
      <img
        src={avatarIcon}
        alt="avatar"
        className="avatar-icon"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="avatar-menu">
          <Link to="/Job-portal/jobseeker/myprofile" className="menu-items" onClick={() => setOpen(false)}>
            <img src={profileIcon} className="menu-icon" alt="profile" />
            Profile
          </Link>

          <Link to="/Job-portal/jobseeker/Settings" className="menu-items" onClick={() => setOpen(false)}>
            <img src={settingsIcon} className="menu-icon" alt="settings" />
            Settings
          </Link>

          <Link to="/Job-portal/jobseeker/help-center" className="menu-items" onClick={() => setOpen(false)}>
            <img src={helpIcon} className="menu-icon" alt="help" />
            Help Centre
          </Link>

          <div className="menu-divider"></div>

          <button 
            onClick={() => {
              setShowLogoutModal(true);
              setOpen(false); 
            }} 
            className="avatar-logout-btn"
          >
            Logout
          </button>
        </div>
      )}

      <LogoutModal 
        show={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={handleLogoutConfirm} 
      />
    </div>
  );
};