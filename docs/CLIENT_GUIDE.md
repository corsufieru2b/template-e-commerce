# Guide client - Premium E‑commerce Template

Ce guide explique comment personnaliser rapidement le site pour un client, comment obtenir un accès admin et les commandes utiles pour démarrer.

## Rendus visuels (branding)

- Fichier principal de branding : `frontend/src/config/branding.json`
- Pour changer :
  - Modifier `storeName`, `storeName_subtitle`, `colors`, `typography`, `contact`, etc.
  - Remplacer le logo dans `frontend/public/images/logo.png` (ou mettre le path voulu dans `branding.json`).
  - Redémarrer Vite si nécessaire (les variables VITE sont rechargées au démarrage). En dev, Vite applique les CSS variables à chaud.

## Démarrer les serveurs (développement)

Backend (API) :

```bash
cd backend
npm run dev
```

Frontend (Vite, exposé sur le LAN) :

```bash
cd frontend
npm run dev:host
```

## Accès admin (gestion produits / commandes)

- Compte admin initial (seed) :
  - Email : `admin@client.com`
  - Mot de passe : `Admin123!`
- URL admin (dev) : `http://<MACHINE_IP>:3000/admin`

### Créer un admin si besoin

- Via script (sur serveur) : `cd backend && npm run seed` (idempotent)
- Via API (nécessite être admin) : `POST /api/admin/users` avec body `{ email, password, firstName, lastName, role }` (role = 'admin'|'user')

## Modifier produits / commandes

- Se connecter en admin → interface `/admin` → CRUD produits et gestion commandes.
- Les changements persistents se font dans la base MongoDB (Mongoose). Pour déployer chez un client, utilisez une instance MongoDB dédiée.

## Checklist avant production

- Définir variables d'env en production (`MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`, etc.)
- Désactiver CORS permissif (dans `backend/src/index.js`) et mettre `CORS_ORIGIN` sur le domaine du client
- Supprimer ou verrouiller le script `seed.js` et changer le mot de passe admin par défaut
- Activer HTTPS (reverse proxy + certs) et forcer redirections
- Ajouter monitoring/logs et sauvegardes DB
- Tester les flux de paiement (Stripe/PayPal) en sandbox

## Support & reprise

- Fichier de résumé de session : `docs/SESSION_SUMMARY.md` (contient liste des changements effectués et points d'attention).

---
Besoin d'une version imprimable du guide ou d'un PDF à partager au client ? Je peux le générer.
