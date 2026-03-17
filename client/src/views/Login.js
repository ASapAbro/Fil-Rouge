import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Connexion réussie !");
        localStorage.setItem("token", data.token);
        setForm({ email: "", password: "" });
        navigate("/book");
      } else {
        toast.error(data.message || "Erreur de connexion");
      }
    } catch (err) {
      toast.error("Erreur serveur : " + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Connexion</button>
        <p>Pas de compte ? <Link to="/register">Inscription</Link></p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
