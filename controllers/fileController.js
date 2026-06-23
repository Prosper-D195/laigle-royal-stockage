const prisma = require('../config/prisma');

// Afficher le contenu d'un dossier (ses sous-dossiers et ses fichiers)
exports.getFolderContent = async (req, res, next) => {
  const { id } = req.params; // ID du dossier en cours d'exploration
  try {
    const currentFolder = await prisma.folder.findUnique({
      where: { id: id },
      include: {
        subFolders: true, // Récupère les sous-dossiers s'il y en a
        files: true       // Récupère les fichiers contenus
      }
    });

    if (!currentFolder || currentFolder.userId !== req.user.id) {
      return res.redirect('/');
    }

    res.render('folder', {
      title: `${currentFolder.name} - L'AIGLE ROYAL`,
      user: req.user,
      folder: currentFolder
    });
  } catch (err) {
    next(err);
  }
};

// Traiter l'ajout d'un VRAI fichier avec Multer (POST)
exports.createFile = async (req, res, next) => {
  const { folderId } = req.body;
  try {
    // Si l'utilisateur clique sur envoyer sans avoir choisi de fichier
    if (!req.file) {
      return res.redirect(`/folders/${folderId}`);
    }

    // Récupération des vraies métadonnées du fichier générées par Multer
    const name = req.file.originalname;            // Vrai nom du fichier (ex: facture.pdf)
    const url = `/uploads/${req.file.filename}`;    // Chemin local sur ton serveur Ubuntu
    const size = req.file.size;                     // Vraie taille calculée en octets
    const mimeType = req.file.mimetype;             // Vrai type (application/pdf, image/jpeg...)

    // Enregistrement définitif dans PostgreSQL avec Prisma
    await prisma.file.create({
      data: {
        name,
        url,
        size,
        mimeType,
        userId: req.user.id,
        folderId: folderId
      }
    });

    // Recharge la page du dossier pour voir apparaître le nouveau fichier
    res.redirect(`/folders/${folderId}`);
  } catch (err) {
    next(err);
  }
};