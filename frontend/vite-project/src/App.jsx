import { useEffect, useState } from "react";
import Header from "./Header";
import Tasks from "./Tasks";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Message from "./Message";
import Footer from "./Footer";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(null); // 'login' | 'register' | null

  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  async function handleLogin(credentials) {
    setMessage(null);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => res.statusText);
        throw new Error(errText || `${res.status} ${res.statusText}`);
      }
      const body = await res.json().catch(() => ({}));
      console.log("login response", res.status, body);
      localStorage.setItem("token", body.token);
      setToken(body.token);
      setShowForm(null);
      setMessage("Logged in");
    } catch (err) {
      setMessage(err.message || "Error");
    }
  }

  async function handleRegister(form) {
    setMessage(null);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => res.statusText);
        throw new Error(errText || `${res.status} ${res.statusText}`);
      }
      const body = await res.json().catch(() => ({}));
      console.log("register response", res.status, body);
      localStorage.setItem("token", body.token);
      setToken(body.token);
      setShowForm(null);
      setMessage("Registered and logged in");
    } catch (err) {
      setMessage(err.message || "Error");
    }
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
    setMessage("Logged out");
  }

  return (
    <main className="app-shell">
      <Header loggedIn={!!token} onLogout={handleLogout} />

      <p>
       Welcome to the Task Tracker application.
Register for an account or log in to create, update, and manage your personal tasks.
      </p>

      {message && <Message text={message} />}

      {!token && (
        <div className="auth-buttons">
          <button onClick={() => setShowForm("login")}>Login</button>
          <button onClick={() => setShowForm("register")}>Register</button>
        </div>
      )}

      {showForm === "login" && <LoginForm onLogin={handleLogin} />}
      {showForm === "register" && <RegisterForm onRegister={handleRegister} />}

      {token && <Tasks token={token} />}

      <Footer />
    </main>
  );
}

export default App;