<!-- Copilot Custom Instructions for this workspace -->

# Premium E-Commerce Template - Development Guidelines

## Project Overview
This is a white-label, production-ready e-commerce template designed for rapid client deployment (10-15 hours per client).

**Stack**: React + Node.js/Express + MongoDB
**Architecture**: Modular, scalable, with centralized branding configuration

## Key Principles

### 1. Modularity
- Keep components focused and reusable
- Separate business logic from UI
- Middleware patterns for cross-cutting concerns

### 2. Security
- Always validate on backend
- Use bcrypt for passwords
- JWT for stateless authentication
- CORS whitelist by domain

### 3. Customization
- All branding in `config/branding.json`
- CSS variables for theming
- Environment variables for configuration
- Avoid hardcoding client-specific logic

### 4. Scalability
- Database indexes on frequently queried fields
- Proper error handling with middleware
- Query optimization
- Ready for additional services (payments, email, etc.)

## Development Workflow

### Frontend
- `npm --workspace=frontend run dev` (Vite hot reload)
- Components organized by feature: pages, common, admin
- Global state via Context API (Auth + Cart)
- Styling: CSS modules + global variables

### Backend
- `npm --workspace=backend run dev` (Node watch mode)
- Routes organized by feature (auth, products, orders, admin)
- Middleware for auth, validation, error handling
- MongoDB models with Mongoose

### Database
- Use MongoDB Atlas for development/production
- Create indexes for performance
- Document each schema in comments

## Code Standards

### Comments
Each file should have:
- Header comment explaining purpose
- Inline comments for business logic
- JSDoc comments for public functions

Example:
```javascript
/**
 * GET ALL PRODUCTS avec filtres
 * 
 * Structure logique:
 * 1. Construire le filtre
 * 2. Exécuter la requête
 * 3. Retourner résultats paginés
 */
```

### Error Handling
- Backend: Use centralized errorHandler middleware
- Frontend: Show user-friendly messages
- Log all errors with context

### Testing
- Test authentication flows
- Test cart persistence
- Test admin CRUD
- Test edge cases (empty cart, stock out, etc.)

## Before Deploying a Client

### Checklist
- [ ] branding.json fully configured
- [ ] Logo and images in place
- [ ] .env files set up (not .example)
- [ ] Database seeded with products
- [ ] Admin account created
- [ ] SSL/HTTPS configured
- [ ] Domain pointing correctly
- [ ] All features tested
- [ ] No console.log() in production code
- [ ] Monitor/logs configured

### Documentation
- Provide client with:
  - Admin login credentials (secure)
  - Dashboard walkthrough
  - How to add products
  - How to manage orders
  - Support contact info

## Extending the Template

### Adding Features
1. Create route in backend
2. Add middleware if needed
3. Create API client method in frontend
4. Build UI component
5. Test end-to-end
6. Update documentation

### Common Additions
- **Payment**: Stripe/PayPal integration
- **Email**: Nodemailer + templates
- **Search**: Elasticsearch or MongoDB full-text
- **Analytics**: Google Analytics or custom tracking
- **Chat**: Socket.io for real-time support

## Performance Considerations

- Frontend: Code splitting, lazy loading
- Backend: Database indexes, query optimization
- Database: Proper indexing strategy
- Caching: Consider Redis for frequently accessed data

## Security Reminders

- Never commit `.env` files
- Rotate JWT secrets per deployment
- Validate all inputs server-side
- Use HTTPS in production
- Keep dependencies updated
- Monitor for vulnerabilities

---

**Last Update**: March 2026
**Version**: 1.0.0
