import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Zap, Heart, Code, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import './TemucoLaunchSection.css'

const TemucoLaunchSection = () => {
  const [activeCarouselSlide, setActiveCarouselSlide] = useState(0)
  const videoRef = useRef(null)

  // Videos de la trayectoria profesional
  const storiesCami = [
    {
      year: "2013",
      title: "¿Hace cuánto no vas al dentista?",
      emoji: "🗂️🧢🗣️",
      video: "/historiaJorgeyCami/captandoClientes.mp4"
    },
    {
      year: "2013",
      title: "Mi cartelito salvador",
      emoji: "📣🪧✨",
      video: "/historiaJorgeyCami/cartelito.mp4"
    },
    {
      year: "2013",
      title: "Y un día… llegó Jorge",
      emoji: "🌸💬🍽️",
      video: "/historiaJorgeyCami/primerEncuentro.mp4"
    },
    {
      year: "2017 - 2021",
      title: "De promotora a jefa de sucursal",
      emoji: "📞📋🧠💼",
      video: "/historiaJorgeyCami/jefaSucursal.mp4"
    },
    {
      year: "2016",
      title: "¿Y si pudiera estudiar informática?",
      emoji: "💡🧢💻👶",
      video: "/historiaJorgeyCami/decisionEstudio.mp4"
    },
    {
      year: "2018",
      title: "Noches de café, código y cariño",
      emoji: "☕👨‍👩‍👧‍👦💻🌙",
      video: "/historiaJorgeyCami/nochesDeEstudio.mp4"
    },
    {
      year: "2021",
      title: "Mi primera vez en el mundo tech real",
      emoji: "💼💻☕📚",
      video: "/historiaJorgeyCami/practicaEntityData.mp4"
    },
    {
      year: "2022",
      title: "Cuando Java me dio miedo",
      emoji: "📚🧠😰💻",
      video: "/historiaJorgeyCami/desafioJava.mp4"
    },
    {
      year: "2022",
      title: "Me grababa para explicarme lo que estaba aprendiendo",
      emoji: "🎥📱👩‍💻💬",
      video: "/historiaJorgeyCami/primerosVideos.mp4"
    },
    {
      year: "2022",
      title: "¡Guau! Tengo 10.000 seguidores",
      emoji: "📈🎤📚❤️",
      video: "/historiaJorgeyCami/seguidores10k.mp4"
    },
    {
      year: "2022",
      title: "Lavando loza, descubrí la Inteligencia Artificial",
      emoji: "🍽️🎧🤯🤖",
      video: "/historiaJorgeyCami/descubrimientoIA.mp4"
    },
    {
      year: "2023",
      title: "Mi primer GPT... y mis rrss explotaron",
      emoji: "🧠📱🤖🚀",
      video: "/historiaJorgeyCami/primerGPT.mp4"
    }
  ]

  const nextSlide = () => {
    setActiveCarouselSlide((prev) => (prev + 1) % storiesCami.length)
  }

  const prevSlide = () => {
    setActiveCarouselSlide((prev) => (prev === 0 ? storiesCami.length - 1 : prev - 1))
  }

  // Controlar autoplay del video y auto-repetición
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Reiniciar el video desde el principio
      video.currentTime = 0
      // Reproducir automáticamente
      video.play().catch(error => {
        console.log('Autoplay no permitido:', error)
      })

      // Hacer que el video se repita automáticamente
      const handleVideoEnd = () => {
        video.currentTime = 0
        video.play().catch(error => {
          console.log('Autoplay no permitido:', error)
        })
      }

      video.addEventListener('ended', handleVideoEnd)

      // Limpiar el event listener
      return () => {
        video.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [activeCarouselSlide])

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

      {/* MIS INICIOS - CON CARRUSEL */}
      <motion.div className="section-block" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title">No siempre fui tecnológica</h2>

          {/* Carrusel de Trayectoria Profesional con Videos */}
          <div className="temuco-carousel-container">
            {/* Video del carrusel */}
            <motion.div className="temuco-carousel-video-container">
              <motion.video
                ref={videoRef}
                key={activeCarouselSlide}
                src={storiesCami[activeCarouselSlide].video}
                className="temuco-carousel-video"
                controls
                muted
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              {/* Información del carrusel */}
              <motion.div
                className="temuco-carousel-info-overlay"
                key={`info-${activeCarouselSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="carousel-year">{storiesCami[activeCarouselSlide].year}</div>
                <h3>{storiesCami[activeCarouselSlide].title}</h3>
                <div className="carousel-emoji">{storiesCami[activeCarouselSlide].emoji}</div>
              </motion.div>
            </motion.div>

            {/* Controles del carrusel */}
            <div className="temuco-carousel-controls-simple">
              <motion.button
                className="carousel-control-btn prev"
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} />
              </motion.button>

              <span className="carousel-progress-text">
                {activeCarouselSlide + 1} / {storiesCami.length}
              </span>

              <motion.button
                className="carousel-control-btn next"
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* EL PUNTO DE QUIEBRE */}
      <motion.div className="section-block accent" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title">La decisión que cambió todo</h2>
          <div className="milestone-content">
            <motion.div className="milestone-item" whileHover={{ y: -8 }}>
              <div className="milestone-item-image">
                <img
                  src="https://subir-imagen.com/images/2025/09/08/imagef421f792d6833770.md.png"
                  alt="Decidí estudiar programación"
                />
              </div>
              <div className="milestone-item-icon">
                <Code size={32} />
              </div>
              <p>Decidí estudiar programación</p>
            </motion.div>
            <motion.div className="milestone-item" whileHover={{ y: -8 }}>
              <div className="milestone-item-image">
                <img
                  src="https://subir-imagen.com/images/2025/09/08/imagef421f792d6833770.md.png"
                  alt="Fue difícil, pero persistí"
                />
              </div>
              <div className="milestone-item-icon">
                <Zap size={32} />
              </div>
              <p>Fue difícil, pero persistí</p>
            </motion.div>
            <motion.div className="milestone-item" whileHover={{ y: -8 }}>
              <div className="milestone-item-image">
                <img
                  src="https://subir-imagen.com/images/2025/09/08/imagef421f792d6833770.md.png"
                  alt="Descubrí mi pasión"
                />
              </div>
              <div className="milestone-item-icon">
                <Heart size={32} />
              </div>
              <p>Descubrí mi pasión</p>
            </motion.div>
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

          <motion.div className="community-message" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p>
              Lo más importante que construí fue una <span className="highlight-text">comunidad</span> de personas apasionadas por aprender.
              <br />
              <br />
              Miles de personas que decidieron transformar sus historias a través de la tecnología.
              Gente que se atreve a explorar, a experimentar con herramientas de IA, y a creer que el futuro digital es para todos.
            </p>
          </motion.div>

          <motion.div className="achievements-image-centered" whileHover={{ scale: 1.05 }}>
            <img
              src="https://subir-imagen.com/images/2025/09/08/imagef421f792d6833770.md.png"
              alt="Camila - Lo que construí"
            />
          </motion.div>
          <div className="achievements-grid-3col">
            <motion.div className="achievement-card" whileHover={{ y: -5 }}>
              <div className="achievement-icon">🎓</div>
              <h3>Ingeniera en Informática</h3>
              <p>Con mención en Cyberseguridad</p>
            </motion.div>
            <motion.div className="achievement-card" whileHover={{ y: -5 }}>
              <div className="achievement-icon">🚀</div>
              <h3>CEO y Fundadora</h3>
              <p>de Informatik‑AI</p>
            </motion.div>
            <motion.div className="achievement-card" whileHover={{ y: -5 }}>
              <div className="achievement-icon">🤖</div>
              <h3>Posgrado en IA</h3>
              <p>Inteligencia Artificial Generativa</p>
            </motion.div>
            <motion.div className="achievement-card" whileHover={{ y: -5 }}>
              <div className="achievement-icon">📱</div>
              <h3>Creadora de Contenido</h3>
              <p>en Redes Sociales</p>
            </motion.div>
            <motion.div className="achievement-card" whileHover={{ y: -5 }}>
              <div className="achievement-icon">✅</div>
              <h3>Certificadora Acreditada</h3>
              <p>ChileValora en Ciberseguridad e IA</p>
            </motion.div>
            <motion.div className="achievement-card" whileHover={{ y: -5 }}>
              <div className="achievement-icon">🤝</div>
              <h3>Socia y Embajadora</h3>
              <p>Cámara Chilena de Inteligencia Artificial</p>
            </motion.div>
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

