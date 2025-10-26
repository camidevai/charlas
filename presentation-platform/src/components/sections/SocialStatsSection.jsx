import { motion } from 'framer-motion';
import { Facebook, Instagram, Music } from 'lucide-react';
import './CommunitySection.css';

const socialLinks = [
  {
    name: 'Facebook',
    icon: <Facebook size={32} />,
    url: 'https://www.facebook.com/profile.php?id=61564523003680',
    className: 'facebook',
  },
  {
    name: 'Instagram',
    icon: <Instagram size={32} />,
    url: 'https://instagram.com/camidevai',
    className: 'instagram',
  },
  {
    name: 'TikTok',
    icon: <Music size={32} />,
    url: 'https://www.tiktok.com/@camidevai',
    className: 'tiktok',
  }
];

const SocialStatsSection = ({ variants }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const numberVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="social-stats-section-enhanced"
      variants={variants}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="social-stats-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Número de seguidores con animación especial */}
        <motion.div
          className="followers-count-wrapper"
          variants={numberVariants}
        >
          <motion.div className="followers-count">
            Casi 400,000
          </motion.div>
        </motion.div>

        {/* Etiqueta descriptiva */}
        <motion.p
          className="followers-label"
          variants={itemVariants}
        >
          seguidores en mi comunidad online
        </motion.p>

        {/* Iconos de redes sociales */}
        <motion.div
          className="social-icons-container-enhanced"
          variants={itemVariants}
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon-link-enhanced ${social.className}`}
              whileHover={{ scale: 1.2, y: -8 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SocialStatsSection;