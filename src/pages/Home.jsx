import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import DemoVideo from '../components/home/DemoVideo'
import WhyHexar from '../components/home/WhyHexar'
import PublicProjects from '../components/home/PublicProjects'
import ContactForm from '../components/home/ContactForm'

/**
 * Home Page Component
 * Landing page with all main sections
 * 
 * @param {Object} props
 * @param {Function} props.onLogin - Login button handler
 * @param {Function} props.onRegister - Register button handler
 */
const Home = ({ onLogin, onRegister }) => {
  return (
    <div className="home-page">
      <Hero onLogin={onLogin} onRegister={onRegister} />
      <Features />
      <HowItWorks />
      <DemoVideo />
      <WhyHexar />
      <PublicProjects />
      <ContactForm />
    </div>
  )
}

export default Home
