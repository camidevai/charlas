import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { useState } from 'react'
import './PersonalStorySection.css'

// Importar componentes refactorizados
import ImpostorTitleSection from './ImpostorTitleSection'
import SocialStatsSection from './SocialStatsSection'
import MainContentSection from './MainContentSection'
import QRSection from './QRSection'
import ChildhoodMemorySection from './ChildhoodMemorySection'
import ProfessionalJourneySection from './ProfessionalJourneySection'
import TechJourneySection from './TechJourneySection'

const PersonalStorySection = ({ onNext, onPrev, isFirst, isLast, sectionNumber, totalSections }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.section
      className="personal-story-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="story-content">


        {/* Título principal - IMPOSTORA */}
        <ImpostorTitleSection variants={itemVariants} />

        {/* Sección de estadísticas y redes sociales */}
        <SocialStatsSection variants={itemVariants} />

        {/* Sección QR Code Instagram */}
        <QRSection 
          variants={itemVariants} 
          showQRModal={isQRModalOpen} 
          setShowQRModal={setIsQRModalOpen} 
        />



        {/* Sección principal con personaje y contenido */}
        <MainContentSection variants={itemVariants} />

        {/* Sección de memoria visual - Historia de la infancia */}
        <ChildhoodMemorySection variants={itemVariants} />

        {/* Sección de trayectoria profesional */}
        <ProfessionalJourneySection variants={itemVariants} />

        {/* Sección de camino hacia la tecnología */}
        <TechJourneySection variants={itemVariants} />

        {/* Navegación */}
        <motion.div className="story-navigation" variants={itemVariants}>
          <motion.button
            className="nav-button prev"
            onClick={onPrev}
            disabled={isFirst}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="button-icon" />
            Anterior
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
            transition={{ duration: 0.2 }}
          >
            Siguiente
            <ChevronRight className="button-icon" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default PersonalStorySection
