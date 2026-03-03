# Deployment Guide

Guide de déploiement complet pour mettre le template en production.

---

## 🎯 Checklist Pré-Déploiement

### Backend

- [ ] Vérifier tous les `.env` réels (pas `.example`)
- [ ] JWT_SECRET configuré avec une clé forte (min 32 chars)
- [ ] MongoDB URI pointant vers Atlas (cloud)
- [ ] NODE_ENV = production
- [ ] CORS_ORIGIN = domaine client
- [ ] Email/logging configurés
- [ ] Rate limiting en place (optionnel mais recommandé)

### Frontend

- [ ] Vérifier `.env.local` avec API URL production
- [ ] Logo et images optimisées
- [ ] branding.json complètement rempli
- [ ] Tests en mode production : `npm run build`
- [ ] Pas de `console.log` en prod

### Database

- [ ] MongoDB Atlas cluster créé
- [ ] User database avec password fort
- [ ] IP whitelist configurée
- [ ] Collections et indexes créés

---

## 🚀 Déploiement Backend

### Option 1 : Heroku (Simple)

```bash
# 1. Créer un compte sur heroku.com et installer CLI
npm install -g heroku
heroku login

# 2. Depuis le dossier backend
cd backend

# 3. Créer l'app Heroku
heroku create app-name  # Remplacer par le nom de l'application

# 4. Ajouter variables d'environnement
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
heroku config:set JWT_SECRET=your_long_secret_key_here
heroku config:set CORS_ORIGIN=https://yourdomain.com
heroku config:set STORE_NAME="Client Store Name"

# 5. Déployer
git push heroku main

# 6. Vérifier les logs
heroku logs --tail

# 7. Tester
curl https://app-name.herokuapp.com/api/health
```

### Option 2: Railway (Moderne + Gratuit)

```bash
# 1. Créer compte sur railway.app
# 2. Connecter le repo GitHub
# 3. Sélectionner le dossier backend
# 4. Ajouter les variables d'env dans Railway dashboard
# 5. Deploy automatique à chaque push
```

### Option 3: AWS/GCP/Azure

Voir la documentation spécifique à chaque plateforme.

---

## 🌐 Déploiement Frontend

### Option 1: Vercel (Recommandé pour Next.js/React)

```bash
# 1. Créer compte sur vercel.com
# 2. Installer Vercel CLI
npm i -g vercel

# 3. Depuis le dossier frontend
cd frontend

# 4. Déployer en CLI
vercel

# 5. Ou connecter directement GitHub pour auto-deploy

# 6. Ajouter les variables d'env
#    VITE_API_URL=https://api.yourdomain.com
```

### Option 2: Netlify

```bash
# 1. Créer compte netlify.com
# 2. Connecter GitHub repo
# 3. Build command: npm --workspace=frontend run build
# 4. Publish directory: frontend/dist
# 5. Ajouter env vars
# 6. Deploy automatique
```

### Option 3: GitHub Pages (Gratuit mais limité)

```bash
# Ajouter à package.json
"homepage": "https://yourusername.github.io/repo-name"

# Build et deploy
npm run build
npm install --save-dev gh-pages

# Dans package.json scripts:
"deploy": "gh-pages -d frontend/dist"

npm run deploy
```

---

## 🗄️ Configuration MongoDB Atlas

### Créer une Base de Données

```bash
1. Aller sur mongodb.com/cloud/atlas
2. Créer un compte gratuit
3. Créer un cluster (Free tier peut marcher)
4. Attendre ~10 minutes
5. Créer un utilisateur database:
   - Username: ecommerce_user
   - Password: StrongPassword123!
6. Network Access → Add IP:
   - Add 0.0.0.0/0 (accessible from anywhere)
   - OU witelister les IPs du backend
7. Clusters → Connect → Drivers:
   Copier la connection string:
   mongodb+srv://user:password@cluster.mongodb.net/ecommerce
```

### Indexer les Collections

```javascript
/* Dans MongoDB shell via atlas UI */

/* Users */
db.users.createIndex({ email: 1 }, { unique: true })

/* Products */
db.products.createIndex({ sku: 1 }, { unique: true })
db.products.createIndex({ category: 1, isActive: 1 })
db.products.createIndex({ name: "text", description: "text" })

/* Orders */
db.orders.createIndex({ "customer.userId": 1 })
db.orders.createIndex({ createdAt: -1 })
```

---

## 🔒 Configuration SSL/HTTPS

