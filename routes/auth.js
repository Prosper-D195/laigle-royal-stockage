const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Inscription
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Connexion
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Déconnexion
router.get('/logout', authController.getLogout);

module.exports = router;