import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // 🔹 Mise à jour du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Inscription réussie !");
        setForm({ email: "", password: "" });
        navigate("/login"); // Redirige vers la page de connexion
      } else {
        toast.error(data.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      toast.error("Erreur serveur : " + err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginRight: "10px" }}>
          Inscription
        </button>

        <span>
          Déjà un compte ? <Link to="/login">Connexion</Link>
        </span>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
