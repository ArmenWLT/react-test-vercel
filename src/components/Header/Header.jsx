import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

function Header({ searchTerm, setSearchTerm, onAddTaskClick, isToDoShow }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    try {
      const response = await fetch('/dummy/users.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Simulated save failed');
    } catch (error) {
      localStorage.setItem('dummyUser', JSON.stringify(userData));
      console.log('User saved to localStorage:', userData);
    }

    alert(`Welcome, ${username}!`);
    setShowLogin(false);
    setUsername('');
    setPassword('');
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>TUMO TODO</div>
      </div>

      <div className={styles.right}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className={styles.addButton} onClick={onAddTaskClick}>
          {isToDoShow ? 'Close' : 'Add Task'}
        </button>

        <button className={styles.toggleButton} onClick={toggleDarkMode}>
          {isDarkMode ? '☼' : '☾'}
        </button>

        <img
          className={styles.avatar}
          src="https://i.pravatar.cc/40"
          alt="User"
          onClick={() => setShowLogin(!showLogin)}
        />
      </div>

      {showLogin && (
        <div className={styles.loginModal}>
          <form onSubmit={handleLoginSubmit}>
            <h4>Login</h4>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </header>
  );
}

export default Header;
