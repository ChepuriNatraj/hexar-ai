import { ArrowRight, Play, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.scss'

/**
 * Hero Component
 * Main landing section with tagline, CTAs, and featured projects
 * 
 * @param {Object} props
 * @param {Function} props.onLogin - Login button handler
 * @param {Function} props.onRegister - Register button handler
 */
const Hero = ({ onLogin, onRegister }) => {
  // Featured public projects - Placeholder data
  // TODO: Replace with API call to fetch featured projects
  const featuredProjects = [
    {
      id: 1,
      title: 'Outdoor AGV',
      image: '/images/agv-placeholder.jpg',
      domain: 'Automotive'
    },
    {
      id: 2,
      title: 'Caminhão Scania AXL',
      image: '/images/scania-placeholder.jpg',
      domain: 'Automotive'
    },
    {
      id: 3,
      title: 'The Air Blower Robot',
      image: '/images/blower-placeholder.jpg',
      domain: 'Manufacturing'
    }
  ]

  return (
    <section className={styles.hero} id="home" role="region" aria-label="Hero section">
      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.content}>
          <h1 className={styles.title} data-reveal="blur-fade">
            Fix anything with ease, from robots to your everyday gadgets
          </h1>
          <p className={styles.subtitle} data-reveal="fade-up" data-delay="200">
            Select a public project or create your own and start fixing today
          </p>
          
          {/* CTA Buttons */}
          <div className={styles.actions} data-reveal="fade-up" data-delay="400">
            <button onClick={onLogin} className={styles.primaryBtn}>
              Get Started
              <ArrowRight size={20} aria-hidden="true" />
            </button>
            <a 
              href="https://calendly.com/prajwalgote1999/new-meeting" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              Book a Demo
            </a>
            <Link to="/workspace" className={styles.ghostBtn}>
              <Play size={18} aria-hidden="true" />
              Try Demo
            </Link>
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className={styles.projectsGrid} data-reveal-stagger>
          {featuredProjects.map((project) => (
            <Link 
              to={`/workspace/${project.id}`} 
              key={project.id}
              className={styles.projectCard}
            >
              <div className={styles.projectImage}>
                {/* Placeholder gradient for missing images */}
                <div className={styles.imagePlaceholder}>
                  <svg viewBox="0 0 100 100" className={styles.placeholderIcon}>
                    <rect x="20" y="30" width="60" height="40" rx="4" fill="currentColor" opacity="0.3"/>
                    <circle cx="35" cy="45" r="6" fill="currentColor" opacity="0.5"/>
                    <polygon points="30,60 50,45 70,60 70,70 30,70" fill="currentColor" opacity="0.4"/>
                  </svg>
                </div>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
            </Link>
          ))}
          
          {/* Search More Card */}
          <Link to="/projects" className={styles.searchCard}>
            <div className={styles.searchContent}>
              <span className={styles.searchLabel}>Search More</span>
              <div className={styles.searchMethods}>
                <span className={styles.searchMethod}>Web Search</span>
                <Search size={16} aria-hidden="true" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Background Decoration */}
      <div className={styles.bgDecoration} aria-hidden="true">
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
        <div className={styles.bgGrid}></div>
        <div className={styles.particles}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.particle} style={{ '--delay': `${i * 0.8}s` }}></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
