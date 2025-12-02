import { FolderPlus, GitBranch, MessageSquare, Users } from 'lucide-react'
import styles from './HowItWorks.module.scss'

/**
 * HowItWorks Component
 * Four-step workflow explanation
 */
const HowItWorks = () => {
  // Steps data
  const steps = [
    {
      number: '01',
      icon: FolderPlus,
      title: 'Create a Project',
      description: 'Start by creating a new project and setting up your fault analysis workspace.'
    },
    {
      number: '02',
      icon: GitBranch,
      title: 'Build a Component Tree on Canvas',
      description: 'Use our intuitive drag-and-drop interface to build comprehensive component trees.'
    },
    {
      number: '03',
      icon: MessageSquare,
      title: 'Ask Hexar AI Assistant',
      description: 'Get intelligent troubleshooting help from our AI assistant that analyzes your component tree.'
    },
    {
      number: '04',
      icon: Users,
      title: 'Collaborate with Your Team',
      description: 'Share projects with team members and work together to solve complex challenges.'
    }
  ]

  return (
    <section 
      className={styles.howItWorks} 
      id="how-it-works" 
      role="region" 
      aria-labelledby="how-it-works-title"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 id="how-it-works-title" className={styles.title} data-reveal="blur-fade">
            How It Works
          </h2>
          <p className={styles.subtitle} data-reveal="fade-up" data-delay="200">
            Four simple steps to revolutionize your fault analysis workflow with AI-powered assistance
          </p>
        </header>

        {/* Steps */}
        <div className={styles.steps}>
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article 
                key={index} 
                className={styles.step}
                data-reveal="fade-up"
                data-delay={`${(index + 1) * 150}`}
              >
                <div className={styles.stepNumber}>
                  <span>{step.number}</span>
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepIcon}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={styles.connector} aria-hidden="true"></div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
