import { motion } from 'framer-motion'
import './Navigation.css'

const Navigation = ({
  sections,
  currentSection,
  onSectionChange,
  isPresenting
}) => {
  return (
    <motion.nav 
      className={`navigation ${isPresenting ? 'presentation-mode' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">

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

      </div>
    </motion.nav>
  )
}

export default Navigation
