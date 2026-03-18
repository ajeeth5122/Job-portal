import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Esignup.css'
import workTime from '../assets/WorkTime.png'
import eye from '../assets/show_password.png'
import eyeHide from '../assets/eye-hide.png'
import emailIcon from '../assets/icon_email_otp.png'
import mobileIcon from '../assets/icon_mobile_otp.png'
import Verified from '../assets/verified-otpimage.png'


export const Esignup = () => {
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(true)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true)

  const [showEmailOtp, setShowEmailOtp] = useState(false)
  const [showMobileOtp, setShowMobileOtp] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isMobileVerified, setIsMobileVerified] = useState(false)
  const [otpValues, setOtpValues] = useState({ emailOtp: "", mobileOtp: "" })
  const [timer, setTimer] = useState(0);

  // --- TIMER LOGIC ---
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && (showEmailOtp || showMobileOtp)) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, showEmailOtp, showMobileOtp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePasswordView = () => {
    setPasswordShow((prev) => !prev)
  }

  const toggleConfirmPasswordView = () => {
    setConfirmPasswordShow((prev) => !prev)
  }

  const initialValues = { companyname: "", username: "", email: "", password: "", confirmpassword: "", phone: "" }
  const [formValues, setFormValues] = useState(initialValues)

  const [errors, setErrors] = useState({})

  const handleForm = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  const handleOtpChange = (e) => {
    setOtpValues({ ...otpValues, [e.target.name]: e.target.value })
  }

  const sendOtp = (type) => {
    alert(`Employer verification OTP sent to your ${type}!`);
    setTimer(10);
    const otpKey = type === 'email' ? "emailOtp" : "mobileOtp";
    setOtpValues(prev => ({ ...prev, [otpKey]: "" }));
    type === 'email' ? setShowEmailOtp(true) : setShowMobileOtp(true);
  }

  const verifyOtp = (type) => {
    const code = type === 'email' ? otpValues.emailOtp : otpValues.mobileOtp;
    if (code === "123456") {
      type === 'email' ? setIsEmailVerified(true) : setIsMobileVerified(true);
      setTimeout(() => {
        type === 'email' ? setShowEmailOtp(false) : setShowMobileOtp(false);
        setTimer(0);
        const otpKey = type === 'email' ? "emailOtp" : "mobileOtp";
        setOtpValues(prev => ({ ...prev, [otpKey]: "" }));
      }, 1500);
    } else {
      alert("Invalid OTP. Try '123456'");
    }
  }

  const validateForm = () => {
    const newErrors = {}

    const regexOfMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const regexofUppercase = /^(?=.*[A-Z]).+$/
    const regexofNumber = /^(?=.*\d).+$/
    const regexofSpecialChar = /^(?=.*[!@#$%^&*]).+$/
    const regexofUserName = /^(?=[a-zA-Z])\S+$/
    const regexofMobile = /^\d{10}$/

    if (!formValues.companyname.trim()) {
      newErrors.companyname = "Company or Organization's name is required"
    }

    if (!formValues.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formValues.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters"
    } else if (formValues.username.length > 20) {
      newErrors.username = "Username should not exceed 20 characters"
    } else if (!regexofUserName.test(formValues.username)) {
      newErrors.username = "Invalid username Format"
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!regexOfMail.test(formValues.email)) {
      newErrors.email = "Invalid email format"
    } else if (!isEmailVerified) {
      newErrors.email = "Please verify company email";
    }


    if (!formValues.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!regexofUppercase.test(formValues.password)) {
      newErrors.password = "Password must contain at least one uppercase letter"
    } else if (!regexofNumber.test(formValues.password)) {
      newErrors.password = "Password must contain at least one number"
    } else if (!regexofSpecialChar.test(formValues.password)) {
      newErrors.password = "Password must contain at least one special character"
    }


    if (!formValues.confirmpassword.trim()) {
      newErrors.confirmpassword = "Confirm Password is required"
    } else if (formValues.password !== formValues.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match"
    }

    // if (formValues.phone && !regexofMobile.test(formValues.phone)) {
    //   newErrors.phone = "Invalid format";
    // } else if (formValues.phone && !isMobileVerified) {
    //   newErrors.phone = "Please verify mobile number";
    // }
    if (!formValues.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!regexofMobile.test(formValues.phone)) {
      newErrors.phone = "Invalid mobile number format (10 digits required)";
    } else if (!isMobileVerified) {
      newErrors.phone = "Please verify your mobile number via OTP";
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Signed up successfully", formValues);
      navigate("/Job-portal/Employer/about-your-company");
    } else {
      console.log("Validation failed");
    }
  };

  const renderEmployerOtpModal = (type) => {
    const isEmail = type === 'email';
    const targetValue = isEmail ? formValues.email : formValues.phone;
    const otpKey = isEmail ? "emailOtp" : "mobileOtp";
    const isCurrentlyVerified = isEmail ? isEmailVerified : isMobileVerified;

    // SUCCESS POPUP VIEW
    if (isCurrentlyVerified) {
      return (
        <div className="otp-modal-overlay">
          <div className="otp-modal-content success-popup-style">
            <div className="verified-container">
              <img
                src={Verified}
                alt="Verified Success"
                className="verified-popup-img"
              />
              {/* <h1 className="verified-text-green">Verified</h1> */}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="e-otp-modal-overlay">
        <div className="e-otp-modal-content">
          <button className="e-back-arrow" onClick={() => { setTimer(0); isEmail ? setShowEmailOtp(false) : setShowMobileOtp(false); }}> Back</button>
          <div className="e-otp-icon-container">
            <img src={isEmail ? emailIcon : mobileIcon} alt="Verify" className="e-otp-status-icon" />
          </div>
          <h3>{isEmail ? "Employer Email Verification" : "Employer Mobile Verification"}</h3>
          {timer > 0 ? (
            <>
              <p>We've sent a code to <strong>{targetValue}</strong>. Please enter it below.</p>

              <div className="otp-input-group">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-${type}-${index}`} // Unique ID (otp-email-0, otp-mobile-0, etc.)
                    maxLength="1"
                    value={otpValues[otpKey][index] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^[0-9]$/.test(val) || val === "") {
                        const newOtpArray = otpValues[otpKey].split("");
                        newOtpArray[index] = val;
                        const combinedOtp = newOtpArray.join("");

                        setOtpValues({ ...otpValues, [otpKey]: combinedOtp });

                        // Auto-focus next box
                        if (val && index < 5) {
                          document.getElementById(`otp-${type}-${index + 1}`).focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      // Auto-focus previous box on Backspace
                      if (e.key === "Backspace" && !otpValues[otpKey][index] && index > 0) {
                        document.getElementById(`otp-${type}-${index - 1}`).focus();
                      }
                    }}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="resend-timer">
                Did not receive code?{' '}
                <span
                  className="resend-link"
                  style={{ cursor: 'pointer', color: '#0081FF', fontWeight: 'bold' }}
                  onClick={() => sendOtp(type)}
                >
                  Resend OTP
                </span>
                {timer > 0 && <span> in {formatTime(timer)}</span>}
              </div>

              <button type="button" className="verify-final-btn" onClick={() => verifyOtp(type)}>
                Verify
              </button>
            </>
          ) : (
            <div className="e-expired-state">
              <p className="error-msg">OTP Expired</p>
              <button type="button" className="e-verify-final-btn" onClick={() => sendOtp(type)}>Resend OTP</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="j-sign-up-page">
      {showEmailOtp && renderEmployerOtpModal('email')}
      {showMobileOtp && renderEmployerOtpModal('mobile')}
      <header className="j-sign-up-header">
        <Link to="/Job-portal" className="logo">
          <span className="logo-text">job portal</span>
          <span className='subtext'>for Employers</span>
        </Link>
        <div className="j-sign-up-header-links">
          <span className='no-account'>Already have an account?</span>
          <Link to="/Job-portal/employer/login" className="signup-btn">Login</Link>
          <div className="separator"></div>
          <Link to='/Job-portal/jobseeker/login' className="employer-redirect-link">Job seekers Login</Link>
        </div>
      </header>

      <div className="j-sign-up-body">
        <div className="signup-illustration">
          <img src={workTime} alt="Signup Illustration" />
        </div>

        <form onSubmit={handleSubmit} className="j-sign-up-form">
          <h2>Create an employer account</h2>

          <label>Company name</label>
          <input type="text" name="companyname" value={formValues.companyname} onChange={handleForm} placeholder="Enter your Company name or Organization's name" className={errors.companyname ? "input-error" : ""} />
          {errors.companyname && <span className="error-msg">{errors.companyname}</span>}

          <label>User name</label>
          <input type="text" name="username" value={formValues.username} onChange={handleForm} placeholder="Create your Username" className={errors.username ? "input-error" : ""} />
          {errors.username && <span className="error-msg">{errors.username}</span>}

          {/* <label>Email ID</label>
          <input type="text" name="email" value={formValues.email} onChange={handleForm} placeholder="Enter your Email ID" className={errors.email ? "input-error" : ""} />
          {errors.email && <span className="error-msg">{errors.email}</span>} */}
          <label>Email ID</label>
          <div className="input-container">
            <input type="text" name="email" value={formValues.email} onChange={handleForm} placeholder="Enter Company Email" className={errors.email ? "input-error" : ""} disabled={isEmailVerified} />
            {!isEmailVerified && formValues.email.length > 0 && (
              <button type="button" className="jsignup-small-verify-btn" onClick={() => sendOtp('email')}>Verify</button>
            )}
            {isEmailVerified && <span className="verified-badge">Verified </span>}
          </div>
          {errors.email && <span className="error-msg">{errors.email}</span>}

          <label>Password</label>
          <div className="password-wrapper">
            <input type={passwordShow ? "password" : "text"} name="password" value={formValues.password} onChange={handleForm} placeholder="Create a new password" className={errors.password ? "input-error" : ""} />
            <span className="eye-icon" onClick={togglePasswordView}><img src={passwordShow ? eye : eyeHide} className='show-icon' alt='show' /></span>
          </div>
          {errors.password && <span className="error-msg">{errors.password}</span>}

          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input type={confirmPasswordShow ? "password" : "text"} name="confirmpassword" value={formValues.confirmpassword} onChange={handleForm} placeholder="Confirm password" className={errors.confirmpassword ? "input-error" : ""} />
            <span className="eye-icon" onClick={toggleConfirmPasswordView}><img src={confirmPasswordShow ? eye : eyeHide} className='show-icon' alt='show' /></span>
          </div>
          {errors.confirmpassword && <span className="error-msg">{errors.confirmpassword}</span>}

          {/* <label>Mobile number (optional)</label>
          <input type="tel" name="phone" value={formValues.phone} onChange={handleForm} placeholder="Enter your mobile number" className={errors.phone ? "input-error" : ""} />
          {errors.phone && <span className="error-msg">{errors.phone}</span>} */}
          <label>Mobile number</label>
          <div className="input-container">
            <input
              type="tel"
              name="phone"
              value={formValues.phone}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const validatedValue = /^[6-9]/.test(rawValue) ? rawValue : "";

                setFormValues({ ...formValues, phone: validatedValue.slice(0, 10) });
                setErrors({ ...errors, phone: "" });
              }}
              placeholder="Enter mobile number"
              className={errors.phone ? "input-error" : ""}
              disabled={isMobileVerified}
            />

            {!isMobileVerified && formValues.phone.length > 0 && (
              <button
                type="button"
                className="jsignup-small-verify-btn"
                onClick={() => {
                  if (!/^\d{10}$/.test(formValues.phone)) {
                    setErrors({
                      ...errors,
                      phone: "Enter a valid 10-digit mobile number",
                    });
                    return;
                  }
                  sendOtp("mobile");
                }}
              >
                Verify
              </button>
            )}

            {isMobileVerified && <span className="verified-badge">Verified</span>}
          </div>
          {errors.phone && <span className="error-msg">{errors.phone}</span>}

          {/* <button
            className="j-sign-up-submit"
            onClick={() => navigate("/Job-portal/Employer/about-your-company")}
          >
            Create Account
          </button> */}


          <button type="submit" className="j-sign-up-submit">
            Create Account
          </button>

        </form>
      </div>
    </div>
  );
}