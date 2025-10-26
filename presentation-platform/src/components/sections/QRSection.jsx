import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X } from 'lucide-react';
import QRModal from './QRModal';
import './QRSection.css';

const QRSection = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const qrCodeUrl = "https://subir-imagen.com/images/2025/09/07/image07f1682244b477d7.png";

  // Animación de entrada del widget
  const widgetVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3
      }
    }
  };

  // Animación de minimización
  const expandVariants = {
    expanded: {
      width: 'auto',
      height: 'auto',
      transition: { duration: 0.3 }
    },
    minimized: {
      width: '80px',
      height: '80px',
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Widget Flotante */}
      <motion.div
        className="qr-floating-widget"
        variants={widgetVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="qr-widget-container"
          variants={expandVariants}
          animate={isMinimized ? 'minimized' : 'expanded'}
        >
          {/* Botón de minimizar/expandir */}
          <motion.button
            className="qr-widget-toggle"
            onClick={() => setIsMinimized(!isMinimized)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={isMinimized ? 'Expandir' : 'Minimizar'}
          >
            <Instagram size={24} />
          </motion.button>

          {/* Contenido expandido */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                className="qr-widget-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="qr-widget-header">
                  <h3>Conecta conmigo</h3>
                  <motion.button
                    className="qr-widget-close"
                    onClick={() => setIsMinimized(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Descripción */}
                <p className="qr-widget-description">
                  Escanea para seguirme en Instagram
                </p>

                {/* QR Code */}
                <motion.div
                  className="qr-widget-image-wrapper"
                  onClick={() => setShowQRModal(true)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="qr-widget-glow" />
                  <motion.img
                    layoutId="qr-code-image"
                    src={qrCodeUrl}
                    alt="Código QR para Instagram @CamiDevAI"
                    className="qr-widget-code"
                    whileHover={{ scale: 1.08 }}
                  />
                  <div className="qr-widget-overlay">
                    <p>Ampliar</p>
                  </div>
                </motion.div>

                {/* Username */}
                <div className="qr-widget-username">
                  <Instagram size={16} />
                  <span>@CamiDevAI</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal QR */}
      <AnimatePresence>
        {showQRModal && (
          <QRModal
            handleClose={() => setShowQRModal(false)}
            qrCodeUrl={qrCodeUrl}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default QRSection;