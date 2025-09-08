import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquare, Palette, Film, Music, CheckCircle, ArrowRight } from 'lucide-react'
import './AIPromptsSection.css'

const AIPromptsSection = ({ onNext, onPrev, isFirst, isLast, sectionNumber, totalSections }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 'text',
      icon: MessageSquare,
      title: 'Texto 📝',
      subtitle: 'Estrategias para prompts de texto efectivos',
      strategies: [
        'Define quién debe actuar (rol)',
        'Explica qué necesitas exactamente',
        'Especifica el formato de respuesta',
        'Da ejemplos si es necesario',
        'Pide pasos claros y ordenados',
        'Menciona el tono deseado'
      ],
      example: `Actúa como un chef experto.
Ayúdame a crear una receta fácil de pasta para 4 personas.
Formato: lista de ingredientes + pasos simples. Tono: amigable.
Tiempo de cocción: máximo 30 minutos.`,
      template: 'Fórmula: rol + objetivo + formato + detalles',
      color: '#4F46E5'
    },
    {
      id: 'image',
      icon: Palette,
      title: 'Imagen 🎨',
      subtitle: 'Técnicas para generar imágenes precisas',
      strategies: [
        'Describe qué quieres ver',
        'Menciona el estilo visual',
        'Especifica colores y ambiente',
        'Di qué NO quieres (evitar)',
        'Incluye detalles de iluminación',
        'Prueba y ajusta el resultado'
      ],
      example: `Una persona feliz cocinando en una cocina moderna,
estilo fotografía natural, luz suave de ventana,
colores cálidos, ambiente acogedor,
evitar: imágenes borrosas, texto en la imagen.`,
      template: 'Fórmula: qué + dónde + cómo + evitar',
      color: '#EC4899'
    },
    {
      id: 'video',
      icon: Film,
      title: 'Video 🎬',
      subtitle: 'Directrices para videos cinematográficos',
      strategies: [
        'Define el tipo de toma (cerca, lejos)',
        'Describe la acción principal',
        'Especifica el ambiente/lugar',
        'Menciona duración deseada',
        'Indica movimiento de cámara',
        'Describe el estilo visual'
      ],
      example: `Video de una persona preparando café en casa,
cámara fija, movimiento suave, ambiente matutino,
luz natural, 10 segundos, enfoque en las manos.`,
      template: 'Fórmula: tipo de toma + acción + ambiente + duración',
      color: '#10B981'
    },
    {
      id: 'audio',
      icon: Music,
      title: 'Audio 🎵',
      subtitle: 'Composición musical y efectos sonoros',
      strategies: [
        'Define el estilo musical',
        'Especifica el ritmo (rápido/lento)',
        'Menciona instrumentos principales',
        'Indica la duración deseada',
        'Describe el ambiente/emoción',
        'Di si debe repetirse (loop)'
      ],
      example: `Música relajante para estudiar, ritmo lento,
piano suave + sonidos de naturaleza, 2 minutos, que se pueda repetir.`,
      template: 'Fórmula: estilo + ritmo + instrumentos + duración',
      color: '#F59E0B'
    }
  ]

  const summaryData = [
    {
      type: 'Texto 📝',
      strategies: 'Rol + contexto + formato',
      example: 'Actúa como chef experto...',
      tip: 'Sé específico con el rol'
    },
    {
      type: 'Imagen 🎨',
      strategies: 'Sujeto + estilo + técnica',
      example: 'Persona cocinando, luz natural...',
      tip: 'Describe lo que NO quieres'
    },
    {
      type: 'Video 🎬',
      strategies: 'Plano + acción + estética',
      example: 'Video preparando café, cámara fija...',
      tip: 'Define tipo de toma'
    },
    {
      type: 'Audio 🎵',
      strategies: 'Género + tempo + instrumentos',
      example: 'Música relajante, piano suave...',
      tip: 'Menciona duración deseada'
    }
  ]

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <motion.section 
      className="ai-prompts-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="prompts-content">
        {/* Header */}
        <motion.div className="prompts-header" variants={itemVariants}>
          <MessageSquare className="section-icon" />
          <h1 className="prompts-title">Cómo hablarle a las IAs generativas</h1>
          <p className="prompts-subtitle">
            Domina el arte de crear prompts efectivos para cada tipo de contenido
          </p>
        </motion.div>

        {/* Slide Navigation */}
        <motion.div className="slide-navigation" variants={itemVariants}>
          {slides.map((slide, index) => {
            const IconComponent = slide.icon
            return (
              <button
                key={index}
                className={`slide-nav-btn ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                style={{ '--accent-color': slide.color }}
              >
                <IconComponent size={20} />
                <span>{slide.title}</span>
              </button>
            )
          })}
          <button
            className={`slide-nav-btn ${currentSlide === 4 ? 'active' : ''}`}
            onClick={() => goToSlide(4)}
            style={{ '--accent-color': '#6366F1' }}
          >
            <CheckCircle size={20} />
            <span>Resumen</span>
          </button>
        </motion.div>

        {/* Slide Content */}
        <motion.div className="slide-container" variants={itemVariants}>
          {currentSlide < 4 ? (
            // Individual slides for each type
            (() => {
              const currentSlideData = slides[currentSlide]
              const IconComponent = currentSlideData.icon
              return (
                <div className="prompt-slide" style={{ '--slide-color': currentSlideData.color }}>
                  <div className="slide-header">
                    <IconComponent className="slide-icon" size={48} />
                    <div>
                      <h2>{currentSlideData.title}</h2>
                      <p>{currentSlideData.subtitle}</p>
                    </div>
                  </div>

                  <div className="slide-body">
                    <div className="strategies-section">
                      <h3>Estrategias clave</h3>
                      <ul className="strategies-list">
                        {currentSlideData.strategies.map((strategy, index) => (
                          <li key={index}>
                            <CheckCircle size={16} />
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="example-section">
                      <h3>Ejemplo de prompt</h3>
                      <div className="code-block">
                        <pre>{currentSlideData.example}</pre>
                      </div>
                      <div className="template-note">
                        <ArrowRight size={16} />
                        <span>{currentSlideData.template}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()
          ) : (
            // Summary table slide
            <div className="summary-slide">
              <div className="slide-header">
                <CheckCircle className="slide-icon" size={48} />
                <div>
                  <h2>Resumen comparativo</h2>
                  <p>Guía rápida para cada tipo de IA generativa</p>
                </div>
              </div>

              <div className="summary-table">
                <div className="table-header">
                  <div>Tipo</div>
                  <div>Estrategias clave</div>
                  <div>Prompt ejemplo</div>
                  <div>Tip rápido</div>
                </div>
                {summaryData.map((row, index) => (
                  <div key={index} className="table-row">
                    <div className="type-cell">{row.type}</div>
                    <div className="strategies-cell">{row.strategies}</div>
                    <div className="example-cell">{row.example}</div>
                    <div className="tip-cell">{row.tip}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Slide Controls */}
        <motion.div className="slide-controls" variants={itemVariants}>
          <button className="slide-btn prev" onClick={prevSlide}>
            <ChevronLeft size={20} />
          </button>
          <span className="slide-indicator">
            {currentSlide + 1} de 5
          </span>
          <button className="slide-btn next" onClick={nextSlide}>
            <ChevronRight size={20} />
          </button>
        </motion.div>

        {/* Footer Note */}
        <motion.div className="footer-note" variants={itemVariants}>
          <p>
            Buenas prácticas inspiradas en guías de diseño de prompts de la industria 
            (p.ej., Google/Vertex AI, Adobe Firefly) y comunidades de expertos.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div className="section-navigation" variants={itemVariants}>
          <motion.button
            className="nav-button"
            onClick={onPrev}
            disabled={isFirst}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} />
            Anterior
          </motion.button>

          <span className="section-indicator">
            {sectionNumber} de {totalSections}
          </span>

          <motion.button
            className="nav-button"
            onClick={onNext}
            disabled={isLast}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Siguiente
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default AIPromptsSection
