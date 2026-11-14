
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.get("/users", {
        params: formData
      });

      if (response.data.length === 0) {
        alert("Invalid email or password");
        return;
      }

      const safeUser = { ...response.data[0] };
      delete safeUser.password;

      localStorage.setItem("user", JSON.stringify(safeUser));
      window.dispatchEvent(new Event("authChange"));

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  }

  return (
    <div className="form-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
