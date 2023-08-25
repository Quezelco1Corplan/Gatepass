import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext"; // Import useNavigate for navigation
import Sidebar from "../component/sidebar";

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const logout = () => {
    setIsLoggedIn(false); // Set authentication state
    navigate("/");
  };

  return (
    <div>
      <Sidebar >
        <div className="dashboard-content">
          <p>Dashboard content goes here...</p>
          {/* Add a logout button */}
          <button onClick={logout}>Logout</button>
        </div>
      </Sidebar>
    </div>
  );
}

export default Dashboard;
