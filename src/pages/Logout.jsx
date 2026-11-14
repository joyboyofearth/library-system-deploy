
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));

    alert("Logged out successfully!");
    navigate("/login");
  }, [navigate]);

  return null;
}

export default Logout;
