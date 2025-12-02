import { Link } from 'react-router-dom'
import { Linkedin, Youtube, Twitter } from 'lucide-react'
import styles from './Footer.module.scss'

/**
 * Footer Component
 * Site footer with navigation, social links, and legal information
 */
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.content} data-reveal-stagger>
          {/* Brand Section */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="Hexar.ai - Home">
              <svg viewBox="0 0 100 100" className={styles.logoIcon} aria-hidden="true">
                <rect x="5" y="5" width="90" height="90" rx="10" ry="10" fill="#4B0082"/>
                <rect x="20" y="25" width="10" height="50" fill="white"/>
                <rect x="70" y="25" width="10" height="50" fill="white"/>
                <rect x="20" y="45" width="60" height="10" fill="white"/>
              </svg>
              <span className={styles.logoText}>Hexar<span>.ai</span></span>
            </Link>
            <p className={styles.tagline}>
              Driving technological innovation through intelligent AI solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className={styles.navSection} aria-label="Footer navigation">
            <h4 className={styles.navTitle}>Quick Links</h4>
            <ul className={styles.navList}>
              <li><a href="/#home">Home</a></li>
              <li><a href="/#features">Features</a></li>
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/#why-hexar">Why Hexar?</a></li>
              <li><a href="/#projects">Projects</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </nav>

          {/* Resources */}
          <nav className={styles.navSection} aria-label="Resources">
            <h4 className={styles.navTitle}>Resources</h4>
            <ul className={styles.navList}>
              <li><Link to="/projects">Public Projects</Link></li>
              <li><Link to="/workspace">Workspace</Link></li>
              <li>
                <a 
                  href="https://calendly.com/prajwalgote1999/new-meeting" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Book a Demo
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <div className={styles.socialSection}>
            <h4 className={styles.navTitle}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a 
                href="https://x.com/hexar99" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on X (Twitter)"
                className={styles.socialLink}
              >
                <Twitter size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://www.linkedin.com/company/hexarai/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className={styles.socialLink}
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://www.youtube.com/@Hexar-AI" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Subscribe to our YouTube channel"
                className={styles.socialLink}
              >
                <Youtube size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Hexar.ai. All Rights Reserved.
          </p>
          <div className={styles.legal}>
            <a href="/privacy" className={styles.legalLink}>Privacy Policy</a>
            <a href="/terms" className={styles.legalLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
