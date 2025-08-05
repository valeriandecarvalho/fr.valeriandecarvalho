import Modal from './Modal.jsx';

const CGUModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Conditions Générales d'Utilisation">
        <div className="space-y-4 font-sans">
            <p>
                En utilisant ce site portfolio, vous acceptez les présentes conditions générales d'utilisation.
            </p>
            <p>
                Ce site est un portfolio personnel présentant mes compétences et réalisations professionnelles.
                Toute reproduction ou utilisation non autorisée du contenu est interdite.
            </p>
            <p>
                Pour toute question concernant ces conditions, vous pouvez me contacter via les réseaux sociaux
                disponibles sur ce site.
            </p>
        </div>
    </Modal>
);

export default CGUModal;