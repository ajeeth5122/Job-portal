import React, { useState, useEffect, useRef } from "react";
import '../Components-Jobseeker/JNotification.css'
import bell from '../assets/header_bell.png'
import bell_dot from '../assets/header_bell_dot.png'
import { useJobs } from "../JobContext";
import { useNavigate } from "react-router-dom";



export const ENotification = ({  }) => {
    
    
   const { employerNotifications, setEmployerNotifications, employeractiveMenuId, setEmployerActiveMenuId, employershowNotification, setEmployerShowNotification } = useJobs();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const newNotificationsCount = employerNotifications.filter(n => !n.isRead).length;

    // Toggle 3-dot menu
    const toggleMenu = (id, event) => {
        event.stopPropagation();
        setEmployerActiveMenuId(employeractiveMenuId === id ? null : id);
    };

    // MARK AS READ
    const handleMarkAsRead = (id) => {
        setEmployerNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, isRead: true } : n
            )
        );
        setEmployerActiveMenuId(null);
    };

    // MARK AS UNREAD
    const handleMarkAsUnread = (id) => {
        setEmployerNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, isRead: false } : n
            )
        );
        setEmployerActiveMenuId(null);
    };

    // DELETE ONE
    const handleDelete = (id) => {
        setEmployerNotifications(prev => prev.filter(n => n.id !== id));
        setEmployerActiveMenuId(null);
    };

    // CLEAR ALL
    const handleClearAll = () => {
        setEmployerNotifications([]);
        setEmployerActiveMenuId(null);
    };

    // CLOSE ON OUTSIDE CLICK
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setEmployerShowNotification(false);
            }
        };

        if (employershowNotification) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [employershowNotification, setEmployerShowNotification]);


    return (
        <div
            ref={containerRef}
            className={`notifications-container ${employershowNotification ? "show-notification" : "hide-notification"}`}
        >
            {/* HEADER */}
            <div className="notifications-header">
                <div className="notifications-heading-container">
                    <img
                        className="notification-header-icons"
                        src={newNotificationsCount > 0 ? bell_dot:  bell  }
                        alt="Notifications"
                    />
                    <h2>Notifications</h2>
                </div>
                <button onClick={() => setEmployerShowNotification(false)} className="notifications-close-btn">
                    &times;
                </button>
            </div>

            {/* SUBHEADER */}
            <div className="notifications-subheader">
                <div>
                    <span>Stay Up to Date</span>
                    {newNotificationsCount > 0 && (
                        <span className="new-notifications-count">
                            {newNotificationsCount} New Notifications
                        </span>
                    )}
                </div>

                <button className="clear-all-btn" onClick={handleClearAll}>
                    Clear all
                </button>
            </div>

            {/* NOTIFICATION LIST */}
            <div className="notifications-list">
                {employerNotifications.map((notification) => (
                    <div
                        
                        key={notification.id}
                        className={notification.isRead ? "notification-old-item" : "notification-new-item"}
                    >
                        <div className="notification-content">
                            <p className="notification-text">{notification.text}</p>
                            <p className="notification-time">{notification.time}</p>
                        </div>

                        <div className="more-options-wrapper">
                            <button
                                className="more-options-btn"
                                onClick={(e) => toggleMenu(notification.id, e)}
                            >
                                ⋮
                            </button>

                            {employeractiveMenuId === notification.id && (
                                <div className="overflow-menu">
                                    {notification.isRead ? (
                                        <button
                                            className="menu-item"
                                            onClick={() => handleMarkAsUnread(notification.id)}
                                        >
                                            Mark as unread
                                        </button>
                                    ) : (
                                        <button
                                            className="menu-item"
                                            onClick={() => handleMarkAsRead(notification.id)}
                                        >
                                            Mark as read
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(notification.id)}
                                        className="menu-item delete-item"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {employerNotifications.length === 0 && (
                    <p style={{ padding: "20px", textAlign: "center", color: "#777" }}>
                        No notifications for you
                    </p>
                )}
            </div>
        </div>
    );
};