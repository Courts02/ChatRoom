// Import core React library.
import React from 'react';

// Import ReactDOM for rendering React components to the actual DOM.
import ReactDOM from 'react-dom/client';

// Import global CSS file for base styling.
import './index.css';

// Import your main App component (the root of your app logic).
import App from './App';

// Import optional web vitals tool — helps measure performance if needed.
import reportWebVitals from './reportWebVitals';

// ----------------- React Root -----------------

// Create a React root attached to the real DOM element with ID 'root' in public/index.html.
// This is where your entire React app will be injected.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App inside React.StrictMode.
// ✅ React.StrictMode helps catch potential problems in development (like deprecated APIs, etc.)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ----------------- Performance Monitoring (Optional) -----------------

// If you want to measure app performance, you can pass a logging function
// or connect to analytics tools here.
// This is optional — by default it does nothing.
reportWebVitals();
