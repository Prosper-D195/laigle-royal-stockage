const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');

// Configuration du stockage de Multer sur le disque local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Les fichiers iront dans le dossier /uploads
  },
  filename: function (req, file, cb) {
    // On génère un nom unique : Date_du_jour-nom_d_origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

// L'intercepteur "upload.single('uploaded_file')" extrait le fichier du formulaire avant le contrôleur
router.post('/create', ensureAuthenticated, upload.single('uploaded_file'), fileController.createFile);

module.exports = router;