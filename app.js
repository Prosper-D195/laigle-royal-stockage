require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./config/prisma'); // Import du fichier centralisé
const folderRoutes = require('./routes/folders');
const fileRoutes = require('./routes/files');

// Importation des configurations et des routes
require('./config/passport');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

const app = express();

// 1. Configuration du moteur de template EJS
app.set('view engine', 'ejs');

// 2. Middlewares de base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
// 3. Configuration de la session avec stockage en BDD via Prisma
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'aigle_royal_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 jour
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // 2 minutes
      dbRecordIdFunction: undefined,
    }),
  })
);

// 4. Initialisation de Passport.js
app.use(passport.initialize());
app.use(passport.session());

// 5. Middleware pour injecter l'utilisateur dans toutes les vues
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

// 6. Branchement des routes
app.use('/auth', authRoutes);
app.use('/', indexRoutes);
app.use('/folders', folderRoutes);
app.use('/files', fileRoutes);

// 7. Lancement du serveur (Une seule déclaration de PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur de l'Aigle Royal lancé avec succès sur le port ${PORT}`);
});