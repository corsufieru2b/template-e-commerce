# Documentation Technique

## 📋 Vue d'ensemble de l'architecture

Ce template e-commerce est construit sur une architecture modulaire en trois couches :

### 1. Frontend (React + Vite)
- **Port**: 3000
- **Responsabilités**: Interface utilisateur, panier client, authentification
- **État**: Context API (Auth + Cart)

### 2. Backend (Node.js + Express)
- **Port**: 5000
- **Responsabilités**: API REST, logique métier, persistance
- **Base de données**: MongoDB

### 3. Configuration partagée
- **Fichier**: `config/branding.json`
- **Objectif**: Personnalisation centralisée (couleurs, typographie, infos)

---

## 🎯 Principes de Conception

### Modularité
- Chaque fonctionnalité est isolée dans son propre dossier
- Composants réutilisables et découplés
- Routes protégées avec middleware d'authentification

### Scalabilité
- Architecture prête pour l'ajout de nouvelles fonctionnalités
- Séparation claire des responsabilités (MVC pattern)
- Facile de passer à PostgreSQL ou autre BD

### Personnalisation
- **Branding**: Un seul fichier JSON à modifier
- **CSS**: Variables globales pour les couleurs
- **Logique métier**: Configurations centralisées dans les variables d'environnement

---

## 🚀 Déploiement Rapide

### Étape 1: Cloner et renommer
```bash
git clone <template-repo> client-nom
cd client-nom
```

### Étape 2: Configuration client
```bash
# Éditer config/branding.json
{
  "storeName": "NOM DU CLIENT",
  "logo": "/images/logo-client.png",
  "colors": { ... }
}
```

### Étape 3: Variables d'environnement
```bash
# Frontend
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env.local

# Adaptez les URLs et secrets
```

### Étape 4: Déploiement
```bash
# Build
npm run build

# Déployer frontend sur Vercel/Netlify
# Déployer backend sur Heroku/Railway

# Paramétrer MongoDB Atlas
```

---

## 📊 Structure de la Base de Données

### Users
```javascript
{
  _id: ObjectId,
  email: string (unique),
  password: string (hashed),
  firstName: string,
  lastName: string,
  role: 'user' | 'admin',
  phone: string,
  addresses: Array,
  createdAt: Date
}
```

### Products
```javascript
{
  _id: ObjectId,
  name: string,
  description: string,
  price: number,
  sku: string (unique),
  category: string,
  stock: number,
  images: Array,
  ratings: { average, count },
  isActive: boolean,
  isFeatured: boolean,
  createdAt: Date
}
```

### Orders
```javascript
{
  _id: ObjectId,
  orderNumber: string (unique),
  customer: Object,
  items: Array,
  shippingAddress: Object,
  pricing: { subtotal, shippingCost, taxAmount, total },
  paymentMethod: string,
  status: string,
  createdAt: Date
}
```

---

## 🔄 Flux d'Authentification

1. **Inscription**: 
   - POST `/api/auth/register`
   - Hash du mot de passe avec bcrypt
   - Génération JWT
   - Stockage du token client

2. **Connexion**:
   - POST `/api/auth/login`
   - Comparaison des passwords
   - Génération JWT
   - Token stocké dans localStorage

3. **Requêtes protégées**:
   - Header: `Authorization: Bearer <token>`
   - Middleware vérifie la validité du JWT
   - Injection de `req.user` dans la requête

4. **Routes admin**:
   - Vérification du rôle `admin`
   - Accès restreint aux fonctionnalités d'administration

---

## 💾 Variables d'Environnement

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_long_secret_key
CORS_ORIGIN=https://yourdomain.com
BCRYPT_ROUNDS=10
```

### Frontend (.env.local)
```
VITE_API_URL=https://api.yourdomain.com
VITE_ENV=production
```

---

## 🎨 Personnalisation Rapide

### Couleurs
Éditer les CSS variables dans:
- Frontend: `src/styles/global.css`
- Backend n'a pas de styles

Ou modifier `config/branding.json` et importer dans React:
```javascript
import brandingConfig from '../config/branding.json';
// Appliquer les couleurs via CSS variables
```

### Logo et Images
1. Placer les images dans `frontend/public/images/`
2. Mettre à jour les URLs dans `config/branding.json`
3. Récréer le build

### Contenu du Site
- Page d'accueil: `frontend/src/components/pages/Home.jsx`
- Produits: Charger via l'API admin
- Textes: Créer un fichier de traductions si nécessaire

---

## 🧪 Tests

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
npm test
```

---

## 📈 Optimisations pour la Production

- [ ] Activer GZIP sur le serveur
- [ ] Mettre en place un CDN pour les images
- [ ] Configurer HTTPS/SSL
- [ ] Ajouter une protection WAF (Web Application Firewall)
- [ ] Implémenter un cache HTTP approprié
- [ ] Configurer des alertes de monitoring
- [ ] Mettre en place des sauvegardes automatiques BD
- [ ] Implémenter un système de logs centralisé

---

## 🚨 Sécurité - Checklist

- [x] Hashage des mots de passe (bcrypt)
- [x] JWT pour l'authentification sans état
- [x] CORS configuré
- [x] Validation des données côté serveur
- [ ] Rate limiting (à ajouter)
- [ ] Gestion des CSRF tokens (si needed)
- [ ] Chiffrement des données sensibles (à considérer)
- [ ] Audit logs (à ajouter)

---

## 📞 Support et Maintenance

### Problèmes Courants

**Erreur de connexion MongoDB**
- Vérifier la chaîne de connexion
- Vérifier les whitelist IPs sur MongoDB Atlas
- Vérifier les identifiants

**Panier ne persiste pas**
- Vérifier que localStorage fonctionne (pas de mode privé)
- Vérifier la console pour les erreurs

**Admin ne voit pas les produits**
- Vérifier le rôle dans DB (role: 'admin')
- Vérifier que le JWT n'a pas expiré

---

## 📚 Ressources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vite Documentation](https://vitejs.dev)

---

**Version**: 1.0.0  
**Dernière mise à jour**: Mars 2026  
**Mainteneur**: Your Agency
