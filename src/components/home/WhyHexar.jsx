import { Clock, Database, Lightbulb } from 'lucide-react'
import styles from './WhyHexar.module.scss'

/**
 * WhyHexar Component
 * Benefits and value proposition section
 */
const WhyHexar = () => {
  // Benefits data
  const benefits = [
    {
      icon: Clock,
      title: 'Reduces Downtime',
      description: 'Minimize system downtime with rapid fault diagnosis and proactive maintenance recommendations.',
      color: 'blue'
    },
    {
      icon: Database,
      title: 'Unified System Knowledge',
      description: 'A single, structured source of truth for everything that breaks, gets fixed, and evolves.',
      color: 'green'
    },
    {
      icon: Lightbulb,
      title: 'Intelligent',
      description: 'Leverage AI-powered insights and step-by-step guidance for complex troubleshooting challenges.',
      color: 'purple'
    }
  ]

  return (
    <section 
      className={styles.whyHexar} 
      id="why-hexar" 
      role="region" 
      aria-labelledby="why-hexar-title"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 id="why-hexar-title" className={styles.title} data-reveal="blur-fade">
            Why Choose Hexar?
          </h2>
          <p className={styles.subtitle} data-reveal="fade-up" data-delay="200">
            Transform your fault diagnosis process with cutting-edge AI technology
          </p>
        </header>

        {/* Benefits Grid */}
        <div className={styles.grid} data-reveal-stagger>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <article 
                key={index}
                className={`${styles.card} ${styles[`card--${benefit.color}`]}`}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={32} aria-hidden="true" />
                </div>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyHexar
