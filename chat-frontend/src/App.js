import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import ChatRoom from "./ChatRoom";

function Navbar({ token }) {
  return !token ? (
    <nav style={{ padding: "1rem", backgroundColor: "#222", color: "#fff" }}>
      <Link to="/login" style={{ marginRight: "1rem", color: "#fff", textDecoration: "none" }}>
        Login
      </Link>
      <Link to="/signup" style={{ color: "#fff", textDecoration: "none" }}>
        Sign Up
      </Link>
    </nav>
  ) : (
    <></>
  );
}


function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <Router>
      <Navbar token={token} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/chatroom"
          element={token ? <ChatRoom token={token} setToken={setToken} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/chatroom" />} />
      </Routes>
    </Router>
  );
}

export default App;
