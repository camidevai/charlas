import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquare, Palette, Film, Music, CheckCircle, ArrowRight, X, HelpCircle, Copy, Loader } from 'lucide-react'
import './AIPromptsSection.css'

const AIPromptsSection = ({ onNext, onPrev, isFirst, isLast, sectionNumber, totalSections }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showGuidedModal, setShowGuidedModal] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [apiError, setApiError] = useState('')

  // Scroll hacia arriba cuando se monta el componente
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

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
Formato: lista de ingredientes + pasos simples. 
Tono: amigable.`,
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
        'Di qué NO quieres ver (evitar)',
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

  // Preguntas guiadas para cada tipo de prompt
  const guidedQuestions = {
    text: [
      { question: "¿Qué necesito?", example: "Una receta", placeholder: "Ej: Una receta, un artículo, un código..." },
      { question: "¿Quién debe actuar?", example: "Un chef experto", placeholder: "Ej: Un chef experto, un escritor profesional..." },
      { question: "¿Qué necesito exactamente?", example: "Una receta fácil", placeholder: "Ej: Una receta fácil, un artículo de 500 palabras..." },
      { question: "¿Cómo quiero que me lo entregue?", example: "Lista de ingredientes + pasos simples", placeholder: "Ej: Lista numerada, formato tabla, párrafos..." },
      { question: "¿Tengo ejemplos específicos?", example: "Como pasta carbonara", placeholder: "Ej: Como pasta carbonara, similar a..." },
      { question: "¿Qué pasos debo seguir?", example: "Paso a paso detallado", placeholder: "Ej: Paso a paso, resumen ejecutivo..." },
      { question: "¿En qué tono lo quiero?", example: "Amigable", placeholder: "Ej: Amigable, profesional, casual..." }
    ],
    image: [
      { question: "¿Qué quiero ver?", example: "Una persona cocinando", placeholder: "Ej: Una persona cocinando, un paisaje..." },
      { question: "¿Dónde está la escena?", example: "En una cocina moderna", placeholder: "Ej: En una cocina moderna, al aire libre..." },
      { question: "¿Qué estilo visual?", example: "Fotografía natural", placeholder: "Ej: Fotografía natural, ilustración, arte digital..." },
      { question: "¿Qué colores y ambiente?", example: "Colores cálidos, ambiente acogedor", placeholder: "Ej: Colores cálidos, tonos fríos..." },
      { question: "¿Qué tipo de iluminación?", example: "Luz suave de ventana", placeholder: "Ej: Luz suave, iluminación dramática..." },
      { question: "¿Qué NO quiero ver?", example: "Imágenes borrosas, texto", placeholder: "Ej: Imágenes borrosas, elementos no deseados..." }
    ],
    video: [
      { question: "¿Qué tipo de toma?", example: "Cámara fija", placeholder: "Ej: Cámara fija, plano cercano, gran angular..." },
      { question: "¿Cuál es la acción principal?", example: "Preparando café", placeholder: "Ej: Preparando café, caminando..." },
      { question: "¿Dónde sucede?", example: "En casa, cocina", placeholder: "Ej: En casa, al aire libre, oficina..." },
      { question: "¿Cuánto debe durar?", example: "10 segundos", placeholder: "Ej: 10 segundos, 1 minuto..." },
      { question: "¿Qué movimiento de cámara?", example: "Movimiento suave", placeholder: "Ej: Movimiento suave, estático, zoom..." },
      { question: "¿Qué estilo visual?", example: "Ambiente matutino, luz natural", placeholder: "Ej: Cinematográfico, documental..." }
    ],
    audio: [
      { question: "¿Qué estilo musical?", example: "Música relajante", placeholder: "Ej: Música relajante, energética, clásica..." },
      { question: "¿Qué ritmo?", example: "Ritmo lento", placeholder: "Ej: Ritmo lento, rápido, moderado..." },
      { question: "¿Qué instrumentos?", example: "Piano suave", placeholder: "Ej: Piano suave, guitarra, orquesta..." },
      { question: "¿Para qué propósito?", example: "Para estudiar", placeholder: "Ej: Para estudiar, hacer ejercicio..." },
      { question: "¿Cuánto debe durar?", example: "2 minutos", placeholder: "Ej: 2 minutos, 30 segundos..." },
      { question: "¿Debe repetirse?", example: "Que se pueda repetir", placeholder: "Ej: Loop continuo, una sola vez..." }
    ]
  }

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

  // Funciones para el modal guiado
  const openGuidedModal = () => {
    setShowGuidedModal(true)
    setCurrentQuestion(0)
    setUserAnswers({})
  }

  const closeGuidedModal = () => {
    setShowGuidedModal(false)
    setCurrentQuestion(0)
    setUserAnswers({})
    setShowResult(false)
    setOptimizedPrompt('')
    setApiError('')
    setIsGenerating(false)
  }

  const nextQuestion = () => {
    const currentSlideId = slides[currentSlide].id
    const questions = guidedQuestions[currentSlideId]
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  // Función para llamar a la API de Google Gemini
  const optimizePromptWithGemini = async () => {
    setIsGenerating(true)
    setApiError('')

    try {
      const currentSlideId = slides[currentSlide].id
      const questions = guidedQuestions[currentSlideId]
      const answers = Object.values(userAnswers).filter(answer => answer && answer.trim())

      if (answers.length === 0) {
        setOptimizedPrompt(slides[currentSlide].example)
        setShowResult(true)
        setIsGenerating(false)
        return
      }

      // Crear el contexto para la API basado en las respuestas del usuario
      const userContext = questions.map((q, index) =>
        `${q.question}: ${userAnswers[index] || 'No especificado'}`
      ).join('\n')

      // Instrucciones específicas según el tipo de prompt
      const optimizationInstructions = {
        text: `Optimiza este prompt de texto siguiendo las mejores prácticas de Google:
        - Define un rol claro y específico
        - Especifica el formato de salida deseado
        - Incluye ejemplos si es relevante
        - Define el tono y estilo
        - Sé específico y detallado
        - Usa estructura clara con pasos numerados si es necesario`,

        image: `Optimiza este prompt de imagen siguiendo las mejores prácticas:
        - Describe la escena principal claramente
        - Especifica el estilo visual y técnica
        - Incluye detalles de iluminación y colores
        - Define la composición y encuadre
        - Agrega elementos negativos si es necesario
        - Usa términos técnicos de fotografía/arte cuando sea apropiado`,

        video: `Optimiza este prompt de video siguiendo las mejores prácticas:
        - Define el tipo de toma y movimiento de cámara
        - Especifica la duración y ritmo
        - Describe la acción principal y secundaria
        - Incluye detalles de iluminación y ambiente
        - Define el estilo visual y mood
        - Especifica transiciones si es relevante`,

        audio: `Optimiza este prompt de audio siguiendo las mejores prácticas:
        - Define el género y estilo musical claramente
        - Especifica instrumentación y arreglos
        - Incluye tempo y estructura
        - Define el mood y atmósfera
        - Especifica duración y formato
        - Incluye detalles técnicos de producción si es relevante`
      }

      const systemPrompt = `Eres un experto en optimización de prompts para IA generativa. Tu tarea es tomar las respuestas del usuario y crear un prompt profesional y efectivo.

