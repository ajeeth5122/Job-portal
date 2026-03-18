import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import workTime from '../assets/WorkTime.png'
import Google from '../assets/icon_email_id.png'
import eye from '../assets/show_password.png'
import eyeHide from '../assets/eye-hide.png'
import emailIcon from '../assets/icon_email_otp.png'
import mobileIcon from '../assets/icon_mobile_otp.png'
import Verified from '../assets/verified-otpimage.png'
import './Jsignup.css'
import './OtpModal.css'

export const Jsignup = () => {
  const [passwordShow, setPasswordShow] = useState(true)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true)

  // OTP States
  const [showEmailOtp, setShowEmailOtp] = useState(false)
  const [showMobileOtp, setShowMobileOtp] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isMobileVerified, setIsMobileVerified] = useState(false)
  const [otpValues, setOtpValues] = useState({ emailOtp: "", mobileOtp: "" })
  const [timer, setTimer] = useState(0);

  // Countdown Timer Logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && (showEmailOtp || showMobileOtp)) {
      if (timer === 0 && (showEmailOtp || showMobileOtp))
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, showEmailOtp, showMobileOtp]);

  // Helper to format 60 into 01:00 or 00:59
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

  const initialValues = { username: "", email: "", password: "", confirmpassword: "", phone: "" }
  const [formValues, setFormValues] = useState(initialValues)

  const [errors, setErrors] = useState({})

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

  // Handle OTP Input Changes
  const handleOtpChange = (e) => {
    setOtpValues({ ...otpValues, [e.target.name]: e.target.value })
  }

  // Mock Verification Logic
  const sendOtp = (type) => {
    alert(`OTP sent to your ${type}!`);
    setTimer(180);
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
        // Clear OTP for next time
        const otpKey = type === 'email' ? "emailOtp" : "mobileOtp";
        setOtpValues(prev => ({ ...prev, [otpKey]: "" }));
      }, 1500);

    } else {
      alert("Invalid OTP. Try '123456'");
    }
  };

  const validateForm = () => {
    const newErrors = {}

    const regexOfMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const regexofUppercase = /^(?=.*[A-Z]).+$/
    const regexofNumber = /^(?=.*\d).+$/
    const regexofSpecialChar = /^(?=.*[!@#$%^&*]).+$/
    const regexofUserName = /^(?=[a-zA-Z])\S+$/
    const regexofMobile = /^[6-9]\d{9}$/

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
      newErrors.email = "Email is required";
    } else if (!regexOfMail.test(formValues.email)) {
      newErrors.email = "Invalid email format";
    } else if (!isEmailVerified) {
      newErrors.email = "Please verify your email via OTP";
    }


    if (!formValues.password.trim()) {
      newErrors.password = "Password is required"
    } else if (!strongPasswordRegex.test(formValues.password)) {
      newErrors.password = "Must be 8+ chars with 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special character";
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
    // }
    // Mobile validation updates
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

  function handleSubmit(formData) {
    if (!validateForm()) {
      return false // stops form submit if errors
    }
    alert("Signup successful!");
    console.log("Signed up successfully", formValues) // This Code is removed after backend integration
  }

  const renderOtpModal = (type) => {
    const isEmail = type === 'email';
    const targetValue = isEmail ? formValues.email : formValues.phone;
    const otpKey = isEmail ? "emailOtp" : "mobileOtp";
    const isCurrentlyVerified = isEmail ? isEmailVerified : isMobileVerified;

    // SUCCESS POPUP VIEW
    if (isCurrentlyVerified) {
      return (
        <div className="otp-modal-overlay">
          <div className="otp-modal-content success-popup-content">
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
      <div className="otp-modal-overlay">
        <div className="otp-modal-content">
          <button className="back-arrow" onClick={() => {
            setTimer(0);
            setOtpValues({ ...otpValues, [otpKey]: "" });
            isEmail ? setShowEmailOtp(false) : setShowMobileOtp(false);
          }}>Back</button>
          <div className="otp-icon-container">
            <img
              src={isEmail ? emailIcon : mobileIcon}
              alt={isEmail ? "Email Verification" : "Mobile Verification"}
              className="otp-status-icon"
            />
          </div>
          <h3>{isEmail ? "Email Verification" : "Mobile Verification"}</h3>
          {timer > 0 ? (
            <>
              <p>We've sent a code to <strong>{targetValue}</strong>. Please enter it below.</p>

              <div className="otp-input-group">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-${type}-${index}`} // Unique ID for focus targeting
                    maxLength="1"
                    value={otpValues[otpKey][index] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^[0-9]$/.test(val) || val === "") {
                        const newOtp = otpValues[otpKey].split("");
                        newOtp[index] = val;
                        const combinedOtp = newOtp.join("");

                        setOtpValues({ ...otpValues, [otpKey]: combinedOtp });

                        // Move focus forward
                        if (val && index < 5) {
                          document.getElementById(`otp-${type}-${index + 1}`).focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
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
                  style={{ cursor: 'pointer', color: '#0081FF' }}
                  onClick={() => sendOtp(type)} // This now clears the boxes
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
            /* TERMINATED STATE UI */
            <div className="expired-state">
              <p className="error-msg-otp">OTP Session Expired</p>
              <p>The verification code is no longer valid. Please request a new one.</p>
              <button type="button" className="verify-final-btn" onClick={() => sendOtp(type)}>
                Resend New OTP
              </button>
            </div>
          )}

          {/* // switch mothod toggle */}
          {/* <p
            className="switch-method"
            onClick={() => {
              setTimer(0);

              if (isEmail) {
                // switching to mobile
                if (!formValues.phone) {
                  alert("Please enter mobile number first");
                  return;
                }
                setShowEmailOtp(false);
                setShowMobileOtp(true);
              } else {
                // switching to email
                if (!formValues.email) {
                  alert("Please enter email first");
                  return;
                }
                setShowMobileOtp(false);
                setShowEmailOtp(true);
              }
            }}
          >
            Or verify with {isEmail ? "Mobile" : "Email"}
          </p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="j-sign-up-page">
      {/* Modals trigger based on state */}
      {showEmailOtp && renderOtpModal('email')}
      {showMobileOtp && renderOtpModal('mobile')}
      <header className="j-sign-up-header">
        <Link to="/Job-portal" className="logo">
          <span className="logo-text">job portal</span>
        </Link>
        <div className="j-sign-up-header-links">
          <span className='no-account'>Already have an account?</span>
          <Link to="/Job-portal/jobseeker/login" className="signup-btn">Login</Link>
          <div className="separator"></div>
          <Link to='/Job-portal/employer/login' className="employer-redirect-link">Employers Login</Link>
        </div>
      </header>

      <div className="j-sign-up-body">
        <div className="signup-illustration">
          <img src={workTime} alt="Signup Illustration" />
        </div>

        <form action={handleSubmit} className="j-sign-up-form">
          <h2>Sign up for Jobseeker</h2>

          <label>User name</label>
          <input type="text" name="username" value={formValues.username} onChange={handleForm} placeholder="Create your Username" className={errors.username ? "input-error" : ""} />
          {errors.username && <span className="error-msg">{errors.username}</span>}
          <label>Email ID</label>
          <div className="input-container">
            <input type="text" name="email" value={formValues.email} onChange={handleForm} placeholder="Enter Email" className={errors.email ? "input-error" : ""} disabled={isEmailVerified} />
            {!isEmailVerified && formValues.email.length > 0 && (
              <button
                type="button"
                className="jsignup-small-verify-btn"
                onClick={() => {
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.[a-zA-Z]{2,}$/;
                  if (!emailRegex.test(formValues.email)) {
                    setErrors({ ...errors, email: "Please enter a valid @gmail.com address" });
                    return;
                  }

                  if (!emailRegex.test(formValues.email)) {
                    setErrors({
                      ...errors,
                      email: "Enter a valid email address",
                    });
                    return;
                  }

                  sendOtp("email");
                }}
              >
                Verify
              </button>
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

          {/* MOBILE SECTION */}
          <label>Mobile number</label>
          <div className="input-container">
            <input
              type="tel"
              name="phone"
              value={formValues.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g,"");
                setFormValues({ ...formValues, phone: value.slice(0, 10) });
                setErrors({ ...errors, phone: "" });
              }}
              placeholder="Enter mobile number"
              className={errors.phone ? "input-error" : ""}
              disabled={isMobileVerified}
            />
            {!isMobileVerified && /^[6-9]\d{9}$/.test(formValues.phone) && (
              <button
                type="button"
                className="jsignup-small-verify-btn"
                onClick={() => {
                  if (!/^[6-9]\d{9}$/.test(formValues.phone)) {
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
            {isMobileVerified && <span className="verified-badge">Verified </span>}
          </div>
          {errors.phone && <span className="error-msg">{errors.phone}</span>}

          <button type="submit" className="j-sign-up-submit">Signup</button>

          <div className="divider">Or Continue with</div>

          <button className="google-btn">
            <img
              src={Google}
              alt="Google"
            />
            Google
          </button>
        </form>
      </div>
    </div>
  );
}