import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage.jsx';
import TodoPage from './components/TodoPage.jsx';

const SESSION_KEY = 'daymark-session';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true',
  );

  useEffect(() => {
    if (isLoggedIn) sessionStorage.setItem(SESSION_KEY, 'true');
    else sessionStorage.removeItem(SESSION_KEY);
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <TodoPage onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <LoginPage onLogin={() => setIsLoggedIn(true)} />
  );
}

export default App;
