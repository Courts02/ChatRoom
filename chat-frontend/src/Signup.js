import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";  // separate CSS file for Signup

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("https://codeconnect-3r9w.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        setError(errMsg || "Signup failed");
        return;
      }

      navigate("/login");
    } catch (error) {
      setError("Network error during signup");
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
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
        autoComplete="new-password"
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
