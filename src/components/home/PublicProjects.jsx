import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Car, Factory, Plane } from 'lucide-react'
import styles from './PublicProjects.module.scss'

/**
 * PublicProjects Component
 * Showcases featured public projects with filtering
 * 
 * TODO: Replace with API call to fetch public projects
 * Example API integration:
 * const fetchProjects = async () => {
 *   const response = await fetch('/api/projects/public')
 *   return response.json()
 * }
 */
const PublicProjects = () => {
  // Domain filter state
  const [selectedDomain, setSelectedDomain] = useState('all')

  // Domain icons mapping
  const domainIcons = {
    Automotive: Car,
    Manufacturing: Factory,
    Aerospace: Plane
  }

  // Mock project data - Replace with API data
  const projects = [
    {
      id: 1,
      title: 'Autonomous Vehicle',
      description: 'Autonomous vehicle version 2',
      domain: 'Automotive',
      daysAgo: 152,
      featured: true
    },
    {
      id: 2,
      title: 'Industrial Manufacturing Robot',
      description: 'Sorting parts robot used in manufacturing',
      domain: 'Manufacturing',
      daysAgo: 231,
      featured: true
    },
    {
      id: 3,
      title: 'Open Source Drone',
      description: 'ROS based open source drone project',
      domain: 'Aerospace',
      daysAgo: 83,
      featured: true
    }
  ]

  // Filter projects by domain
  const filteredProjects = selectedDomain === 'all' 
    ? projects 
    : projects.filter(p => p.domain === selectedDomain)

  // Format days ago text
  const formatDaysAgo = (days) => {
    if (days === 1) return '1 day ago'
    if (days < 7) return `${days} days ago`
    if (days < 14) return '1 week ago'
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    if (days < 60) return '1 month ago'
    return `${Math.floor(days / 30)} months ago`
  }

  return (
    <section 
      className={styles.publicProjects} 
      id="projects" 
      role="region" 
      aria-labelledby="projects-title"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 id="projects-title" className={styles.title} data-reveal="blur-fade">
            Explore Public Projects
          </h2>
          <p className={styles.subtitle} data-reveal="fade-up" data-delay="200">
            Join our community of developers and engineers. Access shared component trees and contribute to collaborative analysis.
          </p>
        </header>

        {/* Domain Filter */}
        <div className={styles.filters} role="tablist" aria-label="Filter projects by domain" data-reveal="fade-up" data-delay="300">
          {['all', 'Automotive', 'Manufacturing', 'Aerospace'].map((domain) => (
            <button
              key={domain}
              className={`${styles.filterBtn} ${selectedDomain === domain ? styles.active : ''}`}
              onClick={() => setSelectedDomain(domain)}
              role="tab"
              aria-selected={selectedDomain === domain}
            >
              {domain === 'all' ? 'All Projects' : domain}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.grid} data-reveal-stagger>
          {filteredProjects.map((project) => {
            const DomainIcon = domainIcons[project.domain]
            return (
              <article key={project.id} className={styles.card}>
                {/* Domain Badge */}
                <div className={styles.badge}>
                  <DomainIcon size={14} aria-hidden="true" />
                  <span>{project.domain}</span>
                </div>

                {/* Time Badge */}
                <span className={styles.time}>
                  {formatDaysAgo(project.daysAgo)}
                </span>

                {/* Card Content */}
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>

                {/* View Link */}
                <Link to={`/workspace/${project.id}`} className={styles.viewLink}>
                  View Project
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            )
          })}

          {/* Join Community Card */}
          <article className={styles.joinCard}>
            <div className={styles.joinContent}>
              <h3 className={styles.joinTitle}>Join Our Community</h3>
              <p className={styles.joinDescription}>
                Create your own projects and share with the community
              </p>
              <Link to="/workspace" className={styles.joinBtn}>
                Get Started
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>

        {/* View All Link */}
        <div className={styles.viewAll} data-reveal="fade-up" data-delay="600">
          <Link to="/projects" className={styles.viewAllLink}>
            View All Projects
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PublicProjects
