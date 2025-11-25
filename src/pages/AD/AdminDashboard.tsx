import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import backgroundImg from "../../components/background2.jpg";
import AdminSidebar from "./AdminSideBar";

interface Donation {
  id: number;
  user_email: string;
  firstname: string;
  lastname: string;
  amount: number;
  method: string;
  created_at: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  axios.defaults.withCredentials = true;
  const [donations, setDonations] = useState<Donation[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const firstname = localStorage.getItem("firstname") || "Admin";
  const lastname = localStorage.getItem("lastname") || "";

  useEffect(() => {
    axios.get("http://localhost:8081/all-donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching donations:", err));

    axios.get("http://localhost:8081/all-users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <img src={backgroundImg} alt="Background" className="dashboard-bg" />
        
      <div className="dashboard-layout">
      <AdminSidebar />

        {/* Main content */}
        <main className="main-content">
          <header className="dashboard-header">
            <h4>Admin Dashboard</h4>
          </header>
          <div className="welcome-text">Welcome {firstname} {lastname}</div>

          <div className="widgets">
            {/* Recent Donations Widget */}
            <div className="card donations">
              <h4>Recent Donations</h4>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User Email</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length > 0 ? (
                    donations.map((donation) => (
                      <tr key={donation.id}>
                        <td>{donation.id}</td>
                        <td>{donation.user_email}</td>
                        <td>${donation.amount}</td>
                        <td>{donation.method}</td>
                        <td>{new Date(donation.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={5} className="no-data">No donations yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Manage Users Widget */}
            <div className="card users">
              <h4>Manage Users</h4>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users
                    .filter(user => user.role !== "admin")
                    .map((user) => (
                      
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.firstname}</td>
                          <td>{user.lastname}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))
                  ) : (
                    <tr><td colSpan={5} className="no-data">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;