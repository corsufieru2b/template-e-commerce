# Premium Customization Guide

## 1) Pages indispensables a personnaliser

Mettre a jour les informations legales et contacts dans:
- frontend/src/config/branding.json
- frontend/src/components/pages/LegalNotice.jsx
- frontend/src/components/pages/Terms.jsx
- frontend/src/components/pages/Privacy.jsx

## 2) Parcours client

Le parcours standard est:
- Home -> Produits -> Fiche produit -> Panier -> Checkout -> Confirmation

Fichiers principaux:
- frontend/src/components/pages/ProductDetail.jsx
- frontend/src/components/pages/Cart.jsx
- frontend/src/components/pages/Checkout.jsx
- frontend/src/components/pages/OrderConfirmation.jsx

## 3) Footer et confiance

Le footer est configure dans:
- frontend/src/components/common/Footer.jsx
- frontend/src/styles/Footer.css

A verifier avant livraison:
- Liens CGV, Confidentialite, Mentions legales
- Contact support
- Retours 14 jours
- Livraison suivie

## 4) Branding rapide

Modifier en priorite dans branding:
- storeName
- colors
- contact
- shipping.defaultCost
- shipping.freeShippingThreshold
- companyInfo.siret
- companyInfo.vat_number

## 5) Checkout et commandes

Le checkout envoie une commande via:
- frontend/src/utils/apiClient.js -> createOrder
- backend/src/routes/orders.js

Si vous changez les regles de frais ou TVA:
- Frontend: frontend/src/components/pages/Cart.jsx et Checkout.jsx
- Backend: backend/src/routes/orders.js

## 6) QA avant vente

Checklist minimale:
- Pages legales accessibles
- Footer sans lien casse
- Panier mobile lisible
- Checkout valide avec utilisateur connecte
- Confirmation commande visible
- Test desktop + mobile

## 7) Evolutions premium recommandees

- Integrer Stripe (paiement reel)
- Email transactionnel (confirmation + expedition)
- SEO meta tags par page
- Avis clients connectes a la base
