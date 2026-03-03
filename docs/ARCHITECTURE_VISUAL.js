/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │     PREMIUM E-COMMERCE TEMPLATE - ARCHITECTURE GLOBALE      │
 * └─────────────────────────────────────────────────────────────┘
 * 
 *  ┌──────────────────────────────────────────────────────────────┐
 *  │                    FRONTEND (React + Vite)                   │
 *  │                        PORT: 3000                             │
 *  ├──────────────────────────────────────────────────────────────┤
 *  │                                                               │
 *  │  ┌────────────────┐         ┌──────────────────────┐        │
 *  │  │   Components   │         │    Global State      │        │
 *  │  ├────────────────┤         ├──────────────────────┤        │
 *  │  │ ├─ common      │         │ ├─ AuthContext      │        │
 *  │  │ │  └─ Header   │         │ └─ CartContext      │        │
 *  │  │ │  └─ Footer   │         │                      │        │
 *  │  │ ├─ pages       │         │  Persisted in        │        │
 *  │  │ │  └─ Home     │         │  localStorage        │        │
 *  │  │ │  └─ Products │         └──────────────────────┘        │
 *  │  │ │  └─ Cart     │                                          │
 *  │  │ │  └─ Checkout │         ┌──────────────────────┐        │
 *  │  │ └─ admin       │         │   API Client         │        │
 *  │  │    └─ Dashboard│         ├──────────────────────┤        │
 *  │  │    └─ Products │         │ Centralizes all      │        │
 *  │  │    └─ Orders   │         │ HTTP calls           │        │
 *  │  │                 │         │ + Error handling     │        │
 *  │  └────────────────┘         └──────────────────────┘        │
 *  │                                                               │
 *  │  ┌────────────────────────────────────────────────┐         │
 *  │  │           Styling (CSS Modules)               │         │
 *  │  ├────────────────────────────────────────────────┤         │
 *  │  │ • global.css (vars, reset, utility)           │         │
 *  │  │ • Component-specific CSS files                │         │
 *  │  │ • Personnalisable via CSS variables           │         │
 *  │  └────────────────────────────────────────────────┘         │
 *  │                                                               │
 *  └──────────────────────────────────────────────────────────────┘
 *                              ↕
 *                           HTTP API
 *                        (Bearer Token)
 *                              ↕
 *  ┌──────────────────────────────────────────────────────────────┐
 *  │              BACKEND (Express + Node.js)                    │
 *  │                        PORT: 5000                             │
 *  ├──────────────────────────────────────────────────────────────┤
 *  │                                                               │
 *  │  ┌──────────────┐    ┌──────────────┐   ┌──────────────┐   │
 *  │  │  Auth Routes │    │   Products   │   │   Orders     │   │
 *  │  ├──────────────┤    ├──────────────┤   ├──────────────┤   │
 *  │  │ POST /reg    │    │ GET /list    │   │ POST /create │   │
 *  │  │ POST /login  │    │ GET /:id     │   │ GET /list    │   │
 *  │  │ GET /me      │    │ POST /admin  │   │ GET /my      │   │
 *  │  └──────────────┘    │ PUT /admin   │   │ PUT /admin   │   │
 *  │                       │ DEL /admin   │   └──────────────┘   │
 *  │  ┌──────────────┐    └──────────────┘                       │
 *  │  │ Admin Routes │                        ┌──────────────┐   │
 *  │  ├──────────────┤                        │ Middleware   │   │
 *  │  │ All CRUD ops │                        ├──────────────┤   │
 *  │  │ Dashboard    │                        │ auth         │   │
 *  │  │ Statistics   │                        │ admin        │   │
 *  │  └──────────────┘                        │ errorHandler │   │
 *  │                                          │ logger       │   │
 *  │  ┌──────────────┐                        └──────────────┘   │
 *  │  │  JWT Utils   │                                            │
 *  │  ├──────────────┤      ┌─────────────────────────┐          │
 *  │  │ generateToken│      │   Database Models       │          │
 *  │  │ verifyToken  │      ├─────────────────────────┤          │
 *  │  └──────────────┘      │ • User (auth data)      │          │
 *  │                        │ • Product (inventory)   │          │
 *  │  ┌──────────────┐      │ • Order (transactions)  │          │
 *  │  │ Bcrypt Utils │      └─────────────────────────┘          │
 *  │  ├──────────────┤                                            │
 *  │  │ Hash/Compare │                                            │
 *  │  │ Passwords    │                                            │
 *  │  └──────────────┘                                            │
 *  │                                                               │
 *  └──────────────────────────────────────────────────────────────┘
 *                              ↕
 *                  MongoDB Driver / Mongoose
 *                              ↕
 *  ┌──────────────────────────────────────────────────────────────┐
 *  │                 MongoDB (Cloud Atlas)                        │
 *  ├──────────────────────────────────────────────────────────────┤
 *  │                                                               │
 *  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
 *  │  │  Users   │  │ Products │  │  Orders  │  │ Sessions │   │
 *  │  │ Collection│ │Collection│  │Collection│  │Collection│   │
 *  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
 *  │                                                               │
 *  │  Indexes on:                                                 │
 *  │  • users.email (unique)                                     │
 *  │  • products.sku (unique)                                    │
 *  │  • products.category                                         │
 *  │  • products (text index for search)                         │
 *  │  • orders.customer.userId                                    │
 *  │                                                               │
 *  └──────────────────────────────────────────────────────────────┘
 */

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │           FLUX DE DONNÉES - Cas d'Usage Utilisateur         │
 * └─────────────────────────────────────────────────────────────┘
 * 
 *  AUTHENTIFICATION
 *  ───────────────
 *  1. Visiteur → [Register Form] → Frontend
 *  2. Frontend POST /api/auth/register
 *  3. Backend hash password + save User
 *  4. Backend return JWT token
 *  5. Frontend save token in localStorage
 *  6. Frontend authenticated state ← user data
 * 
 *  SHOPPING
 *  ────────
 *  1. Frontend GET /api/products?filters
 *  2. Backend Query + Filter MongoDB products
 *  3. Frontend render products list
 *  4. User click product → Frontend GET /api/products/:id
 *  5. Frontend display full details
 *  6. User "Add to cart" → CartContext.addToCart()
 *  7. Cart stored in localStorage
 * 
 *  CHECKOUT
 *  ────────
 *  1. User proceed to checkout
 *  2. Frontend require authentication (authMiddleware)
 *  3. Submit form → Frontend POST /api/orders
 *  4. Backend validate items stock
 *  5. Backend calculate pricing (tax + shipping)
 *  6. Backend create Order document
 *  7. Backend update product stocks (-quantity)
 *  8. Backend return order confirmation
 *  9. Frontend clear cart + redirect to success page
 * 
 *  ADMIN WORKFLOW
 *  ──────────────
 *  1. Admin login with admin account
 *  2. JWT includes role: 'admin'
 *  3. Frontend redirect to /admin dashboard
 *  4. Dashboard GET /api/admin/stats
 *  5. Display revenue, orders count, etc.
 *  6. Add product → POST /api/admin/products
 *  7. List orders → GET /api/admin/orders
 *  8. Update status → PUT /api/admin/orders/:id
 * 
 */

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │         SÉCURITÉ - MÉCANISMES DE PROTECTION                 │
 * └─────────────────────────────────────────────────────────────┘
 * 
 *  AUTHENTIFICATION
 *  ─── Backend: JWT signé + expiration
 *  ─── Frontend: Token dans localStorage
 *  ─── Middleware: Vérification du token sur chaque requête
 * 
 *  AUTORISATION
 *  ─── Role-based: User vs Admin
 *  ─── adminMiddleware vérifie role === 'admin'
 *  ─── Routes /api/admin protégées
 * 
 *  DATA VALIDATION
 *  ─── Frontend: Validation basique des inputs
 *  ─── Backend: Validation stricte avec Mongoose schema
 *  ─── Validators customs pour email, prix, etc.
 * 
 *  MOTS DE PASSE
 *  ─── Salted + hashed avec bcrypt (rounds: 10)
 *  ─── Jamais stocké en clair
 *  ─── Comparaison sécurisée à la connexion
 * 
 * PROTECTION CSRF
 * ─── Implé dans l'état si besoin: ajouter token cookie
 * 
 * CORS
 * ─── Whitelist frontend domain uniquement
 * ─── Credentials allowed pour auth
 * 
 * HTTPS/SSL
 * ─── Structure prête, à configurer en production
 * ─── Redirects HTTP → HTTPS
 * 
 * RATE LIMITING
 * ─── À ajouter: npm express-rate-limit
 * ─── Protège contre brute-force
 * 
 */

// Le schéma reste constant et réutilisable.
// L'architecture supporte facilement:
// - Ajout de microservices
// - Migration vers PostgreSQL
// - Intégration de Stripe/PayPal
// - Système de notifications
// - Cache Redis
// - MessageQueue
