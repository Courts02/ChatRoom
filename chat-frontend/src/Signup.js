import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      const response = await fetch("https://connecthub-nd7o.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      navigate("/login");
    } catch (error) {
      setError("Network error during signup");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

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
