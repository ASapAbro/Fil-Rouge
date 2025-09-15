import React from "react";
import { Link } from "react-router-dom";

function Home() {
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

      <div>
        <h2>Bienvenue sur MyContacts</h2>
        <p>Gérez vos contacts facilement et en toute sécurité.</p>
      </div>
    </div>
  );
}

export default Home;
