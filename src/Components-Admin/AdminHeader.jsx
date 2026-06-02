import React, { useState, useRef, useEffect } from 'react'
import './AdminHeader.css'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from "../assets/icon_profile.png"
import Arrow from "../assets/AdminAssets/DownArrow.png"
import UploadIcon from "../assets/AdminAssets/UserManage.png" 
import AdminLogout from '../assets/AdminAssets/Logout.png'
import DeleteIcon from "../assets/DeleteIcon.png" // Fixed duplicate import naming clash

export const AdminHeader = ({ onLogoutClick }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(() => {
        // Keeps the uploaded picture visible even on page refreshes
        return sessionStorage.getItem('admin_avatar') || null
    })
    const [fileError, setFileError] = useState('')
    
    const dropdownRef = useRef(null)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()
    
    const today = new Date()
    const day = today.toLocaleDateString('en-US', { weekday: 'long' })
    const date = `${today.getDate()}${getDaySuffix(today.getDate())} ${today.toLocaleString('en-US', { month: 'long' })} ${today.getFullYear()}`

    function getDaySuffix(day) {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    }

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => { document.removeEventListener("mousedown", handleClickOutside) }
    }, [])

    // Handle File validation logic
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFileError('')

        if (!file) return

        // Validate File Type
        if (!file.type.startsWith('image/')) {
            setFileError('Invalid file format. Please upload an image file (PNG, JPG, JPEG).')
            return
        }

        // Validate File Size (5MB = 5 * 1024 * 1024 Bytes)
        const maxFileSize = 5 * 1024 * 1024
        if (file.size > maxFileSize) {
            setFileError('File is too large. Maximum allowed size is 5MB.')
            return
        }

        setSelectedImage(file)
        
        // Use FileReader to create a persistent base64 string
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    // Clear function for removing existing or newly dropped image
    const handleRemoveImage = (e) => {
        e.stopPropagation(); // Prevents click passing to the dropzone file selector triggering layout shifts
        setSelectedImage(null);
        setPreviewUrl(null);
        setFileError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Resets native browser cache input track record values
        }
    }

    const handleUploadSubmit = (e) => {
        e.preventDefault()
        
        if (!previewUrl) {
            // If they saved blank/removed state, clear session footprint storage 
            sessionStorage.removeItem('admin_avatar')
        } else {
            // Save base64 image data to state storage
            sessionStorage.setItem('admin_avatar', previewUrl)
        }
        
        window.dispatchEvent(new Event('avatarChanged'))
        setShowUploadModal(false)
        setSelectedImage(null)
    }

    const closeUploadModal = () => {
        setShowUploadModal(false)
        setSelectedImage(null)
        setPreviewUrl(sessionStorage.getItem('admin_avatar') || null)
        setFileError('')
    }

    const handleLogoutAction = () => {
        setShowDropdown(false)
        if (typeof onLogoutClick === 'function') {
            onLogoutClick()
        } else {
            sessionStorage.clear()
            navigate("/")
        }
    }

    return (
        <div className="Admin-header">
            <div className="Admin-header-left">
                <div className="logo" onClick={() => navigate('/Job-portal/admin/Dashboard')} style={{ cursor: 'pointer' }}>
                    Job Portal
                </div>
            </div>

            <div className="Admin-header-right">
                <div className="Admin-date-section">
                    <div className="Admin-header-day">
                        {day}, {date}
                    </div>
                </div>

                <div className="Admin-profile-section" ref={dropdownRef}>
                    <img 
                        onClick={() => setShowDropdown(!showDropdown)} 
                        src={previewUrl || ProfileIcon} 
                        alt="Profile" 
                        className="Admin-profile-icon" 
                    />

                    <div className="Admin-dropdown-arrow" onClick={() => setShowDropdown(!showDropdown)}>
                        <img src={Arrow} alt="Dropdown" className={showDropdown ? "arrow-rotate" : ""} />
                    </div>

                    {showDropdown && (
                        <div className="Admin-profile-dropdown">
                            <div className="Admin-dropdown-item" onClick={() => { setShowUploadModal(true); setShowDropdown(false); }}>
                                <img src={ProfileIcon} alt="Upload Profile" />
                                <span>Upload Photo</span>
                            </div>

                            <div className="Admin-dropdown-item Admin-logout" onClick={() => navigate('/Job-portal/employer/dashboard')}>
                                <img src={AdminLogout} alt="Logout" />
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* PROFILE PHOTO UPLOAD MODAL POPUP */}
            {showUploadModal && (
                <div className="admin-modal-overlay" onClick={closeUploadModal}>
                    <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>Upload Profile Picture</h3>
                            <button type="button" className="admin-modal-close-btn" onClick={closeUploadModal}>&times;</button>
                        </div>
                        <form onSubmit={handleUploadSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-upload-dropzone" onClick={triggerFileInput}>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleFileChange} 
                                        accept="image/*" 
                                        style={{ display: 'none' }} 
                                    />
                                    {previewUrl && !fileError ? (
                                        <div className="admin-image-preview-container" onClick={(e) => e.stopPropagation()}>
                                            <img src={previewUrl} alt="Preview" className="admin-uploaded-image-preview" onClick={triggerFileInput} title="Upload image"/>
                                            {/* Absolute Overlay Delete Action Button */}
                                            <button type="button" className="admin-delete-image-btn" onClick={handleRemoveImage} title="Remove image">
                                                <img src={DeleteIcon} alt="Delete Logo" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="admin-upload-placeholder">
                                            <img src={UploadIcon} alt="Placeholder" className="admin-placeholder-svg" />
                                            <p>Click to browse images</p>
                                            <span>Supports JPG, JPEG, PNG (Max 5MB)</span>
                                        </div>
                                    )}
                                </div>
                                
                                {fileError && <div className="admin-upload-error-msg">{fileError}</div>}
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-modal-btn cancel-btn" onClick={closeUploadModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-modal-btn save-btn" disabled={!!fileError}>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}