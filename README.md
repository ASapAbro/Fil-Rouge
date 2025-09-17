# Carnet de Contacts

Une application web complète pour gérer un carnet de contacts avec authentification **JWT**, CRUD complet et interface React.

---

## 1. Présentation

Ce projet permet à un utilisateur de :

- S’inscrire et se connecter via JWT
- Ajouter, modifier et supprimer des contacts
- Voir la liste de ses contacts
- Sécuriser l’accès aux données avec authentification

**Stack utilisée :**

- Backend : Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Frontend : React.js, React Router, Toastify
- Documentation API : Swagger
- Déploiement : Heroku / Render (backend), Netlify / Vercel (frontend)

---

## 2. Prérequis

- Node.js >= 18
- npm >= 9
- MongoDB Atlas ou local
- Git

---

## 3. Installation

### Backend

1. Se placer dans le dossier backend :

cd backend


2. Installer les dépendances :
 
npm install


3. Créer un fichier .env à la racine du backend :


PORT=5001
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/contactsdb
JWT_SECRET=tonsecretjwt

4. Lancer le serveur :

npm run dev
Le backend tourne sur http://localhost:5001

**Frontend**

1. Se placer dans le dossier frontend :

cd frontend

2. Installer les dépendances :

npm install

3. Lancer le frontend :

npm start
Le frontend tourne sur http://localhost:3000

4. Authentification JWT
L’utilisateur s’inscrit avec un email et mot de passe.

Le mot de passe est haché avec bcrypt avant stockage.

Après connexion, un token JWT est retourné et stocké dans localStorage.

Ce token est utilisé pour accéder aux routes protégées des contacts (/api/contacts).

5. API Contacts (CRUD)

Routes
Méthode	     │         Endpoint	        │            Descriptio             │  Auth
POST	     │    /api/auth/register    │       Crée un utilisateur	        │   ❌
POST	     │     /api/auth/login	    │  Connexion et récupération JWT.   │   ❌
GET	         │      /api/contacts	    │    Récupère tous les contacts.    │   ✅
POST	     │      /api/contacts	    │      Crée un nouveau contact	    │   ✅
PATCH	     │    /api/contacts/:id	    │       Met à jour un contact	    │   ✅
DELETE	     │    /api/contacts/:id	    │        Supprime un contact	    │   ✅
 

6. Swagger
La documentation API est disponible via Swagger à :


http://localhost:5001/api-docs
Elle permet de tester toutes les routes directement depuis le navigateur.

7. Déploiement
Backend : Heroku ou Render

Frontend : Netlify ou Vercel

Exemple Render Backend
Créer un projet Node.js

Ajouter les variables d'environnement (MONGO_URI, JWT_SECRET, PORT)

Déployer

Exemple Netlify Frontend
Build React :

bash
Copier le code
npm run build
Déployer le dossier build/ sur Netlify

8. Structure du projet
bash
Copier le code
carnet-contacts/
├─ backend/
│  ├─ models/          # Modèles Mongoose
│  ├─ routes/          # Routes API
│  ├─ middleware/      # Middleware (auth JWT)
│  ├─ server.js        # Point d'entrée backend
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/ 
│  │  ├─ views/ ## (Book, Register, Login…)
│  │  └─ App.js
│  └─ package.json
└─ README.md



// Documentation nécessaire //

Express (framework backend)
🔗 Express docs (https://expressjs.com/fr/)

→ Gestion des routes, middlewares, JSON.

Mongoose (ODM MongoDB)
🔗 Mongoose docs (https://mongoosejs.com/docs/)

→ Création de modèles (User, Contact), schémas, relations (ref).

bcrypt (hachage mot de passe)
🔗 bcryptjs npm (https://www.npmjs.com/package/bcryptjs)

→ Sécuriser les mots de passe avant stockage.

jsonwebtoken (JWT)
🔗 jsonwebtoken npm (https://www.npmjs.com/package/jsonwebtoken)

→ Création et vérification des tokens pour l’auth.

CORS (sécurité API)
🔗 cors npm (https://www.npmjs.com/package/cors)

→ Autoriser le frontend à communiquer avec le backend.

Swagger (doc API)
🔗 Swagger OpenAPI 3 (https://www.npmjs.com/package/cors)

🔗 swagger-jsdoc (https://www.npmjs.com/package/swagger-jsdoc)

🔗 swagger-ui-express (https://www.npmjs.com/package/swagger-ui-express)

→ Décrire et tester l'API.

Dotenv (variables d’environnement)
🔗 dotenv npm (https://www.npmjs.com/package/dotenv)

→ Stocker MONGO_URI et JWT_SECRET dans un .env.