import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";  // separate CSS file for Login

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://codeconnect-3r9w.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        setError(errMsg || "Login failed");
        return;
      }

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/chatroom");
    } catch (error) {
      setError("Network error during login");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
