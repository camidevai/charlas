import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Brain, Camera, Music, Video, ExternalLink } from 'lucide-react'
import './AIIntroSection.css'

const AIIntroSection = ({ onNext, onPrev, isFirst, isLast, sectionNumber, totalSections }) => {
  const [hoveredTool, setHoveredTool] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [hoveredCategory, setHoveredCategory] = useState(null)

  // Scroll hacia arriba cuando se monta el componente
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  // Descripciones de las herramientas de IA
  const toolDescriptions = {
    'ChatGPT': 'Asistente de IA conversacional para generar texto, responder preguntas y ayudar con tareas creativas. Ideal para escritura, programación y resolución de problemas.',
    'Deepseek': 'Modelo de IA avanzado especializado en razonamiento profundo y análisis complejo. Excelente para tareas que requieren pensamiento crítico y lógica.',
    'Gemini': 'IA multimodal de Google que combina texto, imágenes y código. Perfecta para análisis integral y tareas que requieren múltiples tipos de entrada.',
    'Perplexity': 'Motor de búsqueda potenciado por IA que proporciona respuestas precisas con fuentes verificadas. Ideal para investigación y obtención de información actualizada.',
    'Claude': 'Asistente de IA de Anthropic enfocado en conversaciones útiles, inofensivas y honestas. Excelente para análisis de texto y tareas de escritura profesional.',
    'MidJourney': 'Generador de imágenes de IA líder en calidad artística y creatividad. Perfecto para crear arte digital, ilustraciones y conceptos visuales únicos.',
    'Leonardo.AI': 'Plataforma de generación de imágenes con control preciso sobre estilos y elementos. Ideal para diseñadores y creadores de contenido visual.',
    'DALL·E': 'Generador de imágenes de OpenAI que crea arte a partir de descripciones de texto. Excelente para conceptos creativos y visualizaciones originales.',
    'Stable Diffusion': 'Modelo de código abierto para generación de imágenes con alta personalización. Perfecto para usuarios técnicos que buscan control total.',
    'Canva AI': 'Herramientas de IA integradas en Canva para diseño gráfico automatizado. Ideal para crear contenido visual profesional de forma rápida.',
    'Nano Banana': 'Plataforma especializada en generación de imágenes con estilos únicos y creativos. Perfecta para proyectos artísticos experimentales.',
    'ElevenLabs': 'Tecnología de clonación de voz y síntesis de habla más avanzada del mercado. Ideal para doblaje, podcasts y contenido de audio personalizado.',
    'Suno': 'Generador de música completa con IA, incluyendo letras y melodías. Perfecto para crear canciones originales en cualquier género musical.',
    'Fish Audio': 'Plataforma de IA para edición y mejora de audio con calidad profesional. Excelente para podcasters y creadores de contenido sonoro.',
    'Aiva': 'Compositor de IA especializado en música clásica y bandas sonoras cinematográficas. Ideal para proyectos que requieren música emocional y épica.',
    'Runway': 'Suite completa de herramientas de IA para edición de video profesional. Perfecta para efectos especiales, edición automática y post-producción.',
    'Pika Labs': 'Generador de videos cortos a partir de texto e imágenes. Ideal para crear contenido dinámico para redes sociales y marketing.',
    'Sora': 'Modelo de OpenAI para generar videos realistas de alta calidad a partir de texto. Revolucionario para la creación de contenido audiovisual.',
    'InVideo': 'Plataforma de creación de videos con IA para marketing y redes sociales. Perfecta para crear contenido promocional de forma rápida y profesional.',
    'Veo 3': 'Tecnología de Google para generación de videos con calidad cinematográfica. Excelente para proyectos que requieren realismo y alta definición.',
    'Kapwing AI': 'Editor de video online con herramientas de IA integradas. Ideal para creadores de contenido que buscan edición rápida y efectiva.'
  }

  // Funciones para manejar tooltips
  const handleMouseEnter = (toolName, event, category) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    })
    setHoveredCategory(category)
    setTimeout(() => {
      setHoveredTool(toolName)
    }, 150)
  }

  const handleMouseLeave = () => {
    setHoveredTool(null)
    setHoveredCategory(null)
  }

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
          <h1 className="ai-title">Herramientas de Inteligencia Artificial Populares</h1>
          <p className="ai-subtitle">
            Descubre las mejores herramientas de IA organizadas por categorías
          </p>
        </motion.div>

        {/* Herramientas de IA por categorías */}
        <motion.div className="ai-tools-showcase" variants={itemVariants}>

          {/* Categoría: Texto */}
          <motion.div className="ai-category" variants={itemVariants}>
            <div className="category-content">
              <div className="category-header">
                <Brain className="category-icon" />
                <h3>Texto</h3>
                <p>Generación y asistencia de texto</p>
              </div>
              <div className="tools-grid">
                <a
                  href="https://chat.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('ChatGPT', e, 'texto')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">ChatGPT</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://deepseek.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Deepseek', e, 'texto')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Deepseek</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://gemini.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Gemini', e, 'texto')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Gemini</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://www.perplexity.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Perplexity', e, 'texto')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Perplexity</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://claude.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Claude', e, 'texto')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Claude</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
              </div>
            </div>
            <div className="category-image">
              <img
                src="https://subir-imagen.com/images/2025/09/08/image438ac9e7b0ed04ea.md.png"
                alt="Cami - Herramientas de Texto IA"
                className="cami-image"
              />
            </div>
          </motion.div>

          {/* Categoría: Imagen */}
          <motion.div className="ai-category" variants={itemVariants}>
            <div className="category-content">
              <div className="category-header">
                <Camera className="category-icon" />
                <h3>Imagen</h3>
                <p>Generación y edición de imágenes</p>
              </div>
              <div className="tools-grid">
                <a
                  href="https://www.midjourney.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('MidJourney', e, 'imagen')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">MidJourney</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://leonardo.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Leonardo.AI', e, 'imagen')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Leonardo.AI</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://openai.com/dall-e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('DALL·E', e, 'imagen')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">DALL·E</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://stability.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Stable Diffusion', e, 'imagen')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Stable Diffusion</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://www.canva.com/ai-image-generator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Canva AI', e, 'imagen')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Canva AI</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://aistudio.google.com/prompts/new_chat?model=models%2Fgemini-2.5-flash-image&prompt=Generate%20an%20image%20of%20a%20banana%20wearing%20a%20costume."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Nano Banana', e, 'imagen')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Nano Banana</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
              </div>
            </div>
            <div className="category-image">
              <img
                src="https://subir-imagen.com/images/2025/09/08/image1932efdad44e4e14.md.png"
                alt="Cami - Herramientas de Imagen IA"
                className="cami-image"
              />
            </div>
          </motion.div>

          {/* Categoría: Audio */}
          <motion.div className="ai-category" variants={itemVariants}>
            <div className="category-content">
              <div className="category-header">
                <Music className="category-icon" />
                <h3>Audio</h3>
                <p>Voz, música y edición de sonido</p>
              </div>
              <div className="tools-grid">
                <a
                  href="https://elevenlabs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('ElevenLabs', e, 'audio')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">ElevenLabs</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://www.suno.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Suno', e, 'audio')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Suno</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://fish.audio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Fish Audio', e, 'audio')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Fish Audio</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://aiva.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Aiva', e, 'audio')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Aiva</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
              </div>
            </div>
            <div className="category-image">
              <img
                src="https://subir-imagen.com/images/2025/09/08/image9076f628a3281f3a.md.png"
                alt="Cami - Herramientas de Audio IA"
                className="cami-image"
              />
            </div>
          </motion.div>

          {/* Categoría: Video */}
          <motion.div className="ai-category" variants={itemVariants}>
            <div className="category-content">
              <div className="category-header">
                <Video className="category-icon" />
                <h3>Video</h3>
                <p>Edición, generación y animación</p>
              </div>
              <div className="tools-grid">
                <a
                  href="https://runwayml.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Runway', e, 'video')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Runway</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://pika.art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Pika Labs', e, 'video')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Pika Labs</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://openai.com/sora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Sora', e, 'video')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Sora</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://invideo.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('InVideo', e, 'video')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">InVideo</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://deepmind.google/technologies/gemini/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Veo 3', e, 'video')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Veo 3</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
                <a
                  href="https://www.kapwing.com/ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                  onMouseEnter={(e) => handleMouseEnter('Kapwing AI', e, 'video')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tool-content">
                    <div className="tool-name">Kapwing AI</div>
                    <ExternalLink className="external-icon" size={16} />
                  </div>
                </a>
              </div>
            </div>
            <div className="category-image">
              <img
                src="https://subir-imagen.com/images/2025/09/08/image3d3634e4f2b3c545.md.png"
                alt="Cami - Herramientas de Video IA"
                className="cami-image"
              />
            </div>
          </motion.div>

        </motion.div>

        {/* Tooltip */}
        {hoveredTool && (
          <motion.div
            className={`ai-tooltip category-${hoveredCategory}`}
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <div className="tooltip-content">
              <h4>{hoveredTool}</h4>
              <p>{toolDescriptions[hoveredTool]}</p>
            </div>
            <div className="tooltip-arrow"></div>
          </motion.div>
        )}

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
