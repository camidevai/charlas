import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';
import QRModal from './QRModal'; // Importamos el nuevo componente del modal
import './QRSection.css'; // Importamos el CSS mejorado

const QRSection = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animación 3D sutil en lugar de la rotación completa
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0]);

  const qrCodeUrl = "https://subir-imagen.com/images/2025/09/07/image07f1682244b477d7.png";

  return (
    <>
      <div ref={ref} className="qr-section-perspective-wrapper">
        <motion.div
          className="qr-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY, opacity }}
        >
          <div className="qr-info">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Conecta conmigo
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Escanea el código para seguirme en Instagram y no te pierdas ninguna novedad.
            </motion.p>
            <motion.div
              className="qr-username"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Instagram size={24} />
              <span>@CamiDevAI</span>
            </motion.div>
          </div>

          <motion.div
            className="qr-image-wrapper"
            onClick={() => setShowQRModal(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="qr-glow" />
            <motion.img
              layoutId="qr-code-image" // ID mágico para la transición
              src={qrCodeUrl}
              alt="Código QR para Instagram @CamiDevAI"
              className="qr-code"
              whileHover={{ scale: 1.1 }}
            />
            <div className="qr-overlay">
              <p>Ampliar QR</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

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