import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Book() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      if (editId) {
        const res = await fetch(`${API_URL}/api/contacts/${editId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setEditId(null);
          setForm({ firstName: "", lastName: "", phone: "" });
          fetchContacts();
        }
      } else {
        const res = await fetch(`${API_URL}/api/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setForm({ firstName: "", lastName: "", phone: "" });
          fetchContacts();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await fetch(`${API_URL}/api/contacts/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (contact) => {
    setForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
    });
    setEditId(contact._id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Mon Carnet de Contacts</h1>
        <button className="btn" onClick={handleLogout}>Déconnexion</button>
      </header>

      <h2>{editId ? "Modifier un contact" : "Ajouter un contact"}</h2>
      <div className="form-group">
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
        <button className="btn" onClick={handleSave}>
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <h2>Liste des contacts</h2>
      <ul className="contact-list">
        {contacts.map((c) => (
          <li key={c._id}>
            {c.firstName} {c.lastName} - {c.phone}{" "}
            <button className="btn" onClick={() => handleEdit(c)}>Modifier</button>{" "}
            <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Book;
