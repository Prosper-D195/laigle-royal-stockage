const prisma = require('../config/prisma');

// Récupérer tous les dossiers de l'utilisateur connecté
exports.getFolders = async (req, res, next) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    
    res.render('dashboard', {
      title: "Tableau de Bord - L'AIGLE ROYAL",
      user: req.user,
      folders: folders
    });
  } catch (err) {
    next(err);
  }
};

// Traiter la création d'un nouveau dossier (POST)
exports.createFolder = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (!name || name.trim() === "") {
      return res.redirect('/');
    }

    await prisma.folder.create({
      data: {
        name: name.trim(),
        userId: req.user.id
      }
    });

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};