import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Lightbulb, Search, GraduationCap, Briefcase, Coffee, Users, TrendingUp, Brain, Bot, ChevronLeft, ChevronRight } from 'lucide-react'

const TechJourneySection = ({ variants }) => {
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
    setActiveStage(prev => (prev + 1) % techStages.length)
  }

  const prevStage = () => {
    setActiveStage(prev => prev === 0 ? techStages.length - 1 : prev - 1)
  }

  const techStages = [
    { 
      id: 0,
      Icon: Lightbulb, 
      title: "La Sorpresa", 
      image: "https://subir-imagen.com/images/2025/09/08/imagede453d75ac459ad2.md.png",
      delay: 0.8 
    },
    { 
      id: 1,
      Icon: Search, 
      title: "Por Cuatro Años", 
      image: "https://subir-imagen.com/images/2025/09/08/image350458540eb9d1d7.md.png",
      delay: 1.0 
    },
    { 
      id: 2,
      Icon: GraduationCap, 
      title: "Práctica Profesional LIFERAY", 
      image: "https://subir-imagen.com/images/2025/09/08/image444f6072fe566d10.md.png",
      delay: 1.2 
    },
    { 
      id: 3,
      Icon: Briefcase, 
      title: "Dilema Estudiando JAVA", 
      image: "https://subir-imagen.com/images/2025/09/08/imageec19a7c2340beaf8.md.png",
      delay: 1.4 
    },
    { 
      id: 4,
      Icon: Coffee, 
      title: "Me grabe para recordar", 
      image: "https://subir-imagen.com/images/2025/09/08/image1b0e30e776692826.md.png",
      delay: 1.6 
    },
    { 
      id: 5,
      Icon: Users, 
      title: "Crear Contenido en RRSS", 
      image: "https://subir-imagen.com/images/2025/09/08/image8fd7f03a0a1a65b3.md.png",
      delay: 1.8 
    },
  
    { 
      id: 6,
      Icon: Brain, 
      title: "Inteligencia Artificial", 
      image: "https://subir-imagen.com/images/2025/09/08/image3e7081f0e0df6555.md.png",
      delay: 2.2 
    },
    { 
      id: 7,
      Icon: Bot, 
      title: "Creación de mi Primer Agente GPT", 
      image: "https://subir-imagen.com/images/2025/09/08/image99eddfc6b4e9f7f0.md.png",
      delay: 2.4 
    }
  ];

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <motion.div 
      ref={ref}
      className="tech-journey-section" 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ y, opacity, scale }}
    >
      <div className="tech-carousel-container">
        {/* Título de la sección */}
        <motion.div
          className="carousel-title"
          variants={containerVariants}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Mi Camino hacia la Tecnología</h2>
          <p>El viaje que me llevó a descubrir mi pasión por el desarrollo y la IA</p>
        </motion.div>



        {/* Imagen principal del carrusel */}
        <motion.div
          className="carousel-image-container"
          variants={imageVariants}
        >
          <motion.img
            key={activeStage}
            src={techStages[activeStage].image}
            alt={techStages[activeStage].title}
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
           
            <h3>{techStages[activeStage].title}</h3>
          </motion.div>
        </motion.div>

        {/* Indicadores de progreso */}
        <motion.div 
          className="carousel-indicators"
          variants={containerVariants}
        >
          {techStages.map((_, index) => (
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
            {activeStage + 1} de {techStages.length}
          </span>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((activeStage + 1) / techStages.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TechJourneySection
