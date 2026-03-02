import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Zap, Heart, Code, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import QRCode from 'qrcode'
import './TemucoLaunchSection.css'

const TemucoLaunchSection = () => {
  const [activeCarouselSlide, setActiveCarouselSlide] = useState(0)
  const [showCchiaModal, setShowCchiaModal] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const videoRef = useRef(null)
  const milestoneVideoRefs = useRef([null, null, null])
  const qrCanvasRef = useRef(null)

  // Generar código QR cuando el componente se monta
  useEffect(() => {
    if (qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, 'https://lanzamiento-temuco.netlify.app/', {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.95,
        margin: 1,
        width: 300,
        color: {
          dark: '#4FC3F7',
          light: '#ffffff'
        }
      }, (error) => {
        if (error) console.error('Error generando QR:', error)
      })
    }
  }, [])

  // Reproducir automáticamente y repetir videos de "La decisión que cambió todo"
  useEffect(() => {
    const videos = milestoneVideoRefs.current

    videos.forEach((video) => {
      if (video) {
        // Configurar autoplay y loop
        video.autoplay = true
        video.loop = true
        video.muted = true

        // Intentar reproducir el video
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Autoplay bloqueado:', error)
          })
        }

        // Agregar listener para repetir cuando termine
        const handleEnded = () => {
          video.currentTime = 0
          video.play().catch((error) => {
            console.log('Error al reproducir:', error)
          })
        }

        video.addEventListener('ended', handleEnded)

        // Cleanup
        return () => {
          video.removeEventListener('ended', handleEnded)
        }
      }
    })
  }, [])

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

  // Controlar auto-repetición de videos de milestone
  useEffect(() => {
    const videos = milestoneVideoRefs.current

    const handleVideoEnd = (video) => {
      return () => {
        video.currentTime = 0
        video.play().catch(error => {
          console.log('Autoplay no permitido:', error)
        })
      }
    }

    videos.forEach((video) => {
      if (video) {
        const handler = handleVideoEnd(video)
        video.addEventListener('ended', handler)

        return () => {
          video.removeEventListener('ended', handler)
        }
      }
    })
  }, [])

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
              <div className="milestone-item-image milestone-video-container">
                <video
                  ref={(el) => (milestoneVideoRefs.current[0] = el)}
                  src="/historiaJorgeyCami/decisionEstudio.mp4"
                  alt="Decidí estudiar programación"
                  controls
                  muted
                  autoPlay
                  loop
                  className="milestone-video"
                />
              </div>
              <div className="milestone-item-icon">
                <Code size={32} />
              </div>
              <p>Decidí estudiar programación</p>
            </motion.div>
            <motion.div className="milestone-item" whileHover={{ y: -8 }}>
              <div className="milestone-item-image milestone-video-container">
                <video
                  ref={(el) => (milestoneVideoRefs.current[1] = el)}
                  src="/historiaJorgeyCami/nochesDeEstudio.mp4"
                  alt="Fue difícil, pero persistí"
                  controls
                  muted
                  autoPlay
                  loop
                  className="milestone-video"
                />
              </div>
              <div className="milestone-item-icon">
                <Zap size={32} />
              </div>
              <p>Fue difícil, pero persistí</p>
            </motion.div>
            <motion.div className="milestone-item" whileHover={{ y: -8 }}>
              <div className="milestone-item-image milestone-video-container">
                <video
                  ref={(el) => (milestoneVideoRefs.current[2] = el)}
                  src="/historiaJorgeyCami/primerGPT.mp4"
                  alt="Descubrí mi pasión"
                  controls
                  muted
                  autoPlay
                  loop
                  className="milestone-video"
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

          <motion.div className="community-visual" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="community-title">Lo más importante que construí</h3>

            <div className="community-image-container">
              <img
                src="/camidevaiComunidad1.png"
                alt="Comunidad de personas"
                className="community-image"
              />
            </div>

            <div className="keywords-grid-3col">
              <motion.div className="keyword-tag" whileHover={{ scale: 1.1 }}>
                <span className="keyword-icon">👥</span>
                <span className="keyword-text">Personas que buscan usar tecnología</span>
              </motion.div>
              <motion.div className="keyword-tag" whileHover={{ scale: 1.1 }}>
                <span className="keyword-icon">🤖</span>
                <span className="keyword-text">Interesadas en Inteligencia Artificial</span>
              </motion.div>
              <motion.div className="keyword-tag" whileHover={{ scale: 1.1 }}>
                <span className="keyword-icon">💡</span>
                <span className="keyword-text">Apasionadas por aprender</span>
              </motion.div>
              <motion.div className="keyword-tag" whileHover={{ scale: 1.1 }}>
                <span className="keyword-icon">🌟</span>
                <span className="keyword-text">Que buscan un futuro mejor</span>
              </motion.div>
              <motion.div className="keyword-tag" whileHover={{ scale: 1.1 }}>
                <span className="keyword-icon">🎉</span>
                <span className="keyword-text">Que quieren entretenerse</span>
              </motion.div>
              <motion.div className="keyword-tag" whileHover={{ scale: 1.1 }}>
                <span className="keyword-icon">🚀</span>
                <span className="keyword-text">Transformando sus historias</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* MIS LOGROS */}
      <motion.div className="section-block" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title">Me convertí en</h2>

          <motion.div className="achievements-image-centered" whileHover={{ scale: 1.05 }}>
            <img
              src="/camidevai.png"
              alt="Camila - Mis logros"
              className="community-image"
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
              <h3>CMO y Fundadora</h3>
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
            <motion.div
              className="achievement-card achievement-card-clickable"
              whileHover={{ y: -5 }}
              onClick={() => setShowCchiaModal(true)}
            >
              <div className="achievement-icon">🤝</div>
              <h3>Socia y Embajadora</h3>
              <p>Cámara Chilena de Inteligencia Artificial</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* MIS HERRAMIENTAS FAVORITAS */}
      <motion.div className="section-block" variants={itemVariants}>
        <div className="section-content">
          <h2 className="section-title">Mis Herramientas Favoritas</h2>
          <div className="tools-grid">
            <motion.a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">🤖</div>
              <h3>Chat GPT</h3>
            </motion.a>
            <motion.a href="https://www.grok.com" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">🧠</div>
              <h3>grok</h3>
            </motion.a>
            <motion.a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">✨</div>
              <h3>Gemini</h3>
            </motion.a>
            <motion.a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">🔍</div>
              <h3>Perplexity</h3>
            </motion.a>
            <motion.a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">💻</div>
              <h3>Claude Code</h3>
            </motion.a>
            <motion.a href="https://www.augmentcode.com" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">⚡</div>
              <h3>Augment Code</h3>
            </motion.a>
            <motion.a href="https://www.apob.ai" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">🎯</div>
              <h3>Apob</h3>
            </motion.a>
            <motion.a href="https://invideo.io" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">🎬</div>
              <h3>InVideo</h3>
            </motion.a>
            <motion.a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">📓</div>
              <h3>NotebookLM</h3>
            </motion.a>
            <motion.a href="https://www.comet.com" target="_blank" rel="noopener noreferrer" className="tool-card" whileHover={{ y: -8, scale: 1.05 }}>
              <div className="tool-icon">🌟</div>
              <h3>Comet</h3>
            </motion.a>
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

      {/* MODAL CCHIA */}
      {showCchiaModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCchiaModal(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowCchiaModal(false)}
            >
              ✕
            </button>

            <div className="modal-header">
              <img
                src="/cchia/cchia.png"
                alt="CCHIA Logo"
                className="cchia-logo"
              />
            </div>

            <div className="modal-body">
              <h2>Cámara Chilena de Inteligencia Artificial</h2>

              <div className="cchia-description">
                <p>
                  La CCHIA es una <span className="highlight">asociación gremial</span> compuesta por organizaciones y personas naturales.
                </p>

                <p>
                  Buscamos ser un <span className="highlight">articulador entre el talento, el capital y la infraestructura</span>, fomentando la adopción de inteligencia artificial de forma <span className="highlight">ética y responsable</span>.
                </p>

                <p className="mission-text">
                  Nuestro objetivo es impulsar el desarrollo y la adopción responsable de la IA en Chile, creando un ecosistema colaborativo donde empresas, profesionales y emprendedores puedan crecer juntos.
                </p>
              </div>

              <motion.a
                href="https://www.cchia.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="cchia-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conoce más sobre CCHIA
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* SECCIÓN DE CIERRE CON CÓDIGO QR */}
      <motion.div className="closing-qr-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="qr-content">
          <motion.h2 className="qr-title" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
            Conoce la historia de camidevai
          </motion.h2>

          <motion.div className="qr-container" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <canvas ref={qrCanvasRef} />
          </motion.div>

          <motion.p className="qr-subtitle" initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
            https://lanzamiento-temuco.netlify.app/
          </motion.p>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default TemucoLaunchSection

