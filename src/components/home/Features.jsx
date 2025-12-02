import { Users, Bot, Layers, Cpu } from 'lucide-react'
import styles from './Features.module.scss'

/**
 * Features Component
 * Showcases the main features of Hexar.ai platform
 */
const Features = () => {
  // Feature data
  const features = [
    {
      icon: Users,
      title: 'Collaborative Canvas',
      description: 'Real-time collaborative component tree building with live updates and version control.',
      color: 'blue'
    },
    {
      icon: Bot,
      title: 'AI Assistant Guides You Step by Step',
      description: 'Intelligent AI assistant providing step-by-step guidance through complex fault analysis and troubleshooting.',
      color: 'purple'
    },
    {
      icon: Layers,
      title: 'Unique Multi-Domain Architecture',
      description: 'Integration of mechanical, software, electrical, and electronics domains for holistic analysis.',
      color: 'green'
    },
    {
      icon: Cpu,
      title: 'Advanced Diagnostics',
      description: 'Powerful diagnostic tools that analyze system components and identify potential failures before they occur.',
      color: 'orange'
    }
  ]

  return (
    <section 
      className={styles.features} 
      id="features" 
      role="region" 
      aria-labelledby="features-title"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 id="features-title" className={styles.title} data-reveal="blur-fade">
            Powerful Features
          </h2>
          <p className={styles.subtitle} data-reveal="fade-up" data-delay="200">
            Advanced AI-powered tools designed to revolutionize fault diagnosis and system analysis
          </p>
        </header>

        {/* Features Grid */}
        <div className={styles.grid} data-reveal-stagger>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <article 
                key={index}
                className={`${styles.card} ${styles[`card--${feature.color}`]}`}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={28} aria-hidden="true" />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
