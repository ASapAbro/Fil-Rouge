import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Book() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [editId, setEditId] = useState(null); // Id du contact à modifier

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔹 Récupérer les contacts
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchContacts();
    }
  }, [token, navigate]);

  // 🔹 Ajouter ou modifier un contact
  const handleSave = async () => {
    try {
      if (editId) {
        // Modification
        const res = await fetch(`http://localhost:5001/api/contacts/${editId}`, {
          method: "PATCH", // ✅ PATCH au lieu de PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          setEditId(null);
          setForm({ firstName: "", lastName: "", phone: "" });
          fetchContacts(); // Mise à jour automatique du carnet
        } else {
          const error = await res.json();
          console.error("Erreur mise à jour :", error.message);
        }
      } else {
        // Ajout
        const res = await fetch("http://localhost:5001/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          setForm({ firstName: "", lastName: "", phone: "" });
          fetchContacts(); // Mise à jour automatique
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Supprimer un contact
  const handleDelete = async (_id) => {
    try {
      await fetch(`http://localhost:5001/api/contacts/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Préparer la modification
  const handleEdit = (contact) => {
    setForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
    });
    setEditId(contact._id);
  };

  // 🔹 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Mon Carnet de Contacts</h1>
        <button onClick={handleLogout}>Déconnexion</button>
      </header>

      <h2>{editId ? "Modifier un contact" : "Ajouter un contact"}</h2>
      <input
        placeholder="Prénom"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        placeholder="Nom"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />
      <input
        placeholder="Téléphone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <button onClick={handleSave}>{editId ? "Modifier" : "Ajouter"}</button>

      <h2>Liste des contacts</h2>
      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.firstName} {c.lastName} - {c.phone}{" "}
            <button onClick={() => handleEdit(c)}>Modifier</button>{" "}
            <button onClick={() => handleDelete(c._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Book;
