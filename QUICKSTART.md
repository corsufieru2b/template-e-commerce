# 🚀 Quick Start Guide

Démarrer le template en 5 minutes!

## 1. Installation des dépendances

```bash
npm install-all
```

Ce script installe les packages pour:
- Root workspace
- Frontend
- Backend

## 2. Configuration de base

### Variables d'environnement

**Backend** (`backend/.env`):
```bash
cp backend/.env.example backend/.env

# Edit backend/.env - Au minimum:
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=dev_secret_key_change_in_prod
```

**Frontend** (`frontend/.env.local`):
```bash
cp frontend/.env.example frontend/.env.local

# Defaults travaillent localement
```

## 3. Démarrer MongoDB en local

### Option A: Docker
```bash
docker run -d -p 27017:27017 --name ecommerce-mongo mongo:latest
```

### Option B: MongoDB installed localement
```bash
mongodb  # ou mongod sur certains systèmes
```

### Option C: MongoDB Atlas (Cloud)
```
1. Créer un compte https://www.mongodb.com/cloud/atlas
2. Créer un Free tier cluster
3. Copier la chaîne de connexion
4. Remplacer dans backend/.env
```

## 4. Démarrer le serveur

### Terminal 1 - Backend
```bash
cd backend
npm run dev

# Output: 🚀 ECOMMERCE API RUNNING on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev

# Output: VITE v5.0.0 ready in 200 ms
#         ➜  Local:   http://localhost:3000/
```

## 5. Premiers pas

### Accéder aux applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health check**: http://localhost:5000/api/health

### Créer un premier utilisateur
1. Frontend → "Inscription"
2. Créer un compte client
3. Connectez-vous

### Créer un utilisateur admin (via MongoDB)
```bash
# Terminal séparé
cd backend

# Ouvrir MongoDB shell
mongosh

# Switch db
use ecommerce

# Insérer un admin
db.users.insertOne({
  email: "admin@example.com",
  password: await require('bcryptjs').hash('password123', 10),
  firstName: "Admin",
  lastName: "User",
  role: "admin"
})

# Fermer
exit
```

Ou si bcryptjs n'est pas importé, laisser le password en clair de moment (⚠️ dev seulement):
```bash
db.users.insertOne({
  email: "admin@example.com",
  password: "$2a$10$abcdefghijklmnop",  # will be real hash
  firstName: "Admin",
  lastName: "User",
  role: "admin"
})
```

### Admin Panel
1. Connectez-vous avec l'admin account
2. Frontend → URL `/admin`
3. Dashboard affiche les stats
4. Création de produits test

## 6. Ajouter des produits de test

### Via l'interface admin:
1. Go to `/admin/products`
2. Click "+ Ajouter un produit"
3. Remplir le formulaire
4. Submit

### Produit exemple:
```
Nom: T-shirt Premium
Description: A comfortable t-shirt made from 100% cotton
Prix: 29.99
SKU: TSHIRT-001
Catégorie: vêtements
Stock: 50
```

## 7. Tester le flux complet

1. **Navigation**: 
   - Go to `/products` → Voir les produits

2. **Détail produit**: 
   - Click product → Voir les détails
   - Ajouter au panier

3. **Panier**: 
   - Go to `/cart` → Ajuster quantités
   - "Procéder à la commande"

4. **Checkout** (require auth):
   - Entrer adresse
   - Choisir une méthode de paiement
   - Click "Confirmer la commande"

5. **Admin**: 
   - Go to `/admin/orders`
   - Voir la commande créée
   - Changer le statut

## 8. Arrêter les serveurs

```bash
# Backend: Ctrl+C dans Terminal 1
# Frontend: Ctrl+C dans Terminal 2

# Arrêter MongoDB (si Docker)
docker stop ecommerce-mongo
```

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
```
✓ Vérifier que MongoDB tourne (docker ps ou mongosh)
✓ Vérifier MONGODB_URI dans backend/.env
✓ Vérifier les credentials si MongoDB Atlas
```

### "CORS error"
```
✓ Vérifier que frontend run sur http://localhost:3000
✓ Vérifier CORS_ORIGIN dans backend/.env
✓ Redémarrer les deux serveurs
```

### "Frontend shows 'Cannot GET /'"
```
✓ Vérifier que Vite a démarré
✓ Vérifier le port 3000 est libre
✓ Vérifier console pour les erreurs
```

### "Product button not working"
```
✓ Vérifier qu'il y a des produits en BD
✓ Vérifier backend API répond: curl http://localhost:5000/api/health
✓ Vérifier VITE_API_URL dans frontend/.env.local
```

---

## 📚 Étapes suivantes

Maintenant que c'est en route:

1. **Lire la doc**:
   - [Architecture](./ARCHITECTURE.md) - Vue d'ensemble
   - [Personnalisation](./CUSTOMIZATION.md) - Adapter pour un client

2. **Comprendre le code**:
   - Frontend: `src/App.jsx` → point d'entrée
   - Backend: `src/index.js` → serveur Express
   - Models: `src/models/` → schémas MongoDB

3. **Ajouter des features**:
   - Paiement: Intégrer Stripe
   - Email: Ajouter nodemailer
   - Analytics: Google Analytics
   - Chat: Intégrer socket.io

4. **Déployer**:
   - Suivre [CUSTOMIZATION.md - Phase 5](./CUSTOMIZATION.md#phase-5-déploiement-2-3h)

---

## 💡 Tips & Tricks

### Développement plus rapide
- Hot reload front + back
- Logs couleurs pour debug
- VS Code REST Client pour tester API

### Gestion du panier
- Persiste dans localStorage
- Clsir du panier après commande

### JWT tokens
- Expirent après 7 jours
- Stockés en localStorage (dev only - use httpOnly cookies in prod)
- Visible dans DevTools → Application → localStorage

### Admin vs User
- Les deux peuvent acheter
- Seul admin accède à `/admin`
- Rôle défini dans JWT

---

**Bon développement! 🚀**

Pour l'aide: Consultez [ARCHITECTURE.md](./ARCHITECTURE.md) ou [CUSTOMIZATION.md](./CUSTOMIZATION.md)
