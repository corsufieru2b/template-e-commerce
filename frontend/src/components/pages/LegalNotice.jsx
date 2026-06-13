import React from 'react';
import brandingConfig from '../../config/branding.json';
import '../../styles/InfoPages.css';

const LegalNotice = () => {
  return (
    <div className="info-page">
      <div className="info-page__container">
        <header className="info-page__header">
          <h1 className="info-page__title">Mentions legales</h1>
          <p className="info-page__intro">
            Informations legales de l'editeur et de l'hebergeur de la boutique.
          </p>
        </header>

        <article className="info-page__card">
          <section className="info-page__section">
            <h2>Editeur du site</h2>
            <p>{brandingConfig.storeName}</p>
            <p>{brandingConfig.contact.address}</p>
            <p>Email: {brandingConfig.contact.email}</p>
            <p>Telephone: {brandingConfig.contact.phone}</p>
          </section>

          <section className="info-page__section">
            <h2>Informations societaires</h2>
            <ul className="info-page__list">
              <li>SIREN: {brandingConfig.companyInfo?.siren || 'A renseigner'}</li>
              <li>SIRET: {brandingConfig.companyInfo?.siret || 'A renseigner'}</li>
              <li>TVA intracommunautaire: {brandingConfig.companyInfo?.vat_number || 'A renseigner'}</li>
            </ul>
          </section>

          <section className="info-page__section">
            <h2>Hebergement</h2>
            <p>
              Hebergeur: A completer selon votre prestataire (ex: Vercel, OVH, AWS).
            </p>
          </section>

          <section className="info-page__section">
            <h2>Propriete intellectuelle</h2>
            <p>
              Tous les contenus du site (textes, visuels, logo, code, structure) sont proteges.
              Toute reproduction, representation ou exploitation sans autorisation est interdite.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default LegalNotice;
