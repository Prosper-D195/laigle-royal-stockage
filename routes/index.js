const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

// La racine affiche désormais les vrais dossiers de la BDD via le contrôleur
router.get('/', ensureAuthenticated, folderController.getFolders);

module.exports = router;