import { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import styles from './AuthModal.module.scss'

/**
 * AuthModal Component
 * Modal for login/registration with form validation
 * 
 * @param {Object} props
 * @param {string} props.mode - 'login' or 'register'
 * @param {Function} props.onClose - Close modal handler
 * @param {Function} props.onLogin - Login handler
 * @param {Function} props.onRegister - Register handler
 * @param {Function} props.onSwitchMode - Mode switch handler
 * 
 * TODO: Integrate with authentication backend
 * Example OAuth integration:
 * const handleGoogleLogin = async () => {
 *   window.location.href = '/api/auth/google'
 * }
 */
const AuthModal = ({ mode, onClose, onLogin, onRegister, onSwitchMode }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (mode === 'register' && !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      if (mode === 'login') {
        await onLogin({ email: formData.email, password: formData.password })
      } else {
        await onRegister({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      }
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle mode switch
  const handleSwitchMode = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setErrors({})
    onSwitchMode(mode === 'login' ? 'register' : 'login')
  }

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className={styles.overlay} 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className={styles.modal}>
        {/* Close Button */}
        <button 
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className={styles.header}>
          <h2 id="auth-modal-title" className={styles.title}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className={styles.subtitle}>
            {mode === 'login' 
              ? 'Sign in to access your projects and workspace'
              : 'Join Hexar to start your fault analysis journey'
            }
          </p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Name Field (Register only) */}
          {mode === 'register' && (
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} aria-hidden="true" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <span className={styles.error} role="alert">{errors.name}</span>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} aria-hidden="true" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <span className={styles.error} role="alert">{errors.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} aria-hidden="true" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.error} role="alert">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password (Register only) */}
          {mode === 'register' && (
            <div className={styles.field}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} aria-hidden="true" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <span className={styles.error} role="alert">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className={styles.submitError} role="alert">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? 'Please wait...' 
              : mode === 'login' ? 'Sign In' : 'Create Account'
            }
          </button>

          {/* Forgot Password (Login only) */}
          {mode === 'login' && (
            <a href="/forgot-password" className={styles.forgotPassword}>
              Forgot your password?
            </a>
          )}

          {/* Switch Mode */}
          <p className={styles.switchMode}>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button type="button" onClick={handleSwitchMode} className={styles.switchBtn}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </form>

        {/* OAuth Divider */}
        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        {/* OAuth Buttons */}
        <div className={styles.oauth}>
          {/* TODO: Implement OAuth providers */}
          <button className={styles.oauthBtn} type="button" disabled>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className={styles.oauthBtn} type="button" disabled>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
