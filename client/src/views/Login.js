import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 useNavigate importé
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // 👈 hook pour redirection

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Connexion réussie !");
        localStorage.setItem("token", data.token); // stocke le token
        setForm({ email: "", password: "" });
        navigate("/book"); // 👈 redirection vers le carn
      } else {
        toast.error(data.message || "Erreur de connexion");
      }
    } catch (err) {
      toast.error("Erreur serveur : " + err.message);
    }
  };

  return (
    <div>
      <header>
        <h1>MyContacts</h1>
        <nav>
          <ul style={{ listStyle: "none", display: "flex", gap: "15px" }}>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </ul>
        </nav>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Connexion</button>

        <span>
          Pas de compte ? <Link to="/register">Inscription</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
