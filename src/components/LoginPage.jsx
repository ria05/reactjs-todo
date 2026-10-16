import React, { useState } from 'react';

const DEMO_EMAIL = 'student@example.com';
const DEMO_PASSWORD = 'password123';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('That email and password do not match. Try the demo details below.');
      return;
    }
    setError('');
    onLogin();
  }

  return (
    <main className="login-layout">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">d.</div>
        <p className="eyebrow">A little more focus</p>
        <h1 id="login-title">Make room for<br />what matters.</h1>
        <p className="login-copy">Sign in to your personal space and take today one task at a time.</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby={error ? 'login-error' : undefined}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby={error ? 'login-error' : undefined}
          />

          {error && <p className="form-error" id="login-error" role="alert">{error}</p>}
          <button className="button button-primary login-submit" type="submit">
            Sign in <span aria-hidden="true">→</span>
          </button>
        </form>

        <div className="demo-note">
          <span className="demo-icon" aria-hidden="true">✦</span>
          <div>
            <span className="demo-label">Demo access</span>
            <span className="demo-credentials">student@example.com · password123</span>
          </div>
        </div>
        <p className="login-footnote">Your day, in good hands.</p>
      </section>
      <aside className="login-art" aria-label="A calm moment to focus">
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-card art-card-back"><span>02</span><i>MAKE SPACE</i></div>
        <div className="art-card art-card-front">
          <span className="art-spark">✳</span>
          <div className="art-lines"><i /><i /><i /></div>
          <span className="art-check">✓</span>
        </div>
        <p className="art-quote">Small steps.<br /><em>Clear mind.</em></p>
        <span className="art-caption">DAYMARK · PERSONAL PLANNER</span>
      </aside>
    </main>
  );
}

export default LoginPage;
