import './App.css';
import Navbar from './components/NavBar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import UserDashboard from './pages/UD/UserDashboard';
import AdminDashboard from './pages/AD/AdminDashboard';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from "./components/ProtectedRoute";
import ManageReceipts from './pages/UD/ManageReceipts';
import AdminInbox from './pages/AD/AdminInbox';



function App() {
  return (
    <div className="App">
    <Router>
      <Routes> {/*parent container that holds all page routes*/}
          <Route path="/" element={<><Navbar/><Home/> </>} />
          <Route path="/register" element={<Register />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/contact" element={<ContactPage />} />
          
           <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-receipts"
            element={
              <ProtectedRoute role="user">
                <ManageReceipts />
              </ProtectedRoute>
            }
          />

          {/*Protected admin dashboard routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-inbox"
            element={
              <ProtectedRoute role="admin">
                <AdminInbox />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}


export default App;