# laigle-royal-stockage

# 🦅 L'AIGLE ROYAL - Système de Gestion Documentaire & Suivi Agricole

**L'AIGLE ROYAL** est une application web robuste de gestion documentaire et d'archivage sécurisé conçue pour centraliser, structurer et suivre les données d'une exploitation agro-industrielle moderne. Ce système permet notamment le suivi des parcelles, la gestion des stocks, et l'indexation de fichiers techniques et administratifs (fiches de traitement, rapports de rendement, factures).

---

## 🚀 Fonctionnalités Principales

* **Authentification Restreinte & Sécurisée :** Système d'inscription et de connexion utilisant `Passport.js` et hachage des mots de passe avec `bcryptjs`.
* **Sessions Persistantes :** Stockage des sessions utilisateurs directement dans la base de données PostgreSQL via `@quixo3/prisma-session-store`.
* **Gestion des Espaces par Parcelle :** Création et organisation de dossiers racines segmentés par secteurs géographiques ou blocs d'exploitation.
* **Importation Réelle de Fichiers :** Téléversement physique de documents (PDF, images, feuilles de calcul) sur le serveur à l'aide du middleware `Multer`.
* **Architecture Modulaire (MVC) :** Séparation stricte des responsabilités (Modèles Prisma, Vues EJS, Contrôleurs Logiques) garantissant l'évolutivité du code.

---

## 🛠️ Stack Technique

* **Backend :** Node.js, Express.js
* **Base de Données & ORM :** PostgreSQL, Prisma ORM
* **Moteur de Template :** EJS (Embedded JavaScript)
* **Sécurité & Authentification :** Passport.js (Stratégie Locale), Session Express
* **Gestion des Fichiers :** Multer (Stockage local sur disque)

---

## 📂 Structure du Projet

```text
laigle-royal-stockage/
├── config/
│   ├── passport.js         # Configuration des stratégies d'authentification
│   └── prisma.js           # Centralisation de l'instance du client Prisma
├── controllers/
│   ├── authController.js   # Logique d'inscription et de connexion
│   ├── fileController.js   # Logique d'indexation et lecture des fichiers
│   └── folderController.js # Logique de gestion des dossiers parcelles
├── prisma/
│   ├── schema.prisma       # Modèles de données (User, Session, Folder, File)
│   └── migrations/         # Historique des migrations PostgreSQL
├── routes/
│   ├── auth.js             # Routes d'authentification (/auth/*)
│   ├── files.js            # Routes d'importation des fichiers (/files/*)
│   └── folders.js          # Routes de gestion des espaces (/folders/*)
├── uploads/                # Répertoire de stockage physique des documents importés
├── views/
│   ├── partials/           # Éléments d'interface réutilisables (header, navbar, footer)
│   ├── dashboard.ejs       # Tableau de bord principal (Vue racine)
│   ├── folder.ejs          # Vue détaillée d'un dossier et de ses fichiers
│   ├── login.ejs           # Interface de connexion
│   └── register.ejs        # Interface d'inscription
├── .env                    # Variables d'environnement (Masqué au commit)
├── app.js                  # Point d'entrée principal de l'application
└── package.json            # Dépendances et scripts du projet