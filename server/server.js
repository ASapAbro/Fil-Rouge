const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');

const app = express();

// --------------------
// Middleware
// --------------------
app.use(express.json());
app.use(cors({
  origin: "*", // Autorise toutes les origines. À restreindre en production.
  methods: ["GET","POST","PATCH","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// --------------------
// Connexion MongoDB
// --------------------
console.log('Tentative de connexion à MongoDB...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté avec succès"))
  .catch(err => {
    console.error("❌ Erreur de connexion MongoDB:", err);
    console.error("MONGO_URI:", process.env.MONGO_URI ? "Défini" : "Non défini");
  });

// --------------------
// Swagger avec sécurité JWT
// --------------------
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "MyContacts API",
      version: "1.0.0",
      description: "API pour gérer un carnet de contacts personnel"
    },
    servers: [
      { url: process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : "http://localhost:" + (process.env.PORT || 5001)
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --------------------
// Routes
// --------------------
// Route de base pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.json({ 
    message: "MyContacts API is running 🚀", 
    endpoints: {
      auth: "/api/auth",
      contacts: "/api/contacts",
      docs: "/api/docs"
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// --------------------
// Lancement serveur
// --------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
