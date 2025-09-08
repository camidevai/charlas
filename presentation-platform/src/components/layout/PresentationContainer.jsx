import { motion } from 'framer-motion'
import './PresentationContainer.css'

const PresentationContainer = ({ children, isPresenting }) => {
  return (
    <motion.main 
      className={`presentation-container ${isPresenting ? 'fullscreen' : ''}`}
      animate={{
        paddingTop: isPresenting ? 0 : '80px',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="presentation-content">
        {children}
      </div>
      
      {/* Indicador de modo presentación */}
      {isPresenting && (
        <motion.div 
          className="presentation-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="indicator-content">
            <div className="indicator-dot"></div>
            <span>Modo Presentación</span>
            <div className="indicator-hint">
              Usa ← → o Espacio para navegar • ESC para salir
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  )
}

export default PresentationContainer
