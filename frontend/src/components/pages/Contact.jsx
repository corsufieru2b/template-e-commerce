import React, { useState } from 'react';
import brandingConfig from '../../config/branding.json';
import '../../styles/Contact.css';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  orderNumber: '',
  message: '',
  consent: false
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <header className="contact-page__header">
          <h1 className="contact-page__title">Contact</h1>
          <p className="contact-page__subtitle">
            Une question commande, livraison ou SAV ? Notre equipe repond sous 24h ouvrees.
          </p>
        </header>

        <div className="contact-page__grid">
          <section className="contact-card">
            <h2>Service client</h2>
            <ul className="contact-card__list">
              <li>
                <span className="contact-card__label">Email</span>
                <span className="contact-card__value">{brandingConfig.contact.email}</span>
              </li>
              <li>
                <span className="contact-card__label">Telephone</span>
                <span className="contact-card__value">{brandingConfig.contact.phone}</span>
              </li>
              <li>
                <span className="contact-card__label">Adresse</span>
                <span className="contact-card__value">{brandingConfig.contact.address}</span>
              </li>
            </ul>

            <div className="contact-card__trust">
              <p>Paiement securise SSL et partenaires certifies</p>
              <p>Expedition suivie en France et en Europe</p>
              <p>Retours facilites sous 14 jours</p>
            </div>
          </section>

          <section className="contact-form">
            <h2>Envoyer un message</h2>
            {submitted && (
              <p className="contact-form__success">
                Message envoye. Nous revenons vers vous rapidement.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <div className="form-group">
                  <label htmlFor="firstName">Prenom</label>
                  <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="orderNumber">Numero de commande (optionnel)</label>
                <input id="orderNumber" name="orderNumber" value={form.orderNumber} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="6" value={form.message} onChange={handleChange} required />
              </div>

              <label className="contact-form__consent" htmlFor="consent">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={handleChange}
                  required
                />
                J'accepte que mes donnees soient utilisees uniquement pour traiter ma demande.
              </label>

              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
