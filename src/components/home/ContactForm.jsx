import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import styles from './ContactForm.module.scss'

/**
 * ContactForm Component
 * Contact form with validation and submission handling
 * 
 * TODO: Integrate with backend API for form submission
 * Example integration:
 * const submitForm = async (data) => {
 *   const response = await fetch('/api/contact', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(data)
 *   })
 *   return response.json()
 * }
 */
const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [errors, setErrors] = useState({})

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Form submitted:', formData)
      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      className={styles.contact} 
      id="contact" 
      role="region" 
      aria-labelledby="contact-title"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 id="contact-title" className={styles.title} data-reveal="blur-fade">
            Contact Us
          </h2>
          <p className={styles.subtitle} data-reveal="fade-up" data-delay="200">
            Have questions or interested in our solutions? Reach out to us and we'll be happy to assist you.
          </p>
        </header>

        {/* Contact Form */}
        <form 
          className={styles.form} 
          onSubmit={handleSubmit}
          noValidate
          data-reveal="fade-up"
          data-delay="400"
        >
          {/* Name Fields */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                placeholder="John"
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              />
              {errors.firstName && (
                <span id="firstName-error" className={styles.error} role="alert">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                placeholder="Doe"
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              />
              {errors.lastName && (
                <span id="lastName-error" className={styles.error} role="alert">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="john.doe@example.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className={styles.error} role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              placeholder="Tell us about your project or question..."
              rows={5}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span id="message-error" className={styles.error} role="alert">
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className={styles.spinner} aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={18} aria-hidden="true" />
              </>
            )}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className={styles.successMessage} role="alert">
              Thank you! Your message has been sent successfully. We'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className={styles.errorMessage} role="alert">
              Something went wrong. Please try again later.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default ContactForm
