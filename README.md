Carnet de Contacts
Application web pour gérer vos contacts avec connexion sécurisée.

Fonctionnalités

Créer un compte et se connecter
Ajouter, modifier et supprimer des contacts
Voir tous vos contacts
Données sécurisées par mot de passe


Technologies
Backend : Node.js, Express, MongoDB, JWT
Frontend : React
Documentation : Swagger

Installation rapide
1. Backend
bashcd backend
npm install
```

Créer un fichier `.env` :
```
PORT=5001
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/contactsdb
JWT_SECRET=votresecret
Lancer le serveur :
bashnpm run dev
Backend sur http://localhost:5001

2. Frontend
bashcd frontend
npm install
npm start
```

Frontend sur **http://localhost:3000**

---

## Comment ça marche ?

1. Vous créez un compte (email + mot de passe)
2. Vous vous connectez et recevez un **token**
3. Ce token permet d'accéder à vos contacts

---

## Routes API

| Action | Route | Connexion requise ? |
|--------|-------|---------------------|
| S'inscrire | `POST /api/auth/register` | Non |
| Se connecter | `POST /api/auth/login` | Non |
| Voir contacts | `GET /api/contacts` | Oui |
| Ajouter contact | `POST /api/contacts` | Oui |
| Modifier contact | `PATCH /api/contacts/:id` | Oui |
| Supprimer contact | `DELETE /api/contacts/:id` | Oui |

---

## Documentation API

Accédez à Swagger pour tester l'API :  
**http://localhost:5001/api-docs**

---

## Structure du projet
```
carnet-contacts/
├── backend/
│   ├── models/        # Schémas base de données
│   ├── routes/        # Routes API
│   ├── middleware/    # Sécurité JWT
│   └── server.js      # Serveur principal
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── views/     # Pages (Login, Register, Contacts)
│       └── App.js
│
└── README.md

Déploiement

Backend : Render ou Heroku
Frontend : Netlify ou Vercel


Ressources utiles

Express - Serveur backend
Mongoose - Base de données MongoDB
JWT - Authentification
bcrypt - Sécurité mot de passe
Swagger - Documentation API
