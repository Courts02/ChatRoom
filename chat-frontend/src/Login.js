import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      const response = await fetch("https://connecthub-nd7o.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/chatroom");
    } catch (error) {
      setError("Network error during login");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>

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
