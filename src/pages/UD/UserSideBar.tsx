import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserSideBar.css";

const Sidebar = () => {
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
    <aside className="sidebar">
      {/* Brand/logo */}
      <Link to="/" className="brand">
        WriteOffTrack
      </Link>

      {/* Navigation */}
      <ul className="nav-links">
        <li>
          <Link to="/user-dashboard" className="nav-item">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/manage-receipts" className="nav-item">
            Manage Receipts
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-item logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
