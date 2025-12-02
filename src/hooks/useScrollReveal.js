import { useEffect, useRef } from 'react'

/**
 * Custom hook for scroll-triggered reveal animations
 * Uses Intersection Observer for performance
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin around root
 * @param {boolean} options.once - Only trigger once
 * @returns {React.RefObject} - Ref to attach to container element
 */
export const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true
  } = options

  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Find all elements with data-reveal attribute
    const revealElements = container.querySelectorAll('[data-reveal], [data-reveal-stagger]')
    
    if (revealElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove('revealed')
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    revealElements.forEach((el) => {
      observer.observe(el)
    })

    return () => {
      revealElements.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [threshold, rootMargin, once])

  return containerRef
}

/**
 * Initialize scroll reveal globally
 * Call this once in App component
 */
export const initScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true
  } = options

  // Wait for DOM to be ready
  if (typeof window === 'undefined') return

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        if (once) {
          observer.unobserve(entry.target)
        }
      } else if (!once) {
        entry.target.classList.remove('revealed')
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, {
    threshold,
    rootMargin
  })

  // Observe all reveal elements
  const observeElements = () => {
    const elements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]')
    elements.forEach((el) => {
      // Don't re-observe already revealed elements if once is true
      if (once && el.classList.contains('revealed')) return
      observer.observe(el)
    })
  }

  // Initial observation
  observeElements()

  // Re-observe on route changes (for SPA)
  const mutationObserver = new MutationObserver(() => {
    observeElements()
  })

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  })

  return () => {
    observer.disconnect()
    mutationObserver.disconnect()
  }
}

export default useScrollReveal
