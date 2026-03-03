# Guide de Personnalisation Rapide

## Objectif
Transformer ce template en boutique client en 10-15 heures maximum.

---

## Phase 1: Branding (1-2h)

### 1.1 Editer le fichier branding.json
```bash
config/branding.json
```

Personnaliser:
- `storeName`: Nom de la boutique
- `storeName_subtitle`: Sous-titre
- `logo`: Path vers le logo (placer l'image dans `frontend/public/images/`)
- `colors`: Palette de couleurs
- `contact`: Infos de contact
- `shipping`: Coûts de livraison
- `companyInfo`: Infos légales (SIRET, RGPD, etc.)

### 1.2 Ajouter les images
```
frontend/public/images/
├── logo.png
├── favicon.ico  
└── hero-banner.jpg
```

### 1.3 CSS Personnalisé (optionnel)
Éditer `frontend/src/styles/global.css` pour affiner les couleurs:
```css
:root {
  --primary-color: #FF6B6B;
  --secondary-color: #2D3436;
  --accent-color: #00B894;
}
```

**Temps estimé**: 1-2 heures

---

## Phase 2: Produits Initiaux (2-3h)

### Méthode 1: Via l'interface admin (Recommandé)
1. Créer un compte admin dans la BD
2. Se connecter sur `/admin`
3. Ajouter les produits via le formulaire

### Méthode 2: Import en masse
```bash
# Script de seed (à créer)
node backend/scripts/seed-products.js

# Exemple de fichier
backend/data/products.json
```

### Structure d'un produit
```json
{
  "name": "Produit",
  "description": "Description complète",
  "price": 99.99,
  "sku": "PROD-001",
  "category": "électronique",
  "stock": 50,
  "images": [
    { "url": "/images/product-1.jpg", "alt": "Vue de face" }
  ],
  "specifications": [
    { "key": "Couleur", "value": "Noir" }
  ]
}
```

**Temps estimé**: 2-3 heures

---

## Phase 3: Configuration Backend (1-2h)

### 3.1 Variable d'environnement backend
```bash
backend/.env
```

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce
JWT_SECRET=change_this_to_random_secret_key_in_production
CORS_ORIGIN=https://yourdomain.com
STORE_NAME=Client Store Name
STORE_EMAIL=email@client.com
```

### 3.2 Logique métier spécifique
- Modifier les frais de port: `backend/src/routes/orders.js` ligne 67
- Paramétrer la TVA: Même fichier, ligne 62
- Ajouter des méthodes de paiement: `backend/src/models/Order.js`

**Temps estimé**: 1-2 heures

---

## Phase 4: Configuration Frontend (1h)

### 4.1 Variables frontend
```bash
frontend/.env.local
```

```
VITE_API_URL=https://api.yourdomain.com
VITE_ENV=production
```

### 4.2 Textes et contenu
Éditer les pages statiques:
- `frontend/src/components/pages/Home.jsx` - Contenu accueil
- `frontend/src/components/common/Footer.jsx` - Liens footer

### 4.3 Métadonnées SEO (optionnel)
```html
frontend/index.html

<!-- Ajouter -->
<meta name="description" content="Description boutique">
<meta name="keywords" content="mots-clés">
```

**Temps estimé**: 1 heure

---

## Phase 5: Déploiement (2-3h)

### 5.1 Frontend - Déploiement Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd frontend
vercel

# Ou connecter GitHub directement sur vercel.com
```

### 5.2 Backend - Déploiement Heroku/Railway
#### Heroku
```bash
# Installer Heroku CLI
npm install -g heroku

# Login
heroku login

# Créer l'app
heroku create app-name

# Deploy
git push heroku main

# Variables d'env
heroku config:set MONGODB_URI=mongodb+srv://...
```

#### Railway
```
1. Créer un compte sur railway.app
2. Connecter le repo GitHub
3. Ajouter les variables d'environnement
4. Deploy automatique
```

### 5.3 Base de données - MongoDB Atlas
1. Créer un cluster gratuit ou payant
2. Créer un utilisateur BD
3. Whitelist l'IP du serveur
4. Copier la chaîne de connexion
5. Ajouter aux .env

### 5.4 Configurer le domaine
```
1. Pointer le domaine vers le frontend (Vercel, Netlify)
2. Configurer subdomaine api.yourdomain.com pour le backend
3. Mettre à jour CORS_ORIGIN dans backend .env
```

**Temps estimé**: 2-3 heures

---

## Phase 6: Vérifications Finales (1h)

### Checklist
- [ ] Branding appliqué (logo, couleurs, nom)
- [ ] Produits présents et visibles
- [ ] Panier fonctionne
- [ ] Connexion/Inscription fonctionne
- [ ] Admin peut créer des produits
- [ ] Commandes sont créées
- [ ] Emails envoyés? (optionnel)
- [ ] SSL/HTTPS configuré
- [ ] Mobile responsive
- [ ] Performance OK (lighthouse score)

### Tests
```bash
# Frontend test
npm run dev  # Vérifier sur http://localhost:3000

# Backend test
npm run dev  # Vérifier sur http://localhost:5000
```

---

## Temps Total Estimé
- Phase 1 (Branding): 1-2h
- Phase 2 (Produits): 2-3h
- Phase 3 (Backend): 1-2h
- Phase 4 (Frontend): 1h
- Phase 5 (Déploiement): 2-3h
- Phase 6 (Tests): 1h

**Total: 8-12 heures**

---

## Template Prêt? Checklist Livraison

Avant de livrer au client:

- [ ] Domaine configuré
- [ ] SSL/HTTPS actif
- [ ] Admin account créé pour le client
- [ ] Premiers produits chargés
- [ ] Paiement en mode test (ou stub)
- [ ] Emails de confirmation (optionnel pour v1)
- [ ] Documentation client fournie
- [ ] Support téléphonique/email établi
- [ ] Monitoring mis en place

---

## Évolutions Futures

Ces éléments peuvent être ajoutés après la livraison initiale:

1. **Paiement réel**
   - Intégration Stripe
   - Intégration PayPal
   - Webhook et confirmations

2. **Email**
   - Confirmation de commande
   - Suivi de livraison
   - Newsletter

3. **SEO**
   - Sitemap dynamique
   - Métadonnées produits
   - Schéma structuré (JSON-LD)

4. **Analytics**
   - Google Analytics
   - Heatmaps
   - A/B testing

5. **Support Client**
   - Chat en direct
   - Ticketing
   - FAQ

---

**Besoin d'aide?** Consultez la documentation technique: [ARCHITECTURE.md](./ARCHITECTURE.md)
