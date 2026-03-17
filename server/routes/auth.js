const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requireAuth = require('../middleware/requireAuth');
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Tentative d\'inscription pour:', email);
        const exists = await User.findOne({ email });
        if (exists) {
            console.log('Email déjà utilisé:', email);
            return res.status(400).json({ msg: 'Email déjà utilisé' });
        }

        const user = new User({ email, password });
        await user.save();
        console.log('Utilisateur créé avec succès:', email);
        res.status(201).json({ msg: 'Utilisateur créé' });
    } catch (err) {
        console.error('Erreur lors de l\'inscription:', err);
        res.status(500).json({ error: err.message, details: 'Erreur serveur lors de l\'inscription' });
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, renvoie token JWT
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Tentative de connexion pour:', email);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Utilisateur non trouvé:', email);
            return res.status(400).json({ msg: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Mot de passe incorrect pour:', email);
            return res.status(400).json({ msg: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Connexion réussie pour:', email);
        res.json({ token });
    } catch (err) {
        console.error('Erreur lors de la connexion:', err);
        res.status(500).json({ error: err.message, details: 'Erreur serveur lors de la connexion' });
    }
});

/**
 * @swagger
 * /api/auth/test:
 *   get:
 *     summary: Test route protégée
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé
 *       401:
 *         description: Token invalide ou absent
 */
router.get('/test', requireAuth, (req, res) => {
    res.json({ msg: `Accès autorisé pour l'utilisateur ${req.user.id}` });
});

module.exports = router;
