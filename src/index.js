// Filename: App.js

import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import "./style.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data in local storage
        localStorage.setItem('user', JSON.stringify(data));
        // Trigger the onLogin function to redirect to the profile page
        onLogin();
      } else {
        // Display error message from API
        alert(data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };



  return (
    <div className="card">
      <h3>Welcome back!👋</h3>  
      <h2>Sign in to your account</h2>

      {/* <div className='creds'> */}
        <label>Your email:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      {/* </div> */}

      {/* <div className='creds2'> */}
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* </div> */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Profile = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user ID from local storage
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        const userData = await response.json();
        // Save user data in local storage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');
    // Trigger the onLogout function to redirect to the login page
    onLogout();
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Name: {user.firstName+ " " +user.lastName}</p>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>
          
          {/* Display other user information as needed */}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Profile onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};


ReactDOM.render(<App/>,document.getElementById("root"));