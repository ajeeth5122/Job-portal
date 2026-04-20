import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import home from "../assets/home_icon.png"
import { useJobs } from "../JobContext";
import { Link } from "react-router-dom";


//***EMessenger//

export const EMessenger = () => {

const { chats, setChats, Alluser, currentEmployer, addNotification, activeSidebarUsers } = useJobs() //From JobContext

  const [input, setInput] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const scrollRef = useRef(null);

  const toggleChatEnd = () => {
  setChats(prev => prev.map(chat => 
    chat.id === selectedId ? { ...chat, isChatEnded: !chat.isChatEnded } : chat
  ));
};
  // Sidebar filter logic 
  const sidebarDisplayUsers = Alluser.filter(user =>
    activeSidebarUsers.includes(parseInt(user.id))
  );

  // Active chat and user details
  const activeChat = chats.find(c => String(c.id) === String(selectedId));

  const activeUser = Alluser.find(u => parseInt(u.id) === selectedId);

  // Auto scroll logic
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeChat?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || activeChat?.isChatEnded || !selectedId) return;
    const messageText = input.trim();
    const employerReply = {
      id: Date.now(),
      text: messageText,
      sender: currentEmployer.role, // "employer" - dynamic from context
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => prev.map(chat =>
      String(chat.id) === String(selectedId) 
        ? { ...chat, messages: [...chat.messages, employerReply] } 
        : chat
    ));
    const notificationMsg = `${currentEmployer.hrName}: ${messageText}`
    addNotification?.(`New message from ${notificationMsg}`, selectedId, `/Job-portal/jobseeker/Chat/${selectedId}`);
    setInput("");
  };

  return (
    <>
      <div className="messages-container">
        <div className="EChat-Mainsec">
          <div className="E-chat-name">
            <div className="web-sidebar">
              <div className="sidebar-header">
                <Link to="/Job-portal/Employer/Dashboard"><img src={home} style={{ height: "20px" }}/></Link>
                <h3 style={{ color: "#007bff", textAlign: "center" }}>Active Chats</h3>
              </div>
              {sidebarDisplayUsers.length > 0 ? (
                sidebarDisplayUsers.map(user => (
                  <div
                    key={user.id}
                    className={`sidebar-item ${selectedId === parseInt(user.id) ? 'active' : ''}`}
                    onClick={() => setSelectedId(parseInt(user.id))}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <strong>{user.profile.fullName}</strong>
                      <p style={{ fontSize: '11px', margin: 0 }}>{user.currentDetails?.jobTitle}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '20px', color: '#888', textAlign: 'center' }}>No active chats</div>
              )}
            </div>
          </div>

          <div className="web-main-chat">
            {selectedId ? (
              <>
                <header className="web-chat-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{activeUser?.profile?.fullName}</strong>
                  <button
                    onClick={toggleChatEnd}
                    className={activeChat?.isChatEnded ? "E-Start-Convo-Button" : "E-End-Convo-Button"}
                  >
                    {activeChat?.isChatEnded  ? "RESTART" : "END CHAT"}
                  </button>
                </header>

                <div className="web-chat-window" ref={scrollRef}>
                  {activeChat.messages?.map((m) => (
                    <div key={m.id} className="web-msg-row">
                      <div className={`web-bubble ${m.sender === 'employer' ? 'web-me' : 'web-friend'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {activeChat?.isChatEnded && <div className="chat-end-label">--- Conversation Ended ---</div>}
                </div>

                <form className="web-input-bar" onSubmit={handleSend}>
                  <input
                    className="web-text-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={activeChat?.isChatEnded }
                    placeholder="Type a message..."
                  />
                  <button type="submit" className="web-send-button" disabled={activeChat?.isChatEnded}>SEND</button>
                </form>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#888', flexDirection: 'column' }}>
                <h3>Chat Section</h3>
                <p>Connect with a job seeker to start a conversation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};