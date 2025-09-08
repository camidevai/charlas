import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Star, Brain } from 'lucide-react'

const MainContentSection = ({ variants }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      ref={ref}
      className="main-content" 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ y, opacity, scale }}
    >
      <motion.div className="character-container" variants={itemVariants}>
        <motion.div 
          className="character-image"
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
        >
          <img
            src="https://subir-imagen.com/images/2025/09/07/imageffaf6369b294f764.md.png"
            alt="Cami avergonzada - Síndrome del impostor"
            className="character-image"
          />
        </motion.div>
      </motion.div>

      <motion.div className="story-content" variants={itemVariants}>
        <motion.h2 
          className="story-title"
          variants={itemVariants}
        >
          Mi Historia Personal
        </motion.h2>
        
   

     
      </motion.div>
    </motion.div>
  )
}

export default MainContentSection
