import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminSideBar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  axios.get("http://localhost:8081/auth/logout", { withCredentials: true })
    .then((res) => {
      if (res.data.Status === "Success") {
        // clear local storage values
        localStorage.removeItem("valid");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");

        // redirect to login or home
        navigate("/");
      } else {
        alert(res.data.Error || "Logout failed");
      }
    })
    .catch((err) => {
      console.error("Logout error:", err);
      alert("Server error");
    });
};

  return (
    <aside className="adminsidebar">
      <Link to="/" className="adminbrand">
        WriteOffTrack
      </Link>
      
      <ul className="adminnav-links">
        <li>
          <Link to="/admin-dashboard" className="adminnav-item">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin-inbox" className="adminnav-item">
            Inbox
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="adminnav-item log-out-btn">
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
