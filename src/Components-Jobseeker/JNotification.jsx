import React, { useState, useEffect, useRef } from "react";
import './JNotification.css'
import bell from '../assets/header_bell.png'
import bell_dot from '../assets/header_bell_dot.png'
import { useJobs } from "../JobContext";
import { useNavigate } from "react-router-dom";



export const JNotification = ({  }) => {
    
    
    const {notificationsData,setNotificationsData,showNotification, setShowNotification,activeMenuId,setActiveMenuId,currentUserId}   = useJobs()

    
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const myPersonalNotifs = notificationsData.filter(n => 
        String(n.targetId) === String(currentUserId) || n.targetId === undefined || n.targetId === null
    );

    const newNotificationsCount = myPersonalNotifs.filter(n => !n.isRead).length;
    console.log(newNotificationsCount)

    // Toggle 3-dot menu
    const toggleMenu = (id, event) => {
        event.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    // MARK AS READ
    const handleMarkAsRead = (id) => {
        setNotificationsData(prev =>
            prev.map(n =>
                n.id === id ? { ...n, isRead: true } : n
            )
        );
        setActiveMenuId(null);
    };

    // MARK AS UNREAD
    const handleMarkAsUnread = (id) => {
        setNotificationsData(prev =>
            prev.map(n =>
                n.id === id ? { ...n, isRead: false } : n
            )
        );
        setActiveMenuId(null);
    };

    // DELETE ONE
    const handleDelete = (id) => {
        setNotificationsData(prev => prev.filter(n => n.id !== id));
        setActiveMenuId(null);
    };

    // CLEAR ALL
    const handleClearAll = () => {
        setNotificationsData(prev => 
            prev.filter(n => String(n.targetId) !== String(currentUserId) && n.targetId !== null && n.targetId !== undefined)
        );
        setActiveMenuId(null);
    };
    const handleNotificationClick = (n) => {

        const isChat = n.path && n.path.includes('Chat' || 'chat');
    if (isChat) {
        navigate(n.path);
        setShowNotification(false); 
        handleMarkAsRead(n.id);// Close the panel
    }
};

    // CLOSE ON OUTSIDE CLICK
        useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setShowNotification(false);
            }
        };

        if (showNotification) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, [showNotification, setShowNotification]);


    return (
        <div
            ref={containerRef}
            className={`notifications-container ${showNotification ? "show-notification" : "hide-notification"}`}
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
                <button onClick={() => setShowNotification(false)} className="notifications-close-btn">
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
                {myPersonalNotifs.map((notification) => (
                    <div
                        
                        key={notification.id}
                        className={notification.isRead ? "notification-old-item" : "notification-new-item"}
                        
                    >
                        <div className="notification-content" onClick={() => handleNotificationClick(notification)}>
                            
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

                            {activeMenuId === notification.id && (
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

                {myPersonalNotifs.length === 0 && (
                    <p style={{ padding: "20px", textAlign: "center", color: "#777" }}>
                        No notifications for you
                    </p>
                )}
            </div>
        </div>
    );
};