
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        params: { email: formData.email }
      });

      if (response.data.length > 0) {
        alert("Email already registered!");
        return;
      }

      await api.post("/users", formData);

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  }

  return (
    <div className="form-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          minLength={6}
          required
        />

        <button className="submit-btn">Register</button>
      </form>
    </div>
  );
}

export default Register;