${optimizationInstructions[currentSlideId]}

Contexto del usuario:
${userContext}

Crea un prompt optimizado, profesional y específico que maximice la calidad del resultado. El prompt debe ser claro, detallado y seguir las mejores prácticas para ${currentSlideId === 'text' ? 'texto' : currentSlideId === 'image' ? 'imágenes' : currentSlideId === 'video' ? 'videos' : 'audio'}.

Responde SOLO con el prompt optimizado, sin explicaciones adicionales.`

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=AIzaSyDuiHLpGGwz05ROwhsa26YN317bt6biZWE`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
        
      }

      const data = await response.json()

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const optimized = data.candidates[0].content.parts[0].text.trim()
        setOptimizedPrompt(optimized)
        setShowResult(true)
      } else {
        throw new Error('Respuesta inesperada de la API')
      }

    } catch (error) {
      console.error('Error optimizando prompt:', error)
      setApiError('Error al optimizar el prompt. Por favor, intenta nuevamente.')
      // Fallback al prompt básico
      const answers = Object.values(userAnswers).filter(answer => answer && answer.trim())
      setOptimizedPrompt(answers.length > 0 ? answers.join(', ') : slides[currentSlide].example)
      setShowResult(true)
    } finally {
      setIsGenerating(false)
    }
  }

  // Función para copiar al portapapeles
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      // Podrías agregar un toast notification aquí
    } catch (error) {
      console.error('Error copiando al portapapeles:', error)
    }
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

                      {/* Botón de preguntas guiadas */}
                      <button
                        className="guided-questions-btn"
                        onClick={openGuidedModal}
                      >
                        <HelpCircle size={20} />
                        <span>Crear mi prompt paso a paso</span>
                      </button>
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

      {/* Modal de preguntas guiadas */}
      {showGuidedModal && (
        <motion.div
          className="guided-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeGuidedModal}
        >
          <motion.div
            className="guided-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Crear tu prompt paso a paso</h3>
              <button className="close-btn" onClick={closeGuidedModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {(() => {
                const currentSlideId = slides[currentSlide].id
                const questions = guidedQuestions[currentSlideId]
                const currentQ = questions[currentQuestion]

                return (
                  <div className="question-container">
                    <div className="question-progress">
                      <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="question-content">
                      <h4>{currentQ.question}</h4>
                      <p className="question-example">Ejemplo: {currentQ.example}</p>

                      <input
                        type="text"
                        placeholder={currentQ.placeholder}
                        value={userAnswers[currentQuestion] || ''}
                        onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                        className="answer-input"
                      />
                    </div>

                    <div className="question-navigation">
                      <button
                        className="nav-btn secondary"
                        onClick={prevQuestion}
                        disabled={currentQuestion === 0}
                      >
                        Anterior
                      </button>

                      {currentQuestion < questions.length - 1 ? (
                        <button
                          className="nav-btn primary"
                          onClick={nextQuestion}
                        >
                          Siguiente
                        </button>
                      ) : (
                        <button
                          className="nav-btn primary"
                          onClick={optimizePromptWithGemini}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader className="spinner" size={16} />
                              Optimizando...
                            </>
                          ) : (
                            'Ver mi prompt optimizado'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })()}

              {/* Resultado optimizado */}
              {showResult && (
                <motion.div
                  className="result-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="result-header">
                    <h4>🎉 Tu prompt optimizado está listo</h4>
                    <p>Optimizado con Google Gemini 1.5 Flash siguiendo las mejores prácticas</p>
                  </div>

                  <div className="result-content">
                    <div className="optimized-prompt">
                      <pre>{optimizedPrompt}</pre>
                    </div>

                    <div className="result-actions">
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(optimizedPrompt)}
                      >
                        <Copy size={16} />
                        Copiar prompt
                      </button>

                      <button
                        className="close-result-btn"
                        onClick={closeGuidedModal}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>

                  {apiError && (
                    <div className="api-error">
                      <p>{apiError}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default AIPromptsSection
