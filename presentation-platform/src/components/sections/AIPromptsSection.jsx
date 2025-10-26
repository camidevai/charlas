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
  const [showToolModal, setShowToolModal] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)

  // Scroll hacia arriba cuando se monta el componente
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  // Metodologías para cada tipo de contenido
  const methodologies = {
    text: {
      name: 'C.L.A.R.A',
      description: 'Contexto • Logro • Acciones • Redacción • Apariencia',
      components: [
        { letter: 'C', title: 'CONTEXTO', description: 'Define la situación de uso', emoji: '📝' },
        { letter: 'L', title: 'LOGRO', description: 'Especifica el resultado deseado', emoji: '🎯' },
        { letter: 'A', title: 'ACCIONES', description: 'Detalla los pasos a seguir', emoji: '⚡' },
        { letter: 'R', title: 'REDACCIÓN', description: 'Define el tono y estilo', emoji: '✍️' },
        { letter: 'A', title: 'APARIENCIA', description: 'Especifica el formato de salida', emoji: '📋' }
      ]
    },
    image: {
      name: 'V.I.S.U.A.L',
      description: 'Visual • Intención • Situación • Un estilo • Ajustes • Límites',
      components: [
        { letter: 'V', title: 'VISUAL PRINCIPAL', description: 'Qué debe verse al centro', emoji: '🎨' },
        { letter: 'I', title: 'INTENCIÓN', description: 'Para qué sirve la imagen', emoji: '💡' },
        { letter: 'S', title: 'SITUACIÓN', description: 'Dónde está y qué pasa', emoji: '🌍' },
        { letter: 'U', title: 'UN ESTILO', description: 'Estilo artístico deseado', emoji: '🎭' },
        { letter: 'A', title: 'AJUSTES', description: 'Formato y resolución', emoji: '⚙️' },
        { letter: 'L', title: 'LÍMITES', description: 'Qué NO debe aparecer', emoji: '🚫' }
      ]
    },
    video: {
      name: 'A.C.C.I.O.N',
      description: 'Audiencia • Contexto • Continuidad • Imagen • Output • Narración',
      components: [
        { letter: 'A', title: 'AUDIENCIA', description: 'Para quién y qué lograr', emoji: '👥' },
        { letter: 'C', title: 'CONTEXTO', description: 'Escena y personajes', emoji: '🎬' },
        { letter: 'C', title: 'CONTINUIDAD', description: 'Secuencia de planos', emoji: '📹' },
        { letter: 'I', title: 'IMAGEN', description: 'Ritmo, cámara y estética', emoji: '🎥' },
        { letter: 'O', title: 'OUTPUT', description: 'Aspectos técnicos', emoji: '⚙️' },
        { letter: 'N', title: 'NARRACIÓN', description: 'Voz en off o texto', emoji: '🎙️' }
      ]
    },
    audio: {
      name: 'A.U.D.I.O',
      description: 'Audiencia • Universo • Dirección • Instrucciones • Output',
      components: [
        { letter: 'A', title: 'AUDIENCIA', description: 'Para quién y para qué', emoji: '👥' },
        { letter: 'U', title: 'UNIVERSO SONORO', description: 'Ambiente y acompañamiento', emoji: '🎵' },
        { letter: 'D', title: 'DIRECCIÓN', description: 'Características de la voz', emoji: '🎤' },
        { letter: 'I', title: 'INSTRUCCIONES', description: 'Qué debe decir exactamente', emoji: '📝' },
        { letter: 'O', title: 'OUTPUT', description: 'Formato y duración', emoji: '⚙️' }
      ]
    }
  }

  const slides = [
    {
      id: 'text',
      icon: MessageSquare,
      title: 'Texto 📝',
      subtitle: 'Metodología C.L.A.R.A para prompts de texto efectivos',
      example: `[CONTEXTO] Quiero crear una historia épica de aventura en Minecraft donde el jugador debe rescatar a un dragón amigo de un castillo oscuro.

[LOGRO] La historia debe ser emocionante, con giros sorpresa, y que haga que el lector quiera jugar Minecraft para vivirla.

[ACCIONES] Estructura: 1) Introducción del dragón amigo, 2) El problema (castillo oscuro), 3) Pistas para encontrar el camino, 4) Batalla final épica, 5) Final sorpresa.

[REDACCIÓN] Tono: aventurero, emocionante, con emojis, como si fuera un amigo contando una historia increíble, sin palabras muy difíciles.

[APARIENCIA] Formato: historia en párrafos cortos, máximo 300 palabras, con emojis de Minecraft (⛏️ 🐉 🏰), fácil de leer en el celular.`,
      template: 'Fórmula: C.L.A.R.A (Contexto • Logro • Acciones • Redacción • Apariencia)',
      color: '#4F46E5'
    },
    {
      id: 'image',
      icon: Palette,
      title: 'Imagen 🎨',
      subtitle: 'Metodología V.I.S.U.A.L para imágenes precisas',
      example: `[VISUAL PRINCIPAL] Un Pokémon nuevo y único que es la fusión de Pikachu (amarillo con rayo) + Charizard (fuego y alas), con ojos brillantes y expresión amigable.

[INTENCIÓN] Imagen para mi canal de YouTube de Pokémon, debe verse épica pero amigable, que haga que otros niños quieran verla.

[SITUACIÓN] El Pokémon está en una isla flotante con nubes, fondo con montañas moradas y cielo naranja al atardecer, primer plano en el Pokémon.

[UN ESTILO] Estilo anime tipo Pokémon oficial, colores vibrantes y brillantes, iluminación mágica, ambiente fantástico y emocionante.

[AJUSTES] Formato: PNG con fondo transparente, resolución 1920x1080px, relación 16:9, sin texto sobre la imagen.

[LÍMITES] NO incluir: Pokémon reales existentes sin modificar, fondos aburridos, colores oscuros, elementos violentos.`,
      template: 'Fórmula: V.I.S.U.A.L (Visual • Intención • Situación • Un estilo • Ajustes • Límites)',
      color: '#EC4899'
    },
    {
      id: 'video',
      icon: Film,
      title: 'Video 🎬',
      subtitle: 'Metodología A.C.C.I.O.N para videos cinematográficos',
      example: `[AUDIENCIA] Video corto de 45 segundos para YouTube Shorts dirigido a niños de 10-14 años que juegan Minecraft. Objetivo: mostrar un tutorial épico de construcción.

[CONTEXTO] Un niño en su habitación jugando Minecraft, construyendo un castillo gigante. Pantalla del juego en primer plano, luz de la pantalla iluminando su cara emocionada.

[CONTINUIDAD] Escena 1 (0-10s): Plano rápido del terreno vacío. Escena 2 (10-35s): Construcción acelerada del castillo (bloques cayendo, paredes subiendo). Escena 3 (35-45s): Castillo terminado, el niño sonríe a cámara.

[IMAGEN] Cámara rápida y dinámica, transiciones con efectos de Minecraft (bloques), colores vibrantes, ritmo emocionante, efectos de zoom en partes importantes.

[OUTPUT] Formato vertical 9:16, duración exacta 45s, subtítulos grandes con emojis (⛏️ 🏰), sin música (solo sonidos de Minecraft).

[NARRACIÓN] Voz entusiasta de niño: "¡Mira cómo construyo este castillo ÉPICO en 45 segundos! ¿Tú puedes hacerlo más rápido?"`,
      template: 'Fórmula: A.C.C.I.O.N (Audiencia • Contexto • Continuidad • Imagen • Output • Narración)',
      color: '#10B981'
    },
    {
      id: 'audio',
      icon: Music,
      title: 'Audio 🎵',
      subtitle: 'Metodología A.U.D.I.O para composición musical',
      example: `[AUDIENCIA] Intro de canal de YouTube gaming para niños de 10-14 años que ven videos de Roblox. Duración: 10 segundos. Debe ser épica y emocionante.

[UNIVERSO SONORO] Música de fondo: ritmo de videojuego épico (tipo Roblox), con efectos de sonido (beeps, explosiones suaves, monedas), volumen de música al 70%, energía alta.

[DIRECCIÓN DE VOZ] Voz de niño entusiasta, tono emocionado y amigable, velocidad rápida pero clara, mucha energía, como si estuviera gritando de emoción.

[INSTRUCCIONES] Texto exacto: "¡HOLA GAMERS! Bienvenidos a mi canal. Hoy vamos a jugar Roblox y será ÉPICO. ¡Dale like y suscríbete!"

[OUTPUT TÉCNICO] Archivo .mp3, duración exacta 10 segundos, bitrate 192kbps, limpio, sin ruidos de fondo, listo para YouTube.`,
      template: 'Fórmula: A.U.D.I.O (Audiencia • Universo • Dirección • Instrucciones • Output)',
      color: '#F59E0B'
    }
  ]

  // Preguntas guiadas para cada tipo de prompt - Metodologías específicas
  const guidedQuestions = {
    text: [
      {
        label: "C",
        question: "¿En qué situación usarás este texto?",
        hint: "Define dónde, cuándo y para quién",
        example: "Historia de aventura en Minecraft",
        placeholder: "Ej: Historia de aventura en Minecraft"
      },
      {
        label: "L",
        question: "¿Qué resultado quieres lograr?",
        hint: "Qué debe sentir o entender la audiencia",
        example: "Que quieran jugar Minecraft y vivan la aventura",
        placeholder: "Ej: Que quieran jugar Minecraft y vivan la aventura"
      },
      {
        label: "A",
        question: "¿Qué estructura debe tener?",
        hint: "Pasos o secciones principales",
        example: "Dragón amigo → Castillo oscuro → Batalla épica → Final sorpresa",
        placeholder: "Ej: Dragón amigo → Castillo oscuro → Batalla épica"
      },
      {
        label: "R",
        question: "¿Qué tono prefieres?",
        hint: "Cómo debe sonar el texto",
        example: "Aventurero y emocionante",
        placeholder: "Ej: Aventurero, emocionante, divertido",
        options: ["Aventurero", "Emocionante", "Divertido", "Misterioso", "Épico", "Cómico"],
        isMultiSelect: true
      },
      {
        label: "A",
        question: "¿En qué formato lo necesitas?",
        hint: "Cómo debe verse el resultado final",
        example: "Párrafos cortos con emojis de Minecraft",
        placeholder: "Ej: Párrafos cortos, con emojis, fácil de leer",
        options: ["Párrafos", "Lista", "Guion", "Con emojis", "Tabla"],
        isMultiSelect: true
      }
    ],
    image: [
      {
        label: "V",
        question: "¿Qué debe verse al centro?",
        hint: "El elemento principal de la imagen",
        example: "Pokémon fusión: Pikachu + Charizard",
        placeholder: "Ej: Pokémon fusión: Pikachu + Charizard"
      },
      {
        label: "I",
        question: "¿Para qué sirve esta imagen?",
        hint: "Su propósito o contexto de uso",
        example: "Portada para mi canal de YouTube de Pokémon",
        placeholder: "Ej: Portada para mi canal de YouTube de Pokémon"
      },
      {
        label: "S",
        question: "¿Dónde está y qué pasa?",
        hint: "Ubicación, ambiente y contexto",
        example: "Isla flotante con nubes, atardecer morado y naranja",
        placeholder: "Ej: Isla flotante con nubes, atardecer morado"
      },
      {
        label: "U",
        question: "¿Qué estilo visual?",
        hint: "Tipo de arte o técnica",
        example: "Estilo anime tipo Pokémon oficial",
        placeholder: "Ej: Estilo anime tipo Pokémon, colores vibrantes"
      },
      {
        label: "A",
        question: "¿Qué formato técnico?",
        hint: "Resolución, tipo de archivo, tamaño",
        example: "PNG transparente, 1920x1080px, relación 16:9",
        placeholder: "Ej: PNG transparente, 1920x1080px, 16:9"
      },
      {
        label: "L",
        question: "¿Qué NO debe aparecer?",
        hint: "Elementos a evitar o prohibir",
        example: "Sin Pokémon reales sin modificar, sin colores oscuros",
        placeholder: "Ej: Sin Pokémon reales, sin colores oscuros"
      }
    ],
    video: [
      {
        label: "A",
        question: "¿Para quién y qué quieres lograr?",
        hint: "Audiencia objetivo y propósito del video",
        example: "YouTube Shorts, 45s, niños 10-14 años, tutorial Minecraft",
        placeholder: "Ej: YouTube Shorts, 45s, niños 10-14 años"
      },
      {
        label: "C",
        question: "¿Dónde pasa y quién aparece?",
        hint: "Ubicación, personajes y ambiente",
        example: "Niño en habitación construyendo castillo en Minecraft",
        placeholder: "Ej: Niño en habitación construyendo castillo"
      },
      {
        label: "C",
        question: "¿Cuál es la secuencia de planos?",
        hint: "Cómo se desarrolla la acción paso a paso",
        example: "Terreno vacío → Construcción acelerada → Castillo terminado",
        placeholder: "Ej: Terreno vacío → Construcción → Castillo terminado"
      },
      {
        label: "I",
        question: "¿Qué ritmo y estética?",
        hint: "Movimiento de cámara, estilo visual, colores",
        example: "Cámara rápida y dinámica, efectos de bloques, colores vibrantes",
        placeholder: "Ej: Cámara rápida, efectos de bloques, colores vibrantes"
      },
      {
        label: "O",
        question: "¿Qué formato técnico?",
        hint: "Resolución, duración, subtítulos",
        example: "9:16 vertical, 45s, subtítulos con emojis ⛏️ 🏰",
        placeholder: "Ej: 9:16 vertical, 45s, subtítulos con emojis"
      },
      {
        label: "N",
        question: "¿Voz en off o texto?",
        hint: "Narración, diálogo o elementos visuales",
        example: "Voz de niño: '¡Mira este castillo ÉPICO en 45 segundos!'",
        placeholder: "Ej: Voz de niño: '¡Mira este castillo ÉPICO!'"
      }
    ],
    audio: [
      {
        label: "A",
        question: "¿Para quién y para qué?",
        hint: "Audiencia y propósito del audio",
        example: "Intro de canal gaming Roblox, niños 10-14 años",
        placeholder: "Ej: Intro de canal gaming Roblox, niños 10-14 años"
      },
      {
        label: "U",
        question: "¿Qué ambiente sonoro?",
        hint: "Música, efectos, ruidos de fondo",
        example: "Música épica tipo Roblox + efectos (beeps, monedas)",
        placeholder: "Ej: Música épica tipo Roblox + efectos de sonido"
      },
      {
        label: "D",
        question: "¿Cómo debe sonar la voz?",
        hint: "Género, edad, tono, energía",
        example: "Voz de niño entusiasta, emocionado, mucha energía",
        placeholder: "Ej: Voz de niño entusiasta, emocionado"
      },
      {
        label: "I",
        question: "¿Qué debe decir exactamente?",
        hint: "Texto o guion del audio",
        example: "¡HOLA GAMERS! Bienvenidos a mi canal. ¡Hoy Roblox será ÉPICO!",
        placeholder: "Ej: ¡HOLA GAMERS! Bienvenidos a mi canal..."
      },
      {
        label: "O",
        question: "¿Qué formato técnico?",
        hint: "Tipo de archivo, duración, calidad",
        example: "MP3, 10 segundos, 192kbps, listo para YouTube",
        placeholder: "Ej: MP3, 10 segundos, 192kbps"
      }
    ]
  }

  // Metodologías para mostrar en el modal
  const methodologyNames = {
    text: "C.L.A.R.A",
    image: "V.I.S.U.A.L",
    video: "A.C.C.I.O.N",
    audio: "A.U.D.I.O"
  }

  const methodologyDescriptions = {
    text: "Contexto • Logro • Acciones • Redacción • Apariencia",
    image: "Visual • Intención • Situación • Un estilo • Ajustes • Límites",
    video: "Audiencia • Contexto • Continuidad • Imagen • Output • Narración",
    audio: "Audiencia • Universo • Dirección • Instrucciones • Output"
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

      // Instrucciones específicas según el tipo de prompt con metodologías
      const optimizationInstructions = {
        text: `Optimiza este prompt de texto siguiendo la metodología C.L.A.R.A:
        - CONTEXTO: Define la situación de uso
        - LOGRO: Especifica el resultado deseado
        - ACCIONES: Detalla los pasos a seguir
        - REDACCIÓN: Define el tono y estilo
        - APARIENCIA: Especifica el formato de salida
        Crea un prompt profesional y detallado que maximice la calidad del resultado.`,

        image: `Optimiza este prompt de imagen siguiendo la metodología V.I.S.U.A.L:
        - VISUAL PRINCIPAL: Describe qué debe verse al centro
        - INTENCIÓN: Define el propósito de la imagen
        - SITUACIÓN: Describe la escena y el contexto
        - UN ESTILO: Especifica el estilo artístico
        - AJUSTES TÉCNICOS: Define formato y resolución
        - LÍMITES: Especifica qué NO debe aparecer
        Crea un prompt detallado con términos técnicos de fotografía/arte.`,

        video: `Optimiza este prompt de video siguiendo la metodología A.C.C.I.O.N:
        - AUDIENCIA: Define para quién y qué lograr
        - CONTEXTO: Describe la escena y personajes
        - CONTINUIDAD: Detalla la secuencia de planos
        - IMAGEN: Especifica ritmo, cámara y estética
        - OUTPUT: Define aspectos técnicos y entrega
        - NARRACIÓN: Especifica voz en off o texto visual
        Crea un prompt cinematográfico y profesional.`,

        audio: `Optimiza este prompt de audio siguiendo la metodología A.U.D.I.O:
        - AUDIENCIA: Define para quién y para qué
        - UNIVERSO SONORO: Describe ambiente y acompañamiento
        - DIRECCIÓN DE VOZ: Especifica características de la voz
        - INSTRUCCIONES: Define exactamente qué debe decir
        - OUTPUT TÉCNICO: Especifica formato y duración
        Crea un prompt detallado con especificaciones técnicas de audio.`
      }

      const systemPrompt = `Eres un experto en optimización de prompts para IA generativa. Tu tarea es tomar las respuestas del usuario y crear un prompt profesional y efectivo.

${optimizationInstructions[currentSlideId]}

Contexto del usuario:
${userContext}

Crea un prompt optimizado, profesional y específico que maximice la calidad del resultado. El prompt debe ser claro, detallado y seguir las mejores prácticas para ${currentSlideId === 'text' ? 'texto' : currentSlideId === 'image' ? 'imágenes' : currentSlideId === 'video' ? 'videos' : 'audio'}.

Responde SOLO con el prompt optimizado, sin explicaciones adicionales.`

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("La clave de API de Gemini no está configurada en las variables de entorno.");
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
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

  // Función para abrir herramienta en modal
  const openToolModal = (tool) => {
    setSelectedTool(tool)
    setShowToolModal(true)
  }

  // Función para cerrar modal de herramienta
  const closeToolModal = () => {
    setShowToolModal(false)
    setSelectedTool(null)
  }

  // Datos de herramientas
  const aiTools = [
    {
      id: 'gemini',
      name: 'Google Gemini',
      logo: '✨',
      url: 'https://gemini.google.com',
      description: 'Gemini es el modelo de IA más avanzado de Google para texto, imágenes y más',
      color: '#4F46E5'
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      logo: '💬',
      url: 'https://chatgpt.com',
      description: 'ChatGPT es un modelo de lenguaje conversacional de OpenAI',
      color: '#10a37f'
    },
    {
      id: 'suno',
      name: 'Suno',
      logo: '🎵',
      url: 'https://suno.com/',
      description: 'Suno es un modelo de IA para crear música original',
      color: '#FF6B6B'
    },
    {
      id: 'apob',
      name: 'Apob',
      logo: '🎨',
      url: 'https://apob.ai',
      description: 'Apob es una herramienta de IA para crear imágenes',
      color: '#9D4EDD'
    }
  ]

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
                    {/* Metodología Visual */}
                    <div className="methodology-section">
                      <div className="methodology-header">
                        <h3>Metodología {methodologies[currentSlideData.id].name}</h3>
                        <p className="methodology-subtitle">{methodologies[currentSlideData.id].description}</p>
                      </div>

                      <div className="methodology-grid">
                        {methodologies[currentSlideData.id].components.map((component, index) => (
                          <motion.div
                            key={index}
                            className="methodology-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                          >
                            <div className="card-letter">{component.letter}</div>
                            <div className="card-emoji">{component.emoji}</div>
                            <h4>{component.title}</h4>
                            <p>{component.description}</p>
                          </motion.div>
                        ))}
                      </div>
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

                      {/* Botones de herramientas IA */}
                   
                    </div>
                    
                  </div>
                        <p className="ai-tools-title "></p>
                        <div className="ai-tools-buttons">
                          {aiTools.map((tool) => (
                            <button
                              key={tool.id}
                              onClick={() => openToolModal(tool)}
                              className={`ai-tool-btn ${tool.id}`}
                            >
                              <span className="tool-logo">{tool.logo}</span>
                              <span className="tool-name">{tool.name}</span>
                            </button>
                          ))}
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
              <div className="modal-title-section">
                <h3>Crear tu prompt con metodología {methodologyNames[slides[currentSlide].id]}</h3>
                <p className="methodology-description">{methodologyDescriptions[slides[currentSlide].id]}</p>
              </div>
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
                      <div className="question-header">
                        {currentQ.label && <span className="methodology-label">{currentQ.label}</span>}
                        <h4>{currentQ.question}</h4>
                      </div>
                      {currentQ.hint && <p className="question-hint">{currentQ.hint}</p>}
                      <p className="question-example">💡 {currentQ.example}</p>

                      {currentQ.isMultiSelect && currentQ.options ? (
                        <div className="options-container">
                          <div className="options-grid">
                            {currentQ.options.map((option) => (
                              <button
                                key={option}
                                className={`option-btn ${
                                  userAnswers[currentQuestion]?.includes(option) ? 'selected' : ''
                                }`}
                                onClick={() => {
                                  const current = userAnswers[currentQuestion] || '';
                                  if (current.includes(option)) {
                                    const updated = current
                                      .split(', ')
                                      .filter(item => item !== option)
                                      .join(', ');
                                    handleAnswerChange(currentQuestion, updated);
                                  } else {
                                    const updated = current ? `${current}, ${option}` : option;
                                    handleAnswerChange(currentQuestion, updated);
                                  }
                                }}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          <p className="options-note">O escribe tu propia respuesta:</p>
                        </div>
                      ) : null}

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
                    <p>Optimizado con Google Gemini 2.5 flash preview siguiendo la metodología {methodologyNames[slides[currentSlide].id]}</p>
                  </div>

                  {/* Mostrar respuestas etiquetadas por metodología */}
                  <div className="methodology-breakdown">
                    {(() => {
                      const currentSlideId = slides[currentSlide].id;
                      const questions = guidedQuestions[currentSlideId];
                      const emojis = {
                        text: { C: '📝', L: '🎯', A: '⚡', R: '✍️' },
                        image: { V: '🎨', I: '💡', S: '🌍', U: '🎭', A: '⚙️', L: '🚫' },
                        video: { A: '👥', C: '🎬', I: '📹', O: '⚙️', N: '🎙️' },
                        audio: { A: '👥', U: '🎵', D: '🎤', I: '📝', O: '⚙️' }
                      };

                      return (
                        <div className="breakdown-items">
                          {questions.map((q, index) => (
                            userAnswers[index] && (
                              <div key={index} className="breakdown-item">
                                <span className="breakdown-emoji">
                                  {emojis[currentSlideId]?.[q.label] || '•'}
                                </span>
                                <div className="breakdown-content">
                                  <strong>{q.label}: {q.question.split(' - ')[1] || q.question}</strong>
                                  <p>{userAnswers[index]}</p>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="result-content">
                    <div className="optimized-prompt-header">
                      <h5>Prompt optimizado por Gemini:</h5>
                    </div>
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

      {/* Modal de herramientas IA */}
      {showToolModal && selectedTool && (
        <motion.div
          className="tool-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeToolModal}
        >
          <motion.div
            className="tool-modal"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tool-modal-header">
              <div className="tool-modal-title">
                <span className="tool-modal-logo">{selectedTool.logo}</span>
                <div>
                  <h3>{selectedTool.name}</h3>
                  <p>{selectedTool.description}</p>
                </div>
              </div>
              <button className="tool-modal-close" onClick={closeToolModal}>
                <X size={24} />
              </button>
            </div>

            <div className="tool-modal-content">
              <div className="tool-content-info">
                <div className="tool-info-card">
                  <h4>¿Qué es {selectedTool.name}?</h4>
                  <p>{selectedTool.description}</p>
                  <div className="tool-features">
                    <p>✨ Herramienta de IA avanzada</p>
                    <p>🚀 Fácil de usar</p>
                    <p>💡 Resultados profesionales</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tool-modal-footer">
              <p>Abre {selectedTool.name} en una nueva pestaña para comenzar</p>
              <a
                href={selectedTool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-modal-link"
              >
                Abrir {selectedTool.name} →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default AIPromptsSection
