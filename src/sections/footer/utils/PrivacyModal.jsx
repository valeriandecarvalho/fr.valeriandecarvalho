import Modal from './Modal.jsx';

const PrivacyModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Politique de Confidentialité">
        <div className="space-y-4 font-sans">
            <p>
                Ce site portfolio respecte votre vie privée et ne collecte aucune donnée personnelle
                sans votre consentement explicite.
            </p>
            <p>
                <strong>Données collectées :</strong> Ce site ne collecte aucune donnée personnelle.
                Seules les statistiques de visite anonymes peuvent être analysées via les outils d'hébergement.
            </p>
            <p>
                <strong>Cookies :</strong> Ce site n'utilise pas de cookies de suivi.
            </p>
            <p>
                Pour toute question concernant cette politique, contactez-moi via les réseaux sociaux
                disponibles sur ce site.
            </p>
        </div>
    </Modal>
);

export default PrivacyModal;