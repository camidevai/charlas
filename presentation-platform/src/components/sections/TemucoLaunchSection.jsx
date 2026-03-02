import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Zap, Heart, Code, Users, Star } from 'lucide-react'
import './TemucoLaunchSection.css'

const TemucoLaunchSection = () => {
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
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <motion.section
      className="temuco-launch-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* HERO SECTION */}
      <motion.div className="hero-section" variants={itemVariants}>
        <div className="hero-content">
          <h1 className="hero-title">
            No nací siendo ingeniera.
            <br />
            Mi primer trabajo fue como promotora en Temuco.
          </h1>
          <p className="hero-subtitle">Y hoy trabajo con Inteligencia Artificial.</p>
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </motion.div>

      {/* MIS INICIOS */}
      <motion.div className="section-block" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title">No siempre fui tecnológica</h2>
          <div className="story-grid">
            <div className="story-card">
              <div className="story-icon">📍</div>
              <p>Primer trabajo como promotora en Temuco</p>
            </div>
            <div className="story-card">
              <div className="story-icon">🚫</div>
              <p>Sin cercanía con la tecnología</p>
            </div>
            <div className="story-card">
              <div className="story-icon">❓</div>
              <p>Muchas dudas sobre mi futuro</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* EL PUNTO DE QUIEBRE */}
      <motion.div className="section-block accent" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title">La decisión que cambió todo</h2>
          <div className="milestone-content">
            <div className="milestone-item">
              <Code size={40} />
              <p>Decidí estudiar programación</p>
            </div>
            <div className="milestone-item">
              <Zap size={40} />
              <p>Fue difícil, pero persistí</p>
            </div>
            <div className="milestone-item">
              <Heart size={40} />
              <p>Descubrí mi pasión</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* DESCUBRÍ LA IA */}
      <motion.div className="section-block" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title">Mi hiperfoco</h2>
          <div className="highlight-box">
            <p className="highlight-text">
              Descubrí la Inteligencia Artificial y me apasionó.
              <br />
              Empecé a crear contenido y compartir lo que aprendía.
            </p>
          </div>
        </div>
      </motion.div>

      {/* HOY */}
      <motion.div className="section-block" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title">Lo que construí</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <Star size={32} />
              <h3>Ingeniera en Informática</h3>
            </div>
            <div className="achievement-card">
              <Code size={32} />
              <h3>Fundadora de empresa de desarrollo</h3>
            </div>
            <div className="achievement-card">
              <Users size={32} />
              <h3>+450.000 personas aprenden conmigo</h3>
            </div>
            <div className="achievement-card">
              <Zap size={32} />
              <h3>Trabajo con IA generativa</h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MENSAJE A FUTURO DIGITAL */}
      <motion.div className="section-block gradient-bg" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title large">La tecnología cambia destinos</h2>
          <p className="inspirational-text">
            Si yo pude transformar mi historia, cualquiera que decida aprender puede hacerlo.
          </p>
        </div>
      </motion.div>

      {/* CIERRE */}
      <motion.div className="closing-section" variants={itemVariants}>
        <h2 className="closing-title">
          El futuro digital no es para los expertos.
          <br />
          Es para los que se atreven.
        </h2>
      </motion.div>
    </motion.section>
  )
}

export default TemucoLaunchSection

