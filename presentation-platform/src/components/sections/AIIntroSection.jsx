import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Brain, Zap, Lightbulb } from 'lucide-react'
import './AIIntroSection.css'

const AIIntroSection = ({ onNext, onPrev, isFirst, isLast, sectionNumber, totalSections }) => {
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
      className="ai-intro-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="ai-content">
        {/* Header */}
        <motion.div className="ai-header" variants={itemVariants}>
          <Brain className="section-icon" />
          <h1 className="ai-title">Introducción a la Inteligencia Artificial</h1>
          <p className="ai-subtitle">
            Descubriendo el fascinante mundo de la IA y su impacto en nuestras vidas
          </p>
        </motion.div>

        {/* Placeholder para contenido */}
        <motion.div className="ai-placeholder" variants={itemVariants}>
          <div className="placeholder-content">
            <div className="placeholder-icon">
              <Lightbulb size={48} />
            </div>
            <h3>Contenido de IA Pendiente</h3>
            <p>
              Esta sección estará dedicada a introducir los conceptos fundamentales 
              de la Inteligencia Artificial de manera accesible y comprensible.
            </p>
            <div className="placeholder-features">
              <div className="feature">
                <Brain size={20} />
                <span>¿Qué es la Inteligencia Artificial?</span>
              </div>
              <div className="feature">
                <Zap size={20} />
                <span>Tipos de IA y sus aplicaciones</span>
              </div>
              <div className="feature">
                <Lightbulb size={20} />
                <span>Impacto en la vida cotidiana</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navegación */}
        <motion.div className="ai-navigation" variants={itemVariants}>
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
          </div>

          <motion.button
            className="nav-button next"
            onClick={onNext}
            disabled={isLast}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Siguiente</span>
            <ChevronRight className="button-icon" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default AIIntroSection
