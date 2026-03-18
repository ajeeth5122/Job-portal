import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import manSitting from '../assets/Illustration_1.png'
import eye from '../assets/show_password.png'
import eyeHide from '../assets/eye-hide.png'
import Email from '../assets/icon_email_id.png'
import Google from '../assets/GOOG.png'
import mobile from '../assets/icon_mobile_otp.png'
import './Jlogin.css'

export const Jlogin = () => {

  const navigate = useNavigate();

  const [view, setView] = useState('default');

  const [passwordShow, setPasswordShow] = useState(true)


  const initialValues = { username: "", password: "", phone: "", google: "" }
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState({})


  const togglePasswordView = () => {
    setPasswordShow((prev) => !prev)
  }

  const handleForm = (e) => {
    const { name, value } = e.target
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 10) {
        setFormValues({ ...formValues, [name]: onlyNums });
        setErrors({ ...errors, [name]: "" });
      }
      return;
    }
    setFormValues({ ...formValues, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }


  const validateForm = () => {
    const newErrors = {}

    if (!formValues.username.trim()) {
      newErrors.username = "Username or Email is required"
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGetOtp = () => {
    const newErrors = {};

    // 1. Email Validation (for Email-OTP view)
    if (view === 'email-otp') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formValues.username.trim()) {
        newErrors.username = "Email ID is required";
      } else if (!emailRegex.test(formValues.username)) {
        newErrors.username = "Please enter a valid email address";
      }
    }

    // 2. Mobile Validation (for Mobile-OTP view)
    if (view === 'mobile-otp') {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!formValues.phone.trim()) {
        newErrors.phone = "Mobile number is required";
      } else if (!mobileRegex.test(formValues.phone)) {
        newErrors.phone = "Enter a valid 10-digit mobile number";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const source = view === 'mobile-otp' ? "Mobile" : "Email";
    alert(`OTP Sent to ${source}`);
    navigate('/Job-portal/login/otpverification');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    navigate("/Job-portal/jobseeker/");
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/Job-portal" className="logo">
          <span className="logo-text">job portal</span>
        </Link>
        <div className="header-links">
          <span className='no-account'>Don’t have an account?</span>
          <Link to="/Job-portal/jobseeker/signup" className="signup-btn">Sign up</Link>
          <div className="separator"></div>
          <Link to='/Job-portal/employer/login' className="employer-redirect-link">Employers Login</Link>
        </div>
      </header>

      <div className="login-body">
        <div className="login-illustration">
          <img src={manSitting} alt="Login Illustration" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {view !== 'default' && (
            <button
              type="button"
              className="back-to-login"
              onClick={() => {
                setView('default');
                setErrors({}); // Clear errors when going back
              }}
            >
               Back
            </button>
          )}
          <h2>Login to continue</h2>

          {/* VIEW 1: DEFAULT USERNAME & PASSWORD */}
          {view === 'default' && (
            <>
              <label>User name </label>
              <input type="text" name="username" placeholder="Enter your User name " value={formValues.username} onChange={handleForm} className={errors.username ? "input-error" : ""} />
              {errors.username && <span className="error-msg">{errors.username}</span>}

              <label>Password</label>
              <div className="password-wrapper">
                <input type={passwordShow ? "password" : "text"} placeholder="Enter your password" name='password' value={formValues.password} onChange={handleForm} className={errors.password ? "input-error" : ""} />
                <span className="eye-icon" onClick={togglePasswordView}><img src={passwordShow ? eye : eyeHide} className='show-icon' alt='show' /></span>
              </div>
              {errors.password && <span className="error-msg">{errors.password}</span>}

              <div className="form-options">
                <label><input type="checkbox" /> Remember me</label>
                <Link to="/Job-portal/jobseeker/login/forgotpassword" className='forgot-password'>Forgot Password?</Link>
              </div>

              <button type="submit" className="j-login-btn">Login</button>

              <div className="divider">Or Continue with</div>
              <button type="button" className="google-btn-outline" onClick={() => setView('email-otp')}>
                <img src={Email} alt="Email" /> Email ID
              </button>
              <div className="divider"> Or </div>
              <button type="button" className="mobile-btn-outline" onClick={() => setView('mobile-otp')}>
                <img src={mobile} alt="mobile" /> Mobile number
              </button>
            </>
          )}

          {/* VIEW 2: EMAIL GET OTP */}
          {view === 'email-otp' && (
            <>
              <label>Email ID</label>
              <input type="text" name="username" placeholder="johnsmith@gmail.com" value={formValues.username} onChange={handleForm} className={errors.username ? "input-error" : ""} />
              {errors.username && <span className="error-msg">{errors.username}</span>}

              {/* <button type="button" className="j-login-btn" onClick={() => alert("OTP Sent to Email")}>Get OTP</button> */}
              <button
                type="button"
                className="j-login-btn"
                onClick={handleGetOtp}
              >
                Get OTP
              </button>

              <div className="divider">Or Continue with</div>
              <button type="button" className="mobile-btn-outline" onClick={() => setView('mobile-otp')}>
                <img src={mobile} alt="mobile" /> Phone number
              </button>
            </>
          )}

          {/* VIEW 3: MOBILE GET OTP */}
          {view === 'mobile-otp' && (
            <>
              <label>Mobile number</label>
              <input type="text" name="phone" placeholder="Enter your Mobile number" value={formValues.phone} onChange={handleForm} inputMode="numeric" maxLength="10" className={errors.phone ? "input-error" : ""} />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}

              <button
                type="button"
                className="j-login-btn"
                onClick={handleGetOtp}
              >
                Get OTP
              </button>

              <div className="divider">Or Continue with</div>
              <button type="button" className="google-btn-outline" onClick={() => setView('email-otp')}>
                <img src={Google} alt="Google" /> Google
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}