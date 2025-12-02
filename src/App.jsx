import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Workspace from './pages/Workspace'
import AuthModal from './components/auth/AuthModal'
import { initScrollReveal } from './hooks/useScrollReveal'

/**
 * Main App Component
 * Handles routing and global state management
 * 
 * @returns {JSX.Element} The main application component
 */
function App() {
  // Initialize scroll reveal animations
  useEffect(() => {
    const cleanup = initScrollReveal({
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px',
      once: true
    })
    return cleanup
  }, [])

  // Authentication modal state
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
  
  // Mock user state - Replace with actual auth logic
  const [user, setUser] = useState(null)

  /**
   * Opens the authentication modal
   * @param {string} mode - 'login' or 'register'
   */
  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  /**
   * Closes the authentication modal
   */
  const closeAuthModal = () => {
    setShowAuthModal(false)
  }

  /**
   * Handles user login - Placeholder for backend integration
   * @param {Object} credentials - User credentials
   * 
   * TODO: Integrate with backend authentication API
   * Example:
   * const response = await fetch('/api/auth/login', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify(credentials)
   * })
   */
  const handleLogin = (credentials) => {
    console.log('Login attempt:', credentials)
    // Mock successful login
    setUser({ name: 'Demo User', email: credentials.email })
    closeAuthModal()
  }

  /**
   * Handles user registration - Placeholder for backend integration
   * @param {Object} userData - User registration data
   * 
   * TODO: Integrate with backend registration API
   */
  const handleRegister = (userData) => {
    console.log('Registration attempt:', userData)
    // Mock successful registration
    setUser({ name: userData.name, email: userData.email })
    closeAuthModal()
  }

  /**
   * Handles user logout
   */
  const handleLogout = () => {
    setUser(null)
  }

  return (
    <Router>
      <div className="app">
        {/* Global Floating Particles */}
        <div className="global-particles" aria-hidden="true">
          <div className="global-particle global-particle--cyan"></div>
          <div className="global-particle global-particle--purple"></div>
          <div className="global-particle global-particle--cyan"></div>
          <div className="global-particle global-particle--blue"></div>
          <div className="global-particle global-particle--purple"></div>
          <div className="global-particle global-particle--cyan"></div>
          <div className="global-particle global-particle--blue"></div>
          <div className="global-particle global-particle--purple"></div>
          <div className="global-particle global-particle--cyan"></div>
          <div className="global-particle global-particle--blue"></div>
          <div className="global-particle global-particle--purple"></div>
          <div className="global-particle global-particle--cyan"></div>
        </div>

        <Header 
          user={user}
          onLogin={() => openAuthModal('login')}
          onRegister={() => openAuthModal('register')}
          onLogout={handleLogout}
        />
        
        <main className="main-content" role="main">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onLogin={() => openAuthModal('login')}
                  onRegister={() => openAuthModal('register')}
                />
              } 
            />
            <Route path="/projects" element={<Projects />} />
            <Route 
              path="/workspace" 
              element={
                <Workspace 
                  user={user}
                  onLogin={() => openAuthModal('login')}
                />
              } 
            />
            <Route 
              path="/workspace/:projectId" 
              element={
                <Workspace 
                  user={user}
                  onLogin={() => openAuthModal('login')}
                />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Authentication Modal */}
        {showAuthModal && (
          <AuthModal
            mode={authMode}
            onClose={closeAuthModal}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onSwitchMode={setAuthMode}
          />
        )}
      </div>
    </Router>
  )
}

export default App
