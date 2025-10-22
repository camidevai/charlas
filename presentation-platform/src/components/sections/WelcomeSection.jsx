import { motion } from 'framer-motion'
import { ChevronRight, Sparkles, Heart, Brain, User, Briefcase, GraduationCap, Baby, Users, MapPin } from 'lucide-react'
import './WelcomeSection.css'

const WelcomeSection = ({ onNext, isLast, sectionNumber, totalSections }) => {
  // Función para manejar el clic del botón "Comenzar esta Experiencia"
  const handleStartExperience = () => {
    // Hacer scroll suave hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    // Pequeño delay para que el scroll se complete antes de cambiar de sección
    setTimeout(() => {
      onNext()
    }, 300)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <motion.section
      className="welcome-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="welcome-content">
        {/* Imagen y presentación personal */}
        <motion.div className="speaker-introduction" variants={itemVariants}>
          {/* Sección de imágenes */}
        

          {/* Texto animado */}
          <motion.div
            className="animated-text-container"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h2
              className="animated-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Mi mapa en la era de la Inteligencia Artificial
            </motion.h2>
          </motion.div>

          {/* Información del speaker */}
          <div className="speaker-info">
            <h1 className="speaker-name">Camila</h1>
            <div className="speaker-credentials">
              <div className="credential">
                <GraduationCap className="credential-icon" />
                <span>Ingeniera en Informática, con mensión en Cyberseguridad</span>
              </div>
              <div className="credential">
                <Briefcase className="credential-icon" />
                <span>CEO y  fundadora de Informatik‑AI</span>
              </div>
              <div className="credential">
                <Brain className="credential-icon" />
                <span>Posgrado en Inteligencia Artificial Generativa</span>
              </div>
              <div className="credential">
                <User className="credential-icon" />
                <span>Creadora de contenido en Redes Sociales</span>
              </div>
            </div>
          </div>



  <div className="images-section">
            {/* Información personal */}
            <motion.div
              className="personal-info-card"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="personal-info-title">Sobre Camila</h3>
              <div className="personal-info-items">
                <motion.div
                  className="personal-info-item"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(244, 143, 177, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Baby className="personal-info-icon" />
                  <span>Madre de dos hijos</span>
                </motion.div>

                <motion.div
                  className="personal-info-item"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(244, 143, 177, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart className="personal-info-icon" />
                  <span>Esposa</span>
                </motion.div>

                <motion.div
                  className="personal-info-item"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(79, 195, 247, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="personal-info-icon" />
                  <span>Temuco, Novena Región, Chile</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="character-image-container"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{
                scale: 1.1,
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
            >
              <img
                src="https://subir-imagen.com/images/2025/09/07/image850ecb2ad5dda06e.md.png"
                alt="Personaje saludando - Representando el lado humano de la ingeniería"
                className="character-image"
              />
            </motion.div>
          </div>
          

          {/* Iconos interactivos */}
          <motion.div
            className="interactive-icons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div
              className="icon-item technology"
              whileHover={{
                scale: 1.2,
                rotate: 10,
                backgroundColor: "rgba(79, 195, 247, 0.2)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="interactive-icon" />
              <span className="icon-label">TECNOLOGÍA</span>
            </motion.div>

            <motion.div
              className="icon-item past"
              whileHover={{
                scale: 1.2,
                rotate: -10,
                backgroundColor: "rgba(244, 143, 177, 0.2)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="interactive-icon" />
              <span className="icon-label">PASADO</span>
            </motion.div>

            <motion.div
              className="icon-item future"
              whileHover={{
                scale: 1.2,
                rotate: 15,
                backgroundColor: "rgba(79, 195, 247, 0.2)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Brain className="interactive-icon" />
              <span className="icon-label">FUTURO</span>
            </motion.div>

            <motion.div
              className="icon-item ai"
              whileHover={{
                scale: 1.2,
                rotate: -15,
                backgroundColor: "rgba(244, 143, 177, 0.2)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="interactive-icon" />
              <span className="icon-label">IA</span>
            </motion.div>
          </motion.div>
        </motion.div>





       

        {/* Botón de inicio */}
        <motion.div className="welcome-actions" variants={itemVariants}>
          <motion.button
            className="start-button"
            onClick={handleStartExperience}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLast}
          >
            <span>Comenzar esta Experiencia</span>
            <ChevronRight className="button-icon" />
          </motion.button>

          <div className="section-indicator">
            <span>{sectionNumber} de {totalSections}</span>
            <div className="interactive-note">Presentación Interactiva</div>
          </div>
        </motion.div>
      </div>

      {/* Elementos decorativos animados */}
      <div className="decorative-elements">
        <motion.div 
          className="floating-element element-1"
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="floating-element element-2"
          animate={{ 
            y: [20, -20, 20],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="floating-element element-3"
          animate={{ 
            y: [-15, 15, -15],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.section>
  )
}

export default WelcomeSection
