const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const fileController = require('../controllers/fileController');

// Middleware de sécurité
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

// Route pour créer un dossier
router.post('/create', ensureAuthenticated, folderController.createFolder);
router.get('/:id', ensureAuthenticated, fileController.getFolderContent);

module.exports = router;