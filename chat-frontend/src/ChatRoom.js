import React, { useState, useEffect, useCallback } from 'react';
import './ChatRoom.css';  // make sure your file is named exactly ChatRoom.css (lowercase!)

const ChatRoom = ({ token, setToken }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch messages with token in header (protected route)
  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log('Fetched data:', data);

      if (Array.isArray(data)) {
        setMessages(data);
      } else if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        console.error('Unexpected response format:', data);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  }, [token]);

  // Send a new message with Authorization header
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Error sending message: ${response.statusText}`);
      }

      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  // Logout clears token and localStorage
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Fetch messages initially and every 2 seconds — only if token exists
  useEffect(() => {
    if (!token) return;

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, [token, fetchMessages]);

  return (
    <div className="chat-container">
      <h2>Chat Room</h2>
      <button onClick={handleLogout}>Log Out</button>
      <ul>
        {messages.length === 0 && <li>No messages yet</li>}
        {messages.map((msg) => (
          <li key={msg._id}>
            <strong>{msg.user}:</strong> {msg.message}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
