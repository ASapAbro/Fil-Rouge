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
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

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
      { url: process.env.NODE_ENV === "production" 
        ? "https://monservercarnetdecontact.onrender.com" 
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
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// --------------------
// Lancement serveur
// --------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
