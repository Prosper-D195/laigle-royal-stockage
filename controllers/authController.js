const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const passport = require('passport');

// Afficher le formulaire d'inscription
exports.getRegister = (req, res) => {
  res.render('register', { title: "Inscription - L'AIGLE ROYAL", error: null });
};

// Traiter l'inscription (POST)
exports.postRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.render('register', { title: "Inscription", error: 'Cet e-mail est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur en base de données
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Rediriger vers la page de connexion après succès
    res.redirect('/auth/login');
  } catch (err) {
    next(err);
  }
};

// Afficher le formulaire de connexion
exports.getLogin = (req, res) => {
  res.render('login', { title: "Connexion - L'AIGLE ROYAL", error: null });
};

// Traiter la connexion (POST) via Passport
exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  // Optionnel : tu pourras ajouter flash-messages plus tard si nécessaire
});

// Gérer la déconnexion
exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/auth/login');
  });
};