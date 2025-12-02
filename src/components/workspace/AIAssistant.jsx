import { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Lightbulb
} from 'lucide-react'
import styles from './AIAssistant.module.scss'

/**
 * AIAssistant Component
 * AI-powered troubleshooting assistant providing step-by-step guidance
 * 
 * @param {Object} props
 * @param {Array} props.nodes - Component tree nodes
 * @param {Object} props.selectedNode - Currently selected node
 * 
 * TODO: Integrate with AI backend for actual responses
 * Example integration:
 * const sendMessage = async (message, context) => {
 *   const response = await fetch('/api/ai/chat', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ message, context, nodeTree: nodes })
 *   })
 *   return response.json()
 * }
 */
const AIAssistant = ({ nodes, selectedNode }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your Hexar AI Assistant. I can help you with fault diagnosis and troubleshooting. Select a component from your tree or describe an issue you're experiencing.",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [troubleshootingSteps, setTroubleshootingSteps] = useState(null)
  const messagesEndRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Update context when selected node changes
  useEffect(() => {
    if (selectedNode) {
      const contextMessage = {
        id: Date.now(),
        type: 'system',
        content: `Selected component: ${selectedNode.label} (${selectedNode.type})`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, contextMessage])
    }
  }, [selectedNode?.id])

  /**
   * Generate mock AI response
   * TODO: Replace with actual AI API call
   */
  const generateResponse = async (userMessage) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Check for troubleshooting keywords
    const isTroubleshooting = /problem|issue|error|fault|not working|broken|diagnose|troubleshoot/i.test(userMessage)

    if (isTroubleshooting && selectedNode) {
      // Generate troubleshooting steps
      const steps = generateTroubleshootingSteps(selectedNode)
      setTroubleshootingSteps(steps)
      
      return {
        type: 'assistant',
        content: `I've analyzed the ${selectedNode.label} component. Here's a systematic troubleshooting guide:`,
        hasSteps: true
      }
    }

    // General responses based on context
    const responses = [
      `Based on your ${nodes.length} component tree, I can help you identify potential issues. What specific behavior are you observing?`,
      `For the ${selectedNode?.label || 'system'} component, common issues include connectivity problems, sensor calibration, and power supply irregularities. Would you like me to elaborate on any of these?`,
      `I recommend checking the following areas: component connections, power supply stability, and sensor readings. Shall I create a diagnostic checklist?`,
      `This type of issue often relates to the communication between components. Let's trace the signal path from the root to the affected component.`
    ]

    return {
      type: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)]
    }
  }

  /**
   * Generate troubleshooting steps based on component type
   */
  const generateTroubleshootingSteps = (node) => {
    const commonSteps = {
      system: [
        { step: 1, title: 'Check System Power', description: 'Verify the main power supply is connected and delivering correct voltage.', status: 'pending' },
        { step: 2, title: 'Review Error Logs', description: 'Check system logs for any error messages or warnings.', status: 'pending' },
        { step: 3, title: 'Verify Connections', description: 'Inspect all cable connections for loose or damaged wires.', status: 'pending' },
        { step: 4, title: 'Run Diagnostics', description: 'Execute built-in diagnostic tests to identify failing components.', status: 'pending' }
      ],
      mechanical: [
        { step: 1, title: 'Visual Inspection', description: 'Look for physical damage, wear, or misalignment in mechanical parts.', status: 'pending' },
        { step: 2, title: 'Check Lubrication', description: 'Ensure all moving parts are properly lubricated.', status: 'pending' },
        { step: 3, title: 'Test Movement', description: 'Manually move components to check for binding or resistance.', status: 'pending' },
        { step: 4, title: 'Measure Tolerances', description: 'Use measuring tools to verify components are within specification.', status: 'pending' }
      ],
      electrical: [
        { step: 1, title: 'Check Power Supply', description: 'Measure voltage at the component input terminals.', status: 'pending' },
        { step: 2, title: 'Test Continuity', description: 'Use a multimeter to check wire continuity and resistance.', status: 'pending' },
        { step: 3, title: 'Inspect Connections', description: 'Look for corroded, loose, or damaged electrical connections.', status: 'pending' },
        { step: 4, title: 'Verify Grounding', description: 'Ensure proper grounding throughout the electrical system.', status: 'pending' }
      ],
      electronics: [
        { step: 1, title: 'Check Power Rails', description: 'Measure all voltage rails to ensure they are within tolerance.', status: 'pending' },
        { step: 2, title: 'Test Signal Integrity', description: 'Use an oscilloscope to verify signal quality and timing.', status: 'pending' },
        { step: 3, title: 'Firmware Check', description: 'Verify the firmware version and consider updating if outdated.', status: 'pending' },
        { step: 4, title: 'Temperature Check', description: 'Monitor component temperatures under load conditions.', status: 'pending' }
      ],
      software: [
        { step: 1, title: 'Check Logs', description: 'Review application logs for errors or exceptions.', status: 'pending' },
        { step: 2, title: 'Verify Configuration', description: 'Ensure all configuration files are correct and up to date.', status: 'pending' },
        { step: 3, title: 'Test Connectivity', description: 'Check network connections and API endpoints.', status: 'pending' },
        { step: 4, title: 'Restart Services', description: 'Restart affected services and monitor for issues.', status: 'pending' }
      ]
    }

    return commonSteps[node.type] || commonSteps.system
  }

  /**
   * Handle sending a message
   */
  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setTroubleshootingSteps(null)

    try {
      const response = await generateResponse(input.trim())
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        ...response,
        timestamp: new Date()
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  /**
   * Mark step as complete
   */
  const handleStepComplete = (stepIndex) => {
    setTroubleshootingSteps(prev => 
      prev.map((step, index) => 
        index === stepIndex 
          ? { ...step, status: step.status === 'completed' ? 'pending' : 'completed' }
          : step
      )
    )
  }

  /**
   * Quick action suggestions
   */
  const quickActions = [
    { label: 'Diagnose Issue', query: 'I have a problem with this component' },
    { label: 'Check Connections', query: 'How do I check the connections?' },
    { label: 'Get Recommendations', query: 'What are common issues to look for?' }
  ]

  return (
    <div className={styles.assistant}>
      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.type]}`}
          >
            {message.type === 'assistant' && (
              <div className={styles.messageIcon}>
                <Bot size={16} aria-hidden="true" />
              </div>
            )}
            {message.type === 'user' && (
              <div className={styles.messageIcon}>
                <User size={16} aria-hidden="true" />
              </div>
            )}
            {message.type === 'system' && (
              <div className={styles.messageIcon}>
                <Lightbulb size={16} aria-hidden="true" />
              </div>
            )}
            <div className={styles.messageContent}>
              <p>{message.content}</p>
              <span className={styles.messageTime}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {/* Troubleshooting Steps */}
        {troubleshootingSteps && (
          <div className={styles.troubleshootingSteps}>
            <h4 className={styles.stepsTitle}>
              <Wrench size={16} aria-hidden="true" />
              Troubleshooting Steps
            </h4>
            <div className={styles.stepsList}>
              {troubleshootingSteps.map((step, index) => (
                <div 
                  key={step.step}
                  className={`${styles.step} ${step.status === 'completed' ? styles.completed : ''}`}
                  onClick={() => handleStepComplete(index)}
                >
                  <div className={styles.stepNumber}>
                    {step.status === 'completed' ? (
                      <CheckCircle size={20} aria-hidden="true" />
                    ) : (
                      <span>{step.step}</span>
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <h5 className={styles.stepTitle}>{step.title}</h5>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                  <ChevronRight size={16} className={styles.stepArrow} aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.messageIcon}>
              <Bot size={16} aria-hidden="true" />
            </div>
            <div className={styles.messageContent}>
              <div className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length < 3 && (
        <div className={styles.quickActions}>
          {quickActions.map((action) => (
            <button
              key={action.label}
              className={styles.quickAction}
              onClick={() => {
                setInput(action.query)
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className={styles.inputArea}>
        <textarea
          className={styles.input}
          placeholder="Describe your issue or ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
          disabled={isLoading}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 size={20} className={styles.spinner} />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </div>
  )
}

export default AIAssistant
