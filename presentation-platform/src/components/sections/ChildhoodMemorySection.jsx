import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Baby, Users, GraduationCap, Monitor, Brush, Home, Sparkles } from 'lucide-react'

const ChildhoodMemorySection = ({ variants }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9])

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

  const memoryIcons = [
    { Icon: Baby, position: "top-left", tooltip: "Infancia", delay: 0.8 },
    { Icon: Users, position: "top-right", tooltip: "Hermanos", delay: 1.0 },
    { Icon: GraduationCap, position: "left", tooltip: "Universidad", delay: 1.2 },
    { Icon: Monitor, position: "right", tooltip: "PC", delay: 1.4 },
    { Icon: Brush, position: "bottom-left", tooltip: "Photoshop", delay: 1.6 },
    { Icon: Home, position: "bottom-right", tooltip: "Los Sims", delay: 1.8 },
    { Icon: Sparkles, position: "center-bottom", tooltip: "Destino", delay: 2.0 }
  ]

  return (
    <motion.div 
      ref={ref}
      className="childhood-memory-section" 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ y, opacity, scale }}
    >
      <div className="childhood-hero-container">
        <motion.div 
          className="childhood-hero-image"
          variants={imageVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="https://subir-imagen.com/images/2025/09/07/imageaacd83ea3060806a.md.png" 
            alt="Cami en su infancia - Los inicios de su historia con la tecnología"
            className="hero-image"
          />
        </motion.div>

        {memoryIcons.map(({ Icon, position, tooltip, delay }, index) => (
          <motion.div 
            key={index}
            className={`memory-icon ${position}`}
            variants={iconVariants}
            custom={delay}
            whileHover={{ 
              scale: 1.1, 
              opacity: 0.9,
              transition: { duration: 0.2 }
            }}
          >
            <Icon size={18} />
            <span className="icon-tooltip">{tooltip}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ChildhoodMemorySection
