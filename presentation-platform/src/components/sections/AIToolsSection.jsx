import { motion } from 'framer-motion'
import { ChevronLeft, Settings, Sparkles, Wand2 } from 'lucide-react'
import './AIToolsSection.css'

const AIToolsSection = ({ onPrev, isFirst, sectionNumber, totalSections }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.section 
      className="ai-tools-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="tools-content">
        {/* Header */}
        <motion.div className="tools-header" variants={itemVariants}>
          <Settings className="section-icon" />
          <h1 className="tools-title">Herramientas de IA Generativa</h1>
          <p className="tools-subtitle">
            Explorando las aplicaciones prácticas y el potencial transformador de la IA
          </p>
        </motion.div>

        {/* Placeholder para contenido */}
        <motion.div className="tools-placeholder" variants={itemVariants}>
          <div className="placeholder-content">
            <div className="placeholder-icon">
              <Wand2 size={48} />
            </div>
            <h3>Demostración de Herramientas IA</h3>
            <p>
              Esta sección incluirá demostraciones en vivo de herramientas de IA generativa,
              mostrando su potencial y aplicaciones prácticas en diferentes áreas.
            </p>
            <div className="placeholder-features">
              <div className="feature">
                <Sparkles size={20} />
                <span>Generación de texto e imágenes</span>
              </div>
              <div className="feature">
                <Settings size={20} />
                <span>Herramientas de productividad</span>
              </div>
              <div className="feature">
                <Wand2 size={20} />
                <span>Aplicaciones creativas</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mensaje final */}
        <motion.div className="final-message" variants={itemVariants}>
          <div className="message-content">
            <h3>¡Gracias por acompañarme en este viaje!</h3>
            <p>
              Espero que esta experiencia interactiva haya sido tan enriquecedora para ustedes
              como lo ha sido para mí compartir mi historia y explorar juntos el mundo de la IA.
            </p>
          </div>
        </motion.div>

        {/* Navegación */}
        <motion.div className="tools-navigation" variants={itemVariants}>
          <motion.button
            className="nav-button prev"
            onClick={onPrev}
            disabled={isFirst}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="button-icon" />
            <span>Anterior</span>
          </motion.button>

          <div className="section-info">
            <span>{sectionNumber} de {totalSections}</span>
            <div className="final-indicator">¡Sección Final!</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default AIToolsSection
