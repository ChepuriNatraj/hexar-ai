import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import styles from './Header.module.scss'

/**
 * Header Component
 * Sticky navigation bar with responsive mobile menu
 * 
 * @param {Object} props
 * @param {Object} props.user - Current logged in user
 * @param {Function} props.onLogin - Login button handler
 * @param {Function} props.onRegister - Register button handler
 * @param {Function} props.onLogout - Logout button handler
 */
const Header = ({ user, onLogin, onRegister, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Why Hexar?', href: '/#why-hexar' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Handle anchor navigation
  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.substring(2)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else if (location.pathname !== '/') {
        window.location.href = href
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Hexar.ai - Home">
          <svg viewBox="0 0 100 100" className={styles.logoIcon} aria-hidden="true">
            <rect x="5" y="5" width="90" height="90" rx="10" ry="10" fill="#4B0082"/>
            <rect x="20" y="25" width="10" height="50" fill="white"/>
            <rect x="70" y="25" width="10" height="50" fill="white"/>
            <rect x="20" y="45" width="60" height="10" fill="white"/>
          </svg>
          <span className={styles.logoText}>Hexar<span>.ai</span></span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks} role="menubar">
          {navLinks.map((link) => (
            <li key={link.name} role="none">
              <a 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={styles.navLink}
                role="menuitem"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <a 
            href="https://calendly.com/prajwalgote1999/new-meeting" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.demoBtn}
          >
            Book a Demo
          </a>
          
          {user ? (
            <div className={styles.userMenu}>
              <button 
                className={styles.userBtn}
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-expanded={showUserMenu}
                aria-haspopup="true"
              >
                <User size={20} aria-hidden="true" />
                <span>{user.name}</span>
                <ChevronDown size={16} aria-hidden="true" />
              </button>
              
              {showUserMenu && (
                <div className={styles.dropdown} role="menu">
                  <Link to="/workspace" className={styles.dropdownItem} role="menuitem">
                    My Workspace
                  </Link>
                  <Link to="/projects" className={styles.dropdownItem} role="menuitem">
                    My Projects
                  </Link>
                  <hr className={styles.dropdownDivider} />
                  <button 
                    onClick={onLogout} 
                    className={styles.dropdownItem}
                    role="menuitem"
                  >
                    <LogOut size={16} aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={onLogin} className={styles.loginBtn}>
                Login
              </button>
              <button onClick={onRegister} className={styles.registerBtn}>
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileNav} role="menu">
            <ul className={styles.mobileNavLinks}>
              {navLinks.map((link) => (
                <li key={link.name} role="none">
                  <a 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={styles.mobileNavLink}
                    role="menuitem"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.mobileActions}>
              <a 
                href="https://calendly.com/prajwalgote1999/new-meeting" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.mobileDemoBtn}
              >
                Book a Demo
              </a>
              {!user && (
                <>
                  <button onClick={onLogin} className={styles.mobileLoginBtn}>
                    Login
                  </button>
                  <button onClick={onRegister} className={styles.mobileRegisterBtn}>
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
