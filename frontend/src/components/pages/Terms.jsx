import React from 'react';
import '../../styles/InfoPages.css';

const Terms = () => {
  return (
    <div className="info-page">
      <div className="info-page__container">
        <header className="info-page__header">
          <h1 className="info-page__title">Conditions generales de vente</h1>
          <p className="info-page__intro">
            Cadre contractuel entre la boutique et le client pour toute commande effectuee en ligne.
          </p>
        </header>

        <article className="info-page__card">
          <section className="info-page__section">
            <h2>1. Objet</h2>
            <p>
              Les presentes CGV definissent les droits et obligations des parties dans le cadre de la vente
              des produits proposes sur le site.
            </p>
          </section>

          <section className="info-page__section">
            <h2>2. Prix et paiement</h2>
            <ul className="info-page__list">
              <li>Les prix sont affiches en euros TTC.</li>
              <li>Les frais de livraison sont precises avant validation de commande.</li>
              <li>Le paiement est exige au moment de la commande.</li>
            </ul>
          </section>

          <section className="info-page__section">
            <h2>3. Livraison</h2>
            <p>
              Les delais annonces sont indicatifs. Un email de suivi est envoye apres expedition.
            </p>
          </section>

          <section className="info-page__section">
            <h2>4. Droit de retractation</h2>
            <p>
              Le client dispose d'un delai legal de 14 jours pour exercer son droit de retractation,
              sauf exceptions prevues par la loi.
            </p>
          </section>

          <section className="info-page__section">
            <h2>5. Service client</h2>
            <p>
              Pour toute demande relative a une commande, contactez le support via la page Contact.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Terms;
