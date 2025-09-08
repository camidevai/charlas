import { motion } from 'framer-motion';
import { Facebook, Instagram, Music } from 'lucide-react';
import './CommunitySection.css'; // Importamos el nuevo CSS

// Ya no necesitamos datos de seguidores, solo los enlaces y detalles de cada red
const socialLinks = [
  {
    name: 'Facebook',
    icon: <Facebook size={28} />,
    url: 'https://www.facebook.com/profile.php?id=61564523003680',
    className: 'facebook',
  },
  {
    name: 'Instagram',
    icon: <Instagram size={28} />,
    url: 'https://instagram.com/camidevai',
    className: 'instagram',
  },
  {
    name: 'TikTok',
    icon: <Music size={28} />,
    url: 'https://www.tiktok.com/@camidevai',
    className: 'tiktok',
  }
];

const CommunitySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Animación escalonada para el número, texto y los íconos
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="community-section-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div className="total-followers-count" variants={itemVariants}>
        Casi 400,000
      </motion.div>
      <motion.p className="total-followers-label" variants={itemVariants}>
        seguidores en mi comunidad online
      </motion.p>
      
      <motion.div className="social-icons-container" variants={itemVariants}>
        {socialLinks.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-icon-link ${social.className}`}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CommunitySection;