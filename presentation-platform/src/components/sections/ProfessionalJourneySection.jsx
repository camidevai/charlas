import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Paintbrush, Building2, Banknote, UserCheck, Crown, HeartHandshake, Code, ChevronLeft, ChevronRight } from 'lucide-react'

const ProfessionalJourneySection = ({ variants }) => {
  const ref = useRef(null)
  const [activeStage, setActiveStage] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [120, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9])

  // Funciones de navegación
  const nextStage = () => {
    setActiveStage(prev => (prev + 1) % professionalStages.length)
  }

  const prevStage = () => {
    setActiveStage(prev => prev === 0 ? professionalStages.length - 1 : prev - 1)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  }

const professionalStages = [
  {
    id: 0,
    Icon: Building2,
    title: "Clínica Dental - Promotora",
    image: "https://subir-imagen.com/images/2025/09/08/image135c799ea9b59d8f.md.png",
    delay: 1.0
  },
  {
    id: 1,
    Icon: Building2,
    title: "Clínica Dental - Promotora",
    image: "https://subir-imagen.com/images/2025/09/07/image2c0b457ce12251a9.md.png",
    delay: 1.0
  },
  {
    id: 2,
    Icon: Banknote,
    title: "El amor de mi vida",
    image: "https://subir-imagen.com/images/2025/09/08/imagef421f792d6833770.md.png",
    delay: 1.2
  },
  {
    id: 3,
    Icon: UserCheck,
    title: "Asistente Administrativa",
    image: "https://subir-imagen.com/images/2025/09/08/imagee7a87037624dd322.md.png",
    delay: 1.4
  },
  {
    id: 4,
    Icon: Crown,
    title: "Jefa de Sucursal",
    image: "https://subir-imagen.com/images/2025/09/08/imagecff9839b549ba026.md.png",
    delay: 1.6
  }
];


  return (
    <motion.div
      ref={ref}
      className="professional-journey-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ y, opacity, scale }}
    >
      <div className="professional-carousel-container">
        {/* Título de la sección */}
        <motion.div
          className="carousel-title"
          variants={containerVariants}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Mi Trayectoria Profesional</h2>
          <p>Un recorrido por las experiencias que me formaron</p>
        </motion.div>

  

        {/* Imagen principal del carrusel */}
        <motion.div
          className="carousel-image-container"
          variants={imageVariants}
        >
          <motion.img
            key={activeStage}
            src={professionalStages[activeStage].image}
            alt={professionalStages[activeStage].title}
            className="carousel-image"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Información de la etapa actual */}
          <motion.div
            className="carousel-info-overlay"
            key={`info-${activeStage}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
          
            <h3>{professionalStages[activeStage].title}</h3>
          </motion.div>
        </motion.div>

        {/* Indicadores de progreso */}
        <motion.div
          className="carousel-indicators"
          variants={containerVariants}
        >
          {professionalStages.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${activeStage === index ? 'active' : ''}`}
              onClick={() => setActiveStage(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Información de progreso */}
        <motion.div
          className="carousel-progress"
          variants={containerVariants}
        >
          <span className="progress-text">
            {activeStage + 1} de {professionalStages.length}
          </span>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((activeStage + 1) / professionalStages.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProfessionalJourneySection
