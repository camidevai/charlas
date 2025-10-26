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

  // Imágenes de apariciones en medios
  const mediaImages = [
    {
      id: 1,
      src: 'https://subir-imagen.com/images/2025/10/26/image07c6f4407f02d2f1.md.png',
      alt: 'PorcelTV - Aparición en Televisión'
    },
    {
      id: 2,
      src: 'https://subir-imagen.com/images/2025/10/26/image61fbcaf38c6cec93.md.png',
      alt: 'Talento Digital - Charla'
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

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

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

      {/* Galería de imágenes horizontales */}
      <motion.div
        className="impostor-images-gallery"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {mediaImages.map((image) => (
          <motion.div
            key={image.id}
            className="impostor-image-wrapper"
            variants={imageVariants}
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              className="tv-image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ImpostorTitleSection
