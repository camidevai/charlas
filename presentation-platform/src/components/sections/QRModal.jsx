import { motion } from 'framer-motion';
import { Instagram, X } from 'lucide-react';
import './QRSection.css'; // Reutilizamos el mismo CSS

const QRModal = ({ handleClose, qrCodeUrl }) => {
  return (
    <motion.div
      className="qr-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="qr-modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()} // Evita que el modal se cierre al hacer clic dentro
      >
        <motion.button className="qr-modal-close" onClick={handleClose} whileHover={{ scale: 1.2, rotate: 90 }}>
          <X size={24} />
        </motion.button>
        
        <motion.img
          layoutId="qr-code-image" // Mismo ID mágico que en la tarjeta principal
          src={qrCodeUrl}
          alt="Código QR para Instagram @CamiDevAI"
          className="qr-modal-image"
        />
        
        <div className="qr-modal-text">
          <Instagram size={24} />
          <span className="modal-username">@CamiDevAI</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QRModal;