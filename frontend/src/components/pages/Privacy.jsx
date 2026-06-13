import React from 'react';
import brandingConfig from '../../config/branding.json';
import '../../styles/InfoPages.css';

const Privacy = () => {
  return (
    <div className="info-page">
      <div className="info-page__container">
        <header className="info-page__header">
          <h1 className="info-page__title">Politique de confidentialite</h1>
          <p className="info-page__intro">
            Cette politique explique comment les donnees personnelles sont collecte es, utilisees et protegees.
          </p>
        </header>

        <article className="info-page__card">
          <section className="info-page__section">
            <h2>Donnees collecte es</h2>
            <ul className="info-page__list">
              <li>Informations de compte: nom, prenom, email.</li>
              <li>Informations de commande: adresse de livraison, historique d'achat.</li>
              <li>Donnees techniques: logs, cookies fonctionnels et analytiques.</li>
            </ul>
          </section>

          <section className="info-page__section">
            <h2>Finalites du traitement</h2>
            <ul className="info-page__list">
              <li>Execution et suivi des commandes.</li>
              <li>Gestion du compte client et du support.</li>
              <li>Amelioration de l'experience utilisateur.</li>
            </ul>
          </section>

          <section className="info-page__section">
            <h2>Vos droits</h2>
            <p>
              Vous pouvez demander l'acces, la rectification, la suppression ou la portabilite de vos donnees.
              Contact RGPD: {brandingConfig.companyInfo?.rgpd_email || brandingConfig.contact.email}
            </p>
          </section>

          <section className="info-page__section">
            <h2>Duree de conservation</h2>
            <p>
              Les donnees sont conservees pendant la duree necessaire aux finalites definies et aux obligations
              legales applicables.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Privacy;
