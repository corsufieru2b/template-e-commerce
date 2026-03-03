# 🛍️ Premium E-Commerce Template

Template e-commerce professionnel, modulaire et réutilisable destiné à la revente client avec personnalisation rapide.

## 📋 Vue d'ensemble

Ce template fournit une base solide pour déployer rapidement une boutique en ligne moderne avec :
- ✅ Stack complet (React, Node.js/Express, MongoDB/PostgreSQL)
- ✅ Architecture modulaire et scalable
- ✅ Authentification sécurisée
- ✅ Dashboard admin complet
- ✅ Responsive mobile-first
- ✅ Configuration centralisée pour branding rapide

**Temps de déploiement environ 10-15h par client**

---

## 🏗️ Architecture

```
ecommerce-premium-template/
├── frontend/                 # React App (Port 3000)
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── common/      # Header, Footer, Navigation
│   │   │   ├── pages/       # Home, Products, Checkout
│   │   │   └── admin/       # Dashboard Admin
│   │   ├── context/         # Global State (Cart, Auth)
│   │   ├── config/          # Configuration (API, Branding)
│   │   ├── styles/          # CSS globaux + Thème
│   │   └── utils/           # Helpers, Validations
│   └── .env.example         # Variables d'environnement
│
├── backend/                  # Node.js/Express (Port 5000)
│   ├── src/
│   │   ├── models/          # Schémas (User, Product, Order)
│   │   ├── controllers/      # Logique métier
│   │   ├── routes/          # Endpoints API
│   │   ├── middleware/       # Auth, Validation, CORS
│   │   ├── config/          # Connexion BD, Branding
│   │   └── utils/           # Hash, JWT, Erreurs
│   └── .env.example         # Variables d'environnement
│
├── config/                   # Configuration partagée
│   └── branding.json        # Couleurs, Logo, Typographie
│
└── docs/                    # Documentation technique
```

---

## 🚀 Stack Technique

| Couche | Technologie | Version |
|--------|------------|---------|
| Frontend | React + Vite | 18+ |
| State Management | Context API | - |
| Styling | CSS3 + Modules | - |
| Backend | Node.js + Express | 18+ |
| Database | MongoDB | 5.0+ |
| Authentication | JWT + Bcrypt | - |
| API | RESTful | - |

---

## 📦 Installation

### Prérequis
- Node.js 18+
- MongoDB local ou MongoDB Atlas
- npm ou yarn

### Étapes

```bash
# 1. Cloner le template
git clone [repo-url] [nom-client]
cd [nom-client]

# 2. Installer les dépendances
npm install-all

# 3. Configurer les variables d'environnement
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env.local

# 4. Personnaliser le branding
# Éditer config/branding.json

# 5. Démarrer en développement
npm run dev

# 6. Accéder aux applications
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Admin: http://localhost:3000/admin
```

---

## 🎨 Personnalisation Rapide

### Branding (5 minutes)

Éditer `config/branding.json` :
```json
{
  "storeName": "Mon Magasin",
  "logo": "/images/logo.png",
  "primaryColor": "#FF6B6B",
  "secondaryColor": "#2D3436",
  "accentColor": "#00B894"
}
```

### Couleurs et Typographie

- Frontend: `src/styles/theme.css`
- Backend ne traite que les données métier

### Produits Initiaux

Charger via l'API admin ou base de données directe.

---

## 🔐 Sécurité

- ✅ Mots de passe hashés avec bcrypt
- ✅ JWT pour l'authentification
- ✅ CORS configuré
- ✅ Validation des données côté serveur
- ✅ Protection des endpoints admin
- ✅ Structure prête pour HTTPS/SSL

---

## 📋 Fonctionnalités Principales

### Front Office
- [x] Page d'accueil avec conversion
- [x] Catalogue produits avec filtres
- [x] Fiche produit détaillée
- [x] Panier dynamique
- [x] Tunnel de commande
- [x] Design responsive mobile-first

### Back Office Admin
- [x] Authentification sécurisée
- [x] CRUD Produits
- [x] Gestion Commandes
- [x] Dashboard avec statistiques
- [x] Modification des statuts

---

## 🔄 Flux Utilisateur

```
Visiteur
  ↓
Page d'accueil → Catalogue → Fiche Produit
  ↓
Ajouter au panier → Panier
  ↓
Commencer achat → Connexion/Inscription
  ↓
Adresse livraison → Paiement (stub)
  ↓
Confirmation commande
```

---

## 🛠️ Développement

### Frontend
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Tests
```bash
npm test              # Frontend tests
npm run test --workspace=backend
```

---

## 📝 API Documentation

### Authentification
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Produits
```
GET /api/products            # Tous les produits
GET /api/products/:id        # Un produit
POST /api/admin/products     # Créer (Admin)
PUT /api/admin/products/:id  # Modifier (Admin)
DELETE /api/admin/products/:id
```

### Commandes
```
GET /api/orders              # Mes commandes
POST /api/orders            # Créer commande
GET /api/admin/orders       # Toutes les commandes (Admin)
```

---

## 🚀 Déploiement

### Environnement de Production

```bash
# 1. Build
npm run build

# 2. Set variables
export NODE_ENV=production
export MONGODB_URI=mongodb+srv://...
export JWT_SECRET=long_secret_key

# 3. Start
npm start
```

Recommandations:
- Utiliser MongoDB Atlas (cloud)
- Déployer avec Heroku, Railway, ou Vercel
- Configurer HTTPS
- Ajouter un reverse proxy (Nginx)

---

## 📚 Documentation

- [Architecture Globale](docs/ARCHITECTURE.md)
- [Guide Personnalisation](docs/CUSTOMIZATION.md)
- [API Endpoints](docs/API.md)
- [Déploiement](docs/DEPLOYMENT.md)

---

## ⚖️ Licence

License Propriétaire - Utilisation limitée à l'agence et ses clients.

---

## 📞 Support

Pour toute question sur le template, consultez la documentation ou contactez l'équipe.

---

**Version**: 1.0.0  
**Dernière mise à jour**: Mars 2026  
**Statut**: Production-Ready
