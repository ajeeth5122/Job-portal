import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import manSitting from '../assets/login_otp_image.png';
import './OtpVerification.css';

export const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const DEFAULT_OTP = "1234";

  const handleResend = () => {
    setSeconds(60);
    setError("");
    setOtp(new Array(4).fill(""));
    setTimeout(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
    }, 0);
  };

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setError("OTP Expired. Please request a new one.");
    }
  }, [seconds]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setError("");


    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (seconds === 0) return;


    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setError("Please enter all 4 digits");
      return;
    }

    if (enteredOtp === DEFAULT_OTP) {
      navigate("/Job-portal/jobseeker/");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/Job-portal" className="logo">
          <span className="logo-text">job portal</span>
        </Link>
        <div className="header-links">
          <span className='no-account'>Don’t have an account?</span>
          <Link to="/Job-portal/jobseeker/signup" className="signup-btn">Signup</Link>
          <div className="separator"></div>
          <Link to='/Job-portal/employer/login' className="employer-redirect-link">Employers Login</Link>
        </div>
      </header>

      <div className="login-body">
        <div className="login-illustration">
          <img src={manSitting} alt="OTP Illustration" />
        </div>

        <div className="otp-container">
          <button className="back-to-login" onClick={() => navigate(-1)}>
            Back
          </button>
          <h2 className="otp-title">OTP</h2>
          <p className="otp-subtitle">{seconds > 0 ? "We have sent code to your Mobile number" : "Your OTP session has expired."}</p>

          <form className="otp-form" onSubmit={handleVerifyOtp}>
            <div className={`otp-input-group ${seconds === 0 ? "expired-fade" : ""}`}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={`otp-box ${error ? "input-error" : ""}`}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  disabled={seconds === 0}
                />
              ))}
            </div>

            {error && <p className="error-msg" style={{ display: 'block', color: 'red', fontSize: '13px', marginTop: '5px', textAlign: 'center' }}>{error}</p>}


            <div className="otp-timer-display">
              {formatTime(seconds)}
            </div>

            {seconds > 0 ? (
              <button type="submit" className="otp-login-btn">Login</button>
            ) : (
              <button type="button" className="otp-login-btn resend-highlight" onClick={handleResend}>
                Resend New OTP
              </button>
            )}
          </form>

          <div className="otp-resend-section">
            <span>You didn't get mobile OTP ? </span>
            <button
              className="resend-btn"
              disabled={seconds > 0}
              onClick={handleResend}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};