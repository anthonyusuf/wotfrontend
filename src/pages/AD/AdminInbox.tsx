import  { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import backgroundImg2 from "../../components/background2.jpg";
import Sidebar from "./AdminSideBar";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const AdminInbox = () => {
  axios.defaults.withCredentials = true;

  const [messages, setMessages] = useState<Message[]>([]);
  const firstname = localStorage.getItem("firstname") || "Admin";
  const lastname = localStorage.getItem("lastname") || "";

  useEffect(() => {
    axios
      .get("http://localhost:8081/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching inbox:", err));
  }, []);

  return (
    <div className="dashboard-container">
      {/* Background */}
      <img src={backgroundImg2} alt="Background" className="dashboard-bg" />

      <div className="dashboard-layout">
        <Sidebar />

        {/* Main content */}
        <main className="main-content">
          <header className="dashboard-header">
            <h4>Admin Inbox</h4>
          </header>
          <div className="welcome-text">Welcome {firstname} {lastname}</div>

          <div className="widgets">
            {/* Inbox Widget */}
            <div className="card inbox">
              <h4>Inbox Messages</h4>
              {messages.length > 0 ? (
                <ul className="receipt-list">
                  {messages.map((msg, index) => (
                    <li key={msg.id}>
                      <p><strong>Message #{index + 1}, ID {msg.id}</strong></p>
                      <p>Name: {msg.name}</p>
                      <p>Email: {msg.email}</p>
                      <p>Subject: {msg.subject}</p>
                      <p>Message: {msg.message}</p>
                      <p>Date: {new Date(msg.created_at).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No messages available.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminInbox;