### Vercel/Netlify

- Certificat SSL automatique ✅

### Backend Heroku

- SSL automatique ✅

### Backend Custom (AWS/GCP)

```bash
# Utiliser Let's Encrypt (Gratuit)
# Nginx/Apache pour reverse proxy

# Ou géré par la plateforme
```

---

## 🌍 Configuration du Domaine

### Mise en place

```bash
# 1. Acheter le domaine (Namecheap, GoDaddy, etc)

# 2. Pour le Frontend (Vercel example):
#    A Record: yourdomain.com → vercel servers
#    CNAME: www → cname.vercel-dns.com
#    (Tous les détails dans Vercel dashboard)

# 3. Pour le Backend:
#    CNAME: api.yourdomain.com → backend-app.herokuapp.com
#    (Détails dans Heroku dashboard)

# 4. Attendre la DNS propagation (5min - 48h)

# 5. Tester
curl https://yourdomain.com
curl https://api.yourdomain.com/api/health
```

### CORS Update

```bash
# Backend .env
CORS_ORIGIN=https://yourdomain.com
# Redéployer le backend!
```

---

## 📊 Monitoring & Logs

### Heroku

```bash
heroku logs --tail
heroku logs --tail --app=app-name
heroku ps:scale web=2  # Augmenter les dynos
```

### Backend Logs & Errors

```bash
# Logs centralisés optionnel:
# - DataDog
# - New Relic
# - Sentry (JS errors)
# - CloudWatch (AWS)
```

---

## 🛡️ Production Security Checklist

- [ ] HTTPS/SSL activé partout
- [ ] JWT_SECRET changé + fort
- [ ] CORS restreint au domaine client
- [ ] Rate limiting activé
- [ ] Admin password fort
- [ ] Sauvegardes automatiques MongoDB
- [ ] Logs centralisés
- [ ] Monitoring des erreurs
- [ ] Firewall/WAF configura
- [ ] Scan de sécurité fait

---

## 🔄 Updates et Maintenance

### Pull updates du template

```bash
# Si on veut récupérer les mises à jour du template
git remote add template https://github.com/yourorg/template-ecommerce.git
git fetch template main
git merge template/main

# Résoudre les conflits si nécessaire
```

### Backups

```bash
# MongoDB Atlas: Snapshots automatiques (plan free = 7 jours)
# Plan payant = durée configurable

# Recommandation: backup hebdomadaire manuellement
mongodump --uri="mongodb+srv://..." --out=./backups
```

### Updates des dépendances

```bash
# Vérifier les vulnerabilités
npm audit

# Fixer automatiquement
npm audit fix

# Mettre à jour les packages
npm outdated
npm update
```

---

## 💬 Performance - Optimisations

### Frontend Optimization

- [ ] Code splitting (importé automatique par Vite)
- [ ] Images optimisées (JPG pour photos, PNG pour icons)
- [ ] Lazy loading des composants
- [ ] Cache HTTP configuré
- [ ] Gzip activé

### Backend Optimization

- [ ] Database indexes
- [ ] Query optimization
- [ ] Caching (Redis optionnel)
- [ ] CDN pour les images
- [ ] Compression middleware

---

## 🎯 Post-Deployment

### Test

```bash
# Test accès public
curl https://yourdomain.com
curl https://api.yourdomain.com/api/health

# Test features
1. Inscription
2. Ajout au panier
3. Checkout
4. Admin panel
5. Commande créée
```

### Communication Client

```
✅ Infrastructure en place
✅ Domaine pointant le frontend
✅ Admin account créé + password envoyé
✅ Premiers produits chargés
✅ Documentation fournie
✅ Support téléphonique établi
```

---

## 🚨 Troubleshooting Déploiement

### "Panier vide après refresh"

- localStorage bloqué par le navigateur
- Frontend doit relancer l'appel API

### "Admin ne peut pas créer de produits"

- Vérifier le rôle admin en BD
- Vérifier le JWT n'a pas expiré
- Vérifier les logs backend pour les erreurs

### "Commandes pas créées"

- Vérifier MongoDB connection
- Vérifier les logs backend
- Vérifier le panier n'est pas vide

---

## 📚 Ressources

- [Heroku Docs](https://devcenter.heroku.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Vercel Docs](https://vercel.com/docs)
- [Let's Encrypt](https://letsencrypt.org)

---

**Déploiement complet: 2-3 heures**

Contrôlez chaque étape et testez à chaque fois!
