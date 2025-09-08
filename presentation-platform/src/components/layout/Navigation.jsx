import { motion } from 'framer-motion'
import { Play, Pause, ChevronLeft, ChevronRight, Home } from 'lucide-react'
import './Navigation.css'

const Navigation = ({ 
  sections, 
  currentSection, 
  onSectionChange, 
  isPresenting, 
  onTogglePresenting 
}) => {
  return (
    <motion.nav 
      className={`navigation ${isPresenting ? 'presentation-mode' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        {/* Logo/Título */}
        <div className="nav-brand">
          <Home size={24} />
          <span>Mi Historia & IA</span>
        </div>

        {/* Indicador de progreso */}
        <div className="progress-container">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="progress-text">
            {currentSection + 1} / {sections.length}
          </span>
        </div>

        {/* Navegación por secciones */}
        {!isPresenting && (
          <div className="section-nav">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                className={`section-btn ${index === currentSection ? 'active' : ''}`}
                onClick={() => onSectionChange(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.title}
              </motion.button>
            ))}
          </div>
        )}

        {/* Controles de presentación */}
        <div className="presentation-controls">
          <motion.button
            className="control-btn prev"
            onClick={() => onSectionChange(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            className={`control-btn present ${isPresenting ? 'active' : ''}`}
            onClick={onTogglePresenting}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPresenting ? <Pause size={20} /> : <Play size={20} />}
            <span>{isPresenting ? 'Salir' : 'Presentar'}</span>
          </motion.button>

          <motion.button
            className="control-btn next"
            onClick={() => onSectionChange(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation
