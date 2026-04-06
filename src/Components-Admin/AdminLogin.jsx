import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import manSitting from '../assets/Illustration_1.png'; 
import eye from '../assets/show_password.png';
import eyeHide from '../assets/eye-hide.png';
import './AdminLogin.css'

export const AdminLogin = () => {
    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(true);
    // 1. Added mobile to formValues
    const [formValues, setFormValues] = useState({ adminID: "", password: "", mobile: "" });
    const [errors, setErrors] = useState({});
    
    const AdminID = "Admin5122";
    const AdminPwd = "Admin@123";

    const togglePasswordView = () => {
        setPasswordShow((prev) => !prev);
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    // 2. Function for Verify Button
    // const handleVerify = () => {
    //     const mobileRegex = /^[6-9]\d{9}$/; 
    //     if (!formValues.mobile) {
    //         setErrors(prev => ({ ...prev, mobile: "Mobile number is required for verification" }));
    //     } else if (!mobileRegex.test(formValues.mobile)) {
    //         setErrors(prev => ({ ...prev, mobile: "Enter a valid 10-digit number" }));
    //     } else {
    //         alert("Verification OTP sent to " + formValues.mobile);
    //         navigate('/Job-portal/login/otpverification', { 
    //     state: { 
    //         mobile: formValues.mobile, 
    //         sentTo: formValues.mobile,
    //         role: "admin" 
    //     } 
    // });
    //     }
    // };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.adminID.trim()) {
            newErrors.adminID = "Admin ID or Email is required";
        }
        if (formValues.adminID.trim() !== AdminID) {
            newErrors.adminID = "Invalid Admin ID or Email";
        }
        if (!formValues.password.trim()) {
            newErrors.password = "Password is required";
        }
        if (formValues.password.trim() !== AdminPwd) {
            newErrors.password = "Invalid Password";
        }
       

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Admin Login Data:", formValues);
            navigate("/Job-portal/admin/dashboard");
        }
    };

    return (
        <div className="login-page">
            <header className="login-header">
                <Link to="/Job-portal" className="logo">
                    <span className="logo-text">job portal</span>
                     <span className='subtext'> for Administrator</span>
                </Link>
                <div className="header-links">
                <p className="employer-redirect-link" >Login to manage users and postings</p>
                </div>
            </header>

            <div className="Admin-Login-Module">
                <form onSubmit={handleSubmit} className="admin-login-form">
                    <h2>Login as Administrator</h2>
                    <p style={{color: '#666', textAlign:"center", fontSize: '14px'}}>Login to manage users and postings</p>

                    <label>Admin ID / Email</label>
                    <input
                        type="text" 
                        name="adminID" 
                        placeholder="Enter Admin ID" 
                        value={formValues.adminID} 
                        onChange={handleForm} 
                        className={errors.adminID ? "input-error" : ""} 
                    />
                    {errors.adminID && <span className="error-msg">{errors.adminID}</span>}
                    
                    <label>Password</label>
                    <div className="password-wrapper">
                        <input 
                            type={passwordShow ? "password" : "text"} 
                            placeholder="Admin@123" 
                            name='password' 
                            value={formValues.password} 
                            onChange={handleForm} 
                            className={errors.password ? "input-error" : ""} 
                        />
                        <span className="eye-icon" onClick={togglePasswordView}>
                            <img src={passwordShow ? eye : eyeHide} className='show-icon' alt='toggle' />
                        </span>
                    </div>
                    {errors.password && <span className="error-msg">{errors.password}</span>}

                    <div className="form-options">
                        <label><input type="checkbox" /> Remember Session</label>
                    </div>

                    <button style={{marginBottom:"10px"}} type="submit" className="j-login-btn">Admin Login</button>

                {/* <div className="divider">Or Continue with</div> */}

                {/* <h3 style={{textAlign:"center"}}>Login With Mobile</h3> */}
                {/* <div>
                    
                    <div className="mobile-input-wrapper" style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="tel" 
                            name="mobile" 
                            placeholder="Enter Mobile Number" 
                            value={formValues.mobile} 
                            onChange={handleForm} 
                            className={errors.mobile ? "input-error" : ""}
                            style={{ flex: 1, marginTop:"10px" }}
                        />
                        <button 
                            type="button" 
                            className="verify-btn" 
                            onClick={handleVerify}
                            style={{ padding: '0 15px', marginTop:"10px",backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Verify
                        </button>
                    </div>
                    {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
                </div> */}
                
                </form>
                
            </div>
        </div>
    );
};