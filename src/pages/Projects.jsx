import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Calendar, ArrowRight, Car, Factory, Plane, Loader2 } from 'lucide-react'
import styles from './Projects.module.scss'

/**
 * Projects Page Component
 * Browse and filter public projects
 * 
 * TODO: Replace mock data with API integration
 * Example API integration:
 * const fetchProjects = async (filters) => {
 *   const params = new URLSearchParams(filters)
 *   const response = await fetch(`/api/projects/public?${params}`)
 *   return response.json()
 * }
 */
const Projects = () => {
  // State
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  // Domain configuration
  const domains = [
    { id: 'all', name: 'All Domains', icon: null },
    { id: 'Automotive', name: 'Automotive', icon: Car },
    { id: 'Manufacturing', name: 'Manufacturing', icon: Factory },
    { id: 'Aerospace', name: 'Aerospace', icon: Plane }
  ]

  // Mock project data - Replace with API call
  const mockProjects = [
    {
      id: 1,
      title: 'Autonomous Vehicle',
      description: 'Autonomous vehicle version 2 with advanced sensor integration and AI-powered navigation system for urban environments.',
      domain: 'Automotive',
      updatedAt: '2024-07-01',
      author: 'John Doe',
      components: 45
    },
    {
      id: 2,
      title: 'Industrial Manufacturing Robot',
      description: 'Sorting parts robot used in manufacturing with precision gripper and conveyor belt integration.',
      domain: 'Manufacturing',
      updatedAt: '2024-05-15',
      author: 'Jane Smith',
      components: 32
    },
    {
      id: 3,
      title: 'Open Source Drone',
      description: 'ROS based open source drone project with GPS navigation and autonomous flight capabilities.',
      domain: 'Aerospace',
      updatedAt: '2024-09-10',
      author: 'Mike Johnson',
      components: 28
    },
    {
      id: 4,
      title: 'Electric Scooter',
      description: 'Smart electric scooter with battery management system and mobile app integration.',
      domain: 'Automotive',
      updatedAt: '2024-08-20',
      author: 'Sarah Wilson',
      components: 21
    },
    {
      id: 5,
      title: 'CNC Milling Machine',
      description: 'Precision CNC milling machine with automated tool changer and coolant system.',
      domain: 'Manufacturing',
      updatedAt: '2024-06-25',
      author: 'Tom Brown',
      components: 56
    },
    {
      id: 6,
      title: 'Weather Balloon System',
      description: 'High-altitude weather data collection system with telemetry and recovery mechanisms.',
      domain: 'Aerospace',
      updatedAt: '2024-04-10',
      author: 'Emily Davis',
      components: 19
    }
  ]

  // Load projects
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setProjects(mockProjects)
      setLoading(false)
    }
    loadProjects()
  }, [])

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDomain = selectedDomain === 'all' || project.domain === selectedDomain
      return matchesSearch && matchesDomain
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      } else if (sortBy === 'name') {
        return a.title.localeCompare(b.title)
      } else if (sortBy === 'components') {
        return b.components - a.components
      }
      return 0
    })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get domain icon
  const getDomainIcon = (domain) => {
    const domainConfig = domains.find(d => d.id === domain)
    return domainConfig?.icon || null
  }

  return (
    <div className={styles.projectsPage}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Public Projects</h1>
          <p className={styles.subtitle}>
            Explore component trees shared by the community. Learn from real-world examples and contribute your own projects.
          </p>
        </header>

        {/* Filters */}
        <div className={styles.filters}>
          {/* Search */}
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
          </div>

          {/* Domain Filter */}
          <div className={styles.domainFilters} role="group" aria-label="Filter by domain">
            {domains.map((domain) => {
              const Icon = domain.icon
              return (
                <button
                  key={domain.id}
                  className={`${styles.domainBtn} ${selectedDomain === domain.id ? styles.active : ''}`}
                  onClick={() => setSelectedDomain(domain.id)}
                  aria-pressed={selectedDomain === domain.id}
                >
                  {Icon && <Icon size={16} aria-hidden="true" />}
                  {domain.name}
                </button>
              )
            })}
          </div>

          {/* Sort */}
          <div className={styles.sortWrapper}>
            <Filter size={16} className={styles.sortIcon} aria-hidden="true" />
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort projects"
            >
              <option value="recent">Most Recent</option>
              <option value="name">Name (A-Z)</option>
              <option value="components">Most Components</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className={styles.resultsInfo}>
          <span>{filteredProjects.length} projects found</span>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className={styles.loading}>
            <Loader2 size={40} className={styles.spinner} aria-hidden="true" />
            <span>Loading projects...</span>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className={styles.grid}>
            {filteredProjects.map((project) => {
              const DomainIcon = getDomainIcon(project.domain)
              return (
                <article key={project.id} className={styles.card}>
                  {/* Domain Badge */}
                  <div className={styles.cardHeader}>
                    <span className={styles.badge}>
                      {DomainIcon && <DomainIcon size={14} aria-hidden="true" />}
                      {project.domain}
                    </span>
                    <span className={styles.components}>
                      {project.components} components
                    </span>
                  </div>

                  {/* Content */}
                  <h2 className={styles.cardTitle}>{project.title}</h2>
                  <p className={styles.cardDescription}>{project.description}</p>

                  {/* Meta */}
                  <div className={styles.cardMeta}>
                    <span className={styles.author}>By {project.author}</span>
                    <span className={styles.date}>
                      <Calendar size={14} aria-hidden="true" />
                      {formatDate(project.updatedAt)}
                    </span>
                  </div>

                  {/* Action */}
                  <Link to={`/workspace/${project.id}`} className={styles.viewBtn}>
                    Open Project
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No projects found matching your criteria.</p>
            <button 
              className={styles.resetBtn}
              onClick={() => {
                setSearchQuery('')
                setSelectedDomain('all')
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
