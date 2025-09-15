const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth');
const app = express();
app.use(express.json());
app.use(cors());

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
    servers: [{ url: "http://localhost:" + process.env.PORT }],
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
app.use('/api/contacts', require('./routes/contacts'));

// --------------------
// Lancement serveur
// --------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
