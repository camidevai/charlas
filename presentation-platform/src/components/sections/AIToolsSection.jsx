import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import './AIToolsSection.css'

const AIToolsSection = ({ onPrev, isFirst, sectionNumber, totalSections }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [formData, setFormData] = useState({
    from_name: '',
    brand_name: '',
    reply_to: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle') // 'idle', 'loading', 'success', 'error'
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  // Datos de la línea de tiempo
  const timelineMilestones = [
    {
      year: "~300 a.C.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/256px-Aristotle_Altemps_Inv8575.jpg",
      title: "Aristóteles",
      description: "Crea el silogismo, base del razonamiento lógico para la IA moderna",
      color: "#8B5CF6"
    },
    {
      year: "1637",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/256px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
      title: "René Descartes",
      description: "\"Discurso del Método\" - dividir problemas complejos en partes simples",
      color: "#7C3AED"
    },
    {
      year: "1843",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/256px-Ada_Lovelace_portrait.jpg",
      title: "Ada Lovelace",
      description: "Primer algoritmo para la Máquina Analítica de Babbage, primera programadora",
      color: "#6D28D9"
    },
    {
      year: "1936-1950",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/256px-Alan_Turing_Aged_16.jpg",
      title: "Alan Turing",
      description: "Máquina de Turing, Test de Turing, máquina Bombe para descifrar Enigma",
      color: "#5B21B6"
    },
    {
      year: "1956",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/John_McCarthy_Stanford.jpg/256px-John_McCarthy_Stanford.jpg",
      title: "Conferencia Dartmouth",
      description: "John McCarthy acuña el término \"Inteligencia Artificial\"",
      color: "#4C1D95"
    },
    {
      year: "hasta-1990",
      image: "https://i.pinimg.com/originals/20/a7/de/20a7deb9f571a103494b5451f49ec392.gif",
      title: "Invierno de la IA",
      description: "Período de estancamiento por falta de progreso y financiamiento",
      color: "#3730A3"
    },
    {
      year: "1997",
      image: "https://media.gettyimages.com/id/1240227320/es/foto/world-chess-champion-garry-kasparov-looks-at-the-chessboard-before-his-next-move-in-the-early.jpg?s=1024x1024&w=gi&k=20&c=rObRl1knE8f_4VO2h_3nc_WzMsUkG8L0n-lvSE8LpFI=",
      title: "IBM Deep Blue",
      description: "Derrota al campeón mundial de ajedrez Garry Kasparov",
      color: "#312E81"
    },
    {
      year: "2011",
      image: "https://i.makeagif.com/media/5-09-2023/7RWkcy.gif",
      title: "IBM Watson",
      description: "Gana en Jeopardy!, demuestra comprensión de lenguaje natural",
      color: "#1E1B4B"
    },
    {
      year: "~2010",
      image: "https://tse4.mm.bing.net/th/id/OIP.Jt7FgVwjOMpF9UpVPGvo6wHaE1?r=0&cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Redes Neuronales Modernas",
      description: "Deep learning potenciado por GPUs revive la IA moderna",
      color: "#4F46E5"
    },
    {
      year: "2016",
      image: "https://i.makeagif.com/media/5-09-2017/qNfoPW.gif",
      title: "Google DeepMind AlphaGo",
      description: "Derrota al campeón mundial de Go en juego de estrategia compleja",
      color: "#4338CA"
    },
    {
      year: "2017",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/256px-OpenAI_Logo.svg.png",
      title: "Transformers",
      description: "Paper \"Attention Is All You Need\" introduce arquitectura Transformer",
      color: "#3730A3"
    },
    {
      year: "2018-presente",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/256px-ChatGPT_logo.svg.png",
      title: "Revolución GPT & LLM",
      description: "GPT-3, GPT-4, GPT-5 habilitan la era de la IA generativa",
      color: "#312E81"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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



  const openModal = (milestone) => {
    setSelectedMilestone(milestone)
  }

  const closeModal = () => {
    setSelectedMilestone(null)
  }

  // Funciones del formulario de contacto
  const validateForm = () => {
    const newErrors = {}

    if (!formData.from_name.trim()) {
      newErrors.from_name = 'El nombre es requerido'
    }

    if (!formData.brand_name.trim()) {
      newErrors.brand_name = 'El nombre de la marca es requerido'
    }

    if (!formData.reply_to.trim()) {
      newErrors.reply_to = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reply_to)) {
      newErrors.reply_to = 'Por favor ingresa un email válido'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormStatus('loading')

    try {
      await emailjs.sendForm(
        'service_t0cvv27',
        'template_lh7gtfd',
        formRef.current
      )

      setFormStatus('success')
      setFormData({
        from_name: '',
        brand_name: '',
        reply_to: '',
        message: ''
      })

      // Resetear a idle después de 3 segundos
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)

    } catch (error) {
      console.error('Error sending email:', error)
      setFormStatus('error')

      // Resetear a idle después de 3 segundos
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }
  }

  // Cerrar modal con tecla Escape
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedMilestone) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevenir scroll del body
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedMilestone])

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
          <Clock className="section-icon" />
          <h1 className="tools-title">Historia de la Inteligencia Artificial</h1>
          <p className="tools-subtitle">
            Un viaje a través del tiempo: desde los fundamentos filosóficos hasta la revolución de los LLMs
          </p>
        </motion.div>

    

        {/* Vertical Timeline */}
        <motion.div className="vertical-timeline-container" variants={itemVariants}>
          <div className="vertical-timeline">
            <div className="timeline-line-vertical"></div>
            {timelineMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`milestone-item ${index % 2 === 0 ? 'left' : 'right'}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="timeline-dot" style={{ backgroundColor: milestone.color }}></div>
                <motion.div
                  className="milestone-card-vertical"
                  style={{ '--milestone-color': milestone.color }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openModal(milestone)}
                >
                  <div className="milestone-image">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div className="image-fallback" style={{ display: 'none' }}>
                      {milestone.title.charAt(0)}
                    </div>
                  </div>
                  <div className="milestone-content">
                    <div className="milestone-year">{milestone.year}</div>
                    <h3 className="milestone-title">{milestone.title}</h3>
                    <p className="milestone-description">{milestone.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de Contacto */}
        <motion.div className="contact-section" variants={itemVariants}>
          <div className="contact-header">
            <h3>¡Conectemos y Creemos Juntos!</h3>
            <p>
              ¿Te interesa colaborar en proyectos de IA o necesitas consultoría?
              Me encantaría conocer tu proyecto y explorar cómo podemos innovar juntos.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="from_name">Tu Nombre *</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleInputChange}
                  className={errors.from_name ? 'error' : ''}
                  placeholder="Ingresa tu nombre completo"
                />
                {errors.from_name && <span className="error-message">{errors.from_name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="brand_name">Nombre de la Marca *</label>
                <input
                  type="text"
                  id="brand_name"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleInputChange}
                  className={errors.brand_name ? 'error' : ''}
                  placeholder="Nombre de tu empresa o proyecto"
                />
                {errors.brand_name && <span className="error-message">{errors.brand_name}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reply_to">Tu Email *</label>
              <input
                type="email"
                id="reply_to"
                name="reply_to"
                value={formData.reply_to}
                onChange={handleInputChange}
                className={errors.reply_to ? 'error' : ''}
                placeholder="tu@email.com"
              />
              {errors.reply_to && <span className="error-message">{errors.reply_to}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje del Proyecto *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'error' : ''}
                placeholder="Cuéntame sobre tu proyecto, ideas o cómo podemos colaborar..."
                rows="4"
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className={`submit-btn ${formStatus}`}
              disabled={formStatus === 'loading'}
            >
              {formStatus === 'loading' && <Loader className="spinner" size={20} />}
              {formStatus === 'success' && <CheckCircle size={20} />}
              {formStatus === 'error' && <AlertCircle size={20} />}
              {formStatus === 'idle' && <Send size={20} />}

              <span>
                {formStatus === 'loading' && 'Enviando...'}
                {formStatus === 'success' && '¡Mensaje enviado exitosamente!'}
                {formStatus === 'error' && 'Error al enviar. Intenta nuevamente.'}
                {formStatus === 'idle' && 'Enviar Mensaje'}
              </span>
            </button>

            {formStatus === 'success' && (
              <div className="success-message">
                ¡Te contactaremos pronto para discutir tu proyecto!
              </div>
            )}
          </form>
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

      {/* Modal/Lightbox */}
      {selectedMilestone && (
        <motion.div
          className="milestone-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="milestone-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>

            <div className="modal-image-container">
              <img
                src={selectedMilestone.image}
                alt={selectedMilestone.title}
                className="modal-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="modal-image-fallback" style={{ display: 'none' }}>
                {selectedMilestone.title.charAt(0)}
              </div>
            </div>

            <div className="modal-info">
              <div className="modal-year" style={{ color: selectedMilestone.color }}>
                {selectedMilestone.year}
              </div>
              <h3 className="modal-title">{selectedMilestone.title}</h3>
              <p className="modal-description">{selectedMilestone.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default AIToolsSection
