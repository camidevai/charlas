import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ImpostorTitleSection = ({ variants }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9])

  return (
    <motion.div 
      ref={ref}
      className="impostor-title-section" 
      variants={variants}
      style={{ y, opacity, scale }}
    >
      <motion.h1
        className="impostor-title"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        IMPOSTORA
      </motion.h1>
    </motion.div>
  )
}

export default ImpostorTitleSection
