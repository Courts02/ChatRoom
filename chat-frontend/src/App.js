import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ChatRoom from './ChatRoom';

function App() {
  const [token, setToken] = useState(null);

  // ✅ This runs ONCE when the app loads — restores saved token
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/chatroom"
            element={token ? <ChatRoom token={token} setToken={setToken} /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/chatroom" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
