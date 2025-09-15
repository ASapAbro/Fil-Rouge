const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const requireAuth = require('../middleware/requireAuth');
// Creer un nouveau contact
router.post('/', requireAuth, async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;
        const newContact = new Contact({
            firstName,
            lastName,
            phone,
            user: req.user.id
        });
        const contact = await newContact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});
 
// recuperer tous les contacts de l'utilisateur connecte
router.get('/', requireAuth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mettre a jour un contact   
router.patch('/:id', requireAuth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const { firstName, lastName, phone } = req.body;
        if (firstName) contact.firstName = firstName;
        if (lastName) contact.lastName = lastName;
        if (phone) contact.phone = phone;
        const updatedContact = await contact.save();
        res.json(updatedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Supprimer un contact
router.delete('/:id', requireAuth, async (req, res) => {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!contact) return res.status(404).json({ msg: 'Contact non trouvé' });
    res.json({ msg: 'Contact supprimé' });
});

module.exports = router; 
 
/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récupère tous les contacts de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *   post:
 *     summary: Crée un nouveau contact
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact créé
 *
 * /api/contacts/{id}:
 *   patch:
 *     summary: Met à jour partiellement un contact
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *   delete:
 *     summary: Supprime un contact
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact supprimé
 */