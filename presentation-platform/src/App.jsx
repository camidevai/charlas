import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/layout/Navigation'
import PresentationContainer from './components/layout/PresentationContainer'
import WelcomeSection from './components/sections/WelcomeSection'
import PersonalStorySection from './components/sections/PersonalStorySection'
import AIIntroSection from './components/sections/AIIntroSection'
import AIPromptsSection from './components/sections/AIPromptsSection'
import AIToolsSection from './components/sections/AIToolsSection'
import QRSection from './components/sections/QRSection'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPresenting, setIsPresenting] = useState(false)

  const sections = [
    { id: 'welcome', title: 'Bienvenida', component: WelcomeSection },
    { id: 'personal-story', title: 'Mi Historia Personal', component: PersonalStorySection },
    { id: 'ai-intro', title: 'Herramientas de IA Generativa', component: AIIntroSection },
    { id: 'ai-prompts', title: 'Cómo hablarle a las IAs', component: AIPromptsSection },
    { id: 'ai-tools', title: 'Introducción a la IA', component: AIToolsSection }
  ]

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const goToSection = (index) => {
    setCurrentSection(index)
  }

  // Controles de teclado para la presentación
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isPresenting) {
        switch (event.key) {
          case 'ArrowRight':
          case ' ':
            event.preventDefault()
            nextSection()
            break
          case 'ArrowLeft':
            event.preventDefault()
            prevSection()
            break
          case 'Escape':
            setIsPresenting(false)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSection, isPresenting])

  const CurrentSectionComponent = sections[currentSection].component

  return (
    <Router>
      <div className="app">
        <Navigation
          sections={sections}
          currentSection={currentSection}
          onSectionChange={goToSection}
          isPresenting={isPresenting}
        />

        <PresentationContainer isPresenting={isPresenting}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="section-container"
            >
              <CurrentSectionComponent
                onNext={nextSection}
                onPrev={prevSection}
                isFirst={currentSection === 0}
                isLast={currentSection === sections.length - 1}
                sectionNumber={currentSection + 1}
                totalSections={sections.length}
              />
            </motion.div>
          </AnimatePresence>

          {/* QR Widget Global - Visible en todas las secciones */}
          <QRSection />
        </PresentationContainer>
      </div>
    </Router>
  )
}

export default App
