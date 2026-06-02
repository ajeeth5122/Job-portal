import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import eye from '../assets/show_password.png'
import eyeHide from '../assets/eye-hide.png'
import "./ALogin.css";
import { FHeader } from '../Components-LandingPage/FHeader';

export const ALogin = () => {
    const [passwordShow, setPasswordShow] = useState(true)
    const navigate = useNavigate();

    const togglePasswordView = () => {
        setPasswordShow((prev) => !prev)
    }

    // State now includes mobileNumber
    const initialValues = { username: "", phone: "", password: "" }
    const [formValues, setFormValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleForm = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
        setErrors({ ...errors, [name]: "" })
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formValues.username.trim()) {
            newErrors.username = "Username or Company name is required"
        }

        // Mobile Number validation
        if (!formValues.phone.trim()) {
            newErrors.phone = "Mobile number is required"
        } else if (!/^\d{10}$/.test(formValues.phone.replace(/\D/g, ''))) {
            // Optional: Basic check for 10 digits
            newErrors.phone = "Please enter a valid mobile number"
        }

        if (!formValues.password.trim()) {
            newErrors.password = "Password is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload
        if (!validateForm()) {
            return false
        }
        navigate('/Job-portal/Employer/Dashboard')
    }

    return (
        <>
            <FHeader />
            <div className="admin-login-body">
                {/* Illustration removed - form is now the main focus */}
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Login to continue</h2>

                    <label>Email Id</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your Email Id"
                        value={formValues.username}
                        onChange={handleForm}
                        className={errors.username ? "input-error" : ""}
                    />
                    {errors.username && <span className="error-msg">{errors.username}</span>}

                    {/* New Mobile Number Input */}
                    <label>Mobile Number</label>
                    <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Enter your mobile number"
                        value={formValues.phone}
                        onChange={handleForm}
                        className={errors.phone ? "input-error" : ""}
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}

                    <label>Password</label>
                    <div className="password-wrapper">
                        <input
                            type={passwordShow ? "password" : "text"}
                            placeholder="Enter your password"
                            name='password'
                            value={formValues.password}
                            onChange={handleForm}
                            className={errors.password ? "input-error" : ""}
                        />
                        <span className="eye-icon" onClick={togglePasswordView}>
                            <img src={passwordShow ? eye : eyeHide} className='show-icon' alt='show' />
                        </span>
                    </div>
                    {errors.password && <span className="error-msg">{errors.password}</span>}

                    <div className="form-options">
                        <label><input type="checkbox" /> Remember me</label>
                        <Link to="/Job-portal/employer/login/forgotpassword" className='forgot-password'>Forgot Password?</Link>
                    </div>

                    <button type="submit" className="j-login-btn">Login</button>
                </form>
            </div>
        </>
    )
}
