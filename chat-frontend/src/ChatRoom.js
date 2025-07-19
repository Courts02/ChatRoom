// Import React core, useState for state, useEffect for side effects, useCallback for stable function reference.
import React, { useState, useEffect, useCallback } from 'react';

// Import the CSS for styling the ChatRoom.
// ✅ Make sure the file is correctly named — matching the import exactly.
import './ChatRoom.css';

// Main ChatRoom component — receives `token` for auth and `setToken` to log out.
const ChatRoom = ({ token, setToken }) => {
  // State to hold the list of messages fetched from the backend.
  const [messages, setMessages] = useState([]);

  // State to hold the current message input.
  const [message, setMessage] = useState('');

  // ----------------- Fetch Messages (Protected GET Request) -----------------
  // ✅ QUERY: This function gets all chat messages from the server.
  // useCallback ensures the function keeps the same reference unless `token` changes.
  const fetchMessages = useCallback(async () => {
    try {
<<<<<<< HEAD
      // Make GET request to /messages with Authorization header.
      const response = await fetch('http://localhost:5000/messages', {
        headers: { Authorization: `Bearer ${token}` }, // ✅ send JWT!
=======
      const response = await fetch('https://connecthub-9k2z.onrender.com/messages', {
        headers: { Authorization: `Bearer ${token}` },
>>>>>>> 0b7db938a1ae7c642cab96ada0a7c0acb8940891
      });

      // Parse JSON response.
      const data = await response.json();
      console.log('Fetched data:', data); // Debug log

      // Defensive: Make sure data is an array before updating state.
      if (Array.isArray(data)) {
        setMessages(data);
      } else if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        console.error('Unexpected response format:', data);
        setMessages([]); // Clear messages if something is wrong.
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]); // Clear on error.
    }
  }, [token]); // `token` is dependency — if it changes, so does this function.

  // ----------------- Send New Message (Protected POST Request) -----------------
  // ✅ MUTATION: This function POSTs a new message to the server.
  const sendMessage = async () => {
    // Ignore empty or whitespace-only messages.
    if (!message.trim()) return;

    try {
<<<<<<< HEAD
      // Make POST request to /messages with Authorization header.
      const response = await fetch('http://localhost:5000/messages', {
=======
      const response = await fetch('https://connecthub-9k2z.onrender.com/messages', {
>>>>>>> 0b7db938a1ae7c642cab96ada0a7c0acb8940891
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ send JWT!
        },
        body: JSON.stringify({ message }), // Body includes new message text.
      });

      // If not successful, throw error.
      if (!response.ok) {
        throw new Error(`Error sending message: ${response.statusText}`);
      }

      // Clear input.
      setMessage('');

      // Re-fetch messages to update the chat with the new one.
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------- Logout Handler -----------------
  // ✅ Clear token from both localStorage and state — logs user out.
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); // This triggers redirect back to Login page in App.js.
  };

  // ----------------- useEffect: Poll for Messages -----------------
  // When component mounts or `token` changes:
  // 1. Fetch messages immediately.
  // 2. Start polling every 2 seconds.
  // 3. Clean up interval on unmount or token change.
  useEffect(() => {
    if (!token) return; // If no token, skip.

    fetchMessages(); // Initial fetch.

    const interval = setInterval(fetchMessages, 2000); // Poll every 2s.

    return () => clearInterval(interval); // Cleanup.
  }, [token, fetchMessages]); // Re-run effect if `token` or `fetchMessages` changes.

  // ----------------- Render -----------------
  return (
    <div className="chat-container">
      <h2>Chat Room</h2>

      {/* Logout button clears token and localStorage */}
      <button onClick={handleLogout}>Log Out</button>

      {/* Chat message list */}
      <ul>
        {messages.length === 0 && <li>No messages yet</li>}
        {messages.map((msg) => (
          <li key={msg._id}>
            <strong>{msg.user}:</strong> {msg.message}
          </li>
        ))}
      </ul>

      {/* Input for new message */}
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage(); // Enter key sends message
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

// Export the component so App.js can use it.
export default ChatRoom;
