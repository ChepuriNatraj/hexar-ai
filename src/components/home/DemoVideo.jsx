import { Play } from 'lucide-react'
import { useState } from 'react'
import styles from './DemoVideo.module.scss'

/**
 * DemoVideo Component
 * Video embed section showcasing Hexar in action
 */
const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  // Hexar demo video
  const videoId = 'tmWWhB99sc8'

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <section 
      className={styles.demoVideo} 
      role="region" 
      aria-labelledby="demo-video-title"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 id="demo-video-title" className={styles.title} data-reveal="blur-fade">
            See Hexar in Action
          </h2>
          <p className={styles.subtitle} data-reveal="fade-up" data-delay="200">
            Watch our quick demo to see how Hexar transforms fault analysis with AI-powered assistance
          </p>
        </header>

        {/* Video Container */}
        <div className={styles.videoWrapper} data-reveal="scale-up" data-delay="400">
          {isPlaying ? (
            <iframe
              className={styles.video}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Hexar Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className={styles.videoPlaceholder} onClick={handlePlay}>
              <div className={styles.placeholderContent}>
                <div className={styles.playButton}>
                  <Play size={48} aria-hidden="true" />
                </div>
                <p className={styles.placeholderText}>
                  Learn how to create projects, build component trees, and leverage AI assistance for intelligent troubleshooting in this comprehensive walkthrough.
                </p>
              </div>
              <div className={styles.placeholderOverlay}></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DemoVideo
