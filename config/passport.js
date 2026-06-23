const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const prisma = require('./prisma');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // On utilise l'e-mail à la place du "username" par défaut
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // 1. Rechercher l'utilisateur par son e-mail
        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        // Si l'utilisateur n'existe pas
        if (!user) {
          return done(null, false, { message: 'E-mail incorrect ou utilisateur introuvable.' });
        }

        // 2. Vérifier et comparer le mot de passe haché
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          return done(null, false, { message: 'Mot de passe incorrect.' });
        }

        // Si tout est correct, on passe l'utilisateur à Passport
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Sérialisation : Détermine quelles données de l'utilisateur doivent être enregistrées dans la session (l'ID)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Désérialisation : Retrouve l'utilisateur complet en base à partir de l'ID stocké dans la session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;