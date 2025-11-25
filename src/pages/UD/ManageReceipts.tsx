import { useState, useEffect } from "react";
import axios from "axios";
import "./UserDashboard.css"; // reuse dashboard styles
import backgroundImg2 from "../../components/background2.jpg";
import Sidebar from "./UserSideBar";

interface Donation {
  id: number;
  user_email: string;
  charity: string;
  amount: number;
  method: string;
  created_at: string;
}

const ManageReceipts = () => {
  axios.defaults.withCredentials = true;

  const [donations, setDonations] = useState<Donation[]>([]);
  const userEmail = localStorage.getItem("userEmail");
  const firstname = localStorage.getItem("firstname") || "User";
  const lastname = localStorage.getItem("lastname") || "";

  useEffect(() => {
    if (!userEmail) return;
    axios
      .get(`http://localhost:8081/donations?user_email=${userEmail}`)
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching receipts:", err));
  }, [userEmail]);

  return (
    <div className="dashboard-container">
      {/* Background */}
      <img src={backgroundImg2} alt="Background" className="dashboard-bg" />

      <div className="dashboard-layout">
        <Sidebar />

        {/* Main content */}
        <main className="main-content">
          <header className="dashboard-header">
            <h4>Manage Receipts</h4>
          </header>
          <div className="welcome-text">Welcome {firstname} {lastname}</div>

          <div className="widgets">
            {/*Receipts Widget*/}
            <div className="card receipts">
              <h4>Your Receipts</h4>
              {donations.length > 0 ? (
                <ul className="receipt-list">
                  {donations.map((donation, index) => (
                     <li key={donation.id}>
                      <p><strong>Receipt #{index + 1}, ID {donation.id}</strong></p>
                      <p>User: {donation.user_email}</p>
                      <p>Charity: Save the Trees</p>
                      <p>Amount: ${donation.amount}</p>
                      <p>Method: {donation.method}</p>
                      <p>Date: {new Date(donation.created_at).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No receipts available.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageReceipts;