import { useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Plus, 
  Minus, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  Trash2, 
  Save, 
  Users, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Settings,
  Download,
  Share2,
  X,
  Minimize2,
  Maximize2,
  GripVertical,
  Bot
} from 'lucide-react'
import AIAssistant from '../components/workspace/AIAssistant'
import ComponentNode from '../components/workspace/ComponentNode'
import Toolbar from '../components/workspace/Toolbar'
import styles from './Workspace.module.scss'

/**
 * Workspace Page Component
 * Collaborative canvas for building component trees
 * 
 * @param {Object} props
 * @param {Object} props.user - Current user
 * @param {Function} props.onLogin - Login handler
 * 
 * TODO: Implement real-time collaboration with WebSockets
 * Example WebSocket integration:
 * const ws = new WebSocket('wss://api.hexar.ai/workspace')
 * ws.onmessage = (event) => {
 *   const update = JSON.parse(event.data)
 *   handleRemoteUpdate(update)
 * }
 */
const Workspace = ({ user, onLogin }) => {
  const { projectId } = useParams()
  
  // Canvas state
  const [nodes, setNodes] = useState([
    {
      id: 'root',
      type: 'system',
      label: 'System Root',
      x: 400,
      y: 100,
      children: ['motor', 'sensor']
    },
    {
      id: 'motor',
      type: 'mechanical',
      label: 'Motor Assembly',
      x: 250,
      y: 250,
      parentId: 'root',
      children: ['encoder']
    },
    {
      id: 'sensor',
      type: 'electronics',
      label: 'Sensor Module',
      x: 550,
      y: 250,
      parentId: 'root',
      children: []
    },
    {
      id: 'encoder',
      type: 'electrical',
      label: 'Rotary Encoder',
      x: 250,
      y: 400,
      parentId: 'motor',
      children: []
    }
  ])
  
  const [selectedNode, setSelectedNode] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [showAssistant, setShowAssistant] = useState(true)
  const [assistantMinimized, setAssistantMinimized] = useState(false)
  const [assistantPosition, setAssistantPosition] = useState({ x: null, y: null })
  const [isDraggingAssistant, setIsDraggingAssistant] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [draggedNode, setDraggedNode] = useState(null)
  
  const canvasRef = useRef(null)
  const panStartRef = useRef({ x: 0, y: 0 })
  const assistantDragRef = useRef({ x: 0, y: 0 })

  // Component types configuration
  const componentTypes = [
    { id: 'system', label: 'System', color: '#2563EB' },
    { id: 'mechanical', label: 'Mechanical', color: '#10B981' },
    { id: 'electrical', label: 'Electrical', color: '#F59E0B' },
    { id: 'electronics', label: 'Electronics', color: '#8B5CF6' },
    { id: 'software', label: 'Software', color: '#EC4899' }
  ]

  // Handle node selection
  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId)
  }

  // Handle node drag
  const handleNodeDrag = useCallback((nodeId, newX, newY) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, x: newX, y: newY }
        : node
    ))
  }, [])

  // Add new node
  const addNode = (type, parentId = null) => {
    const newId = `node-${Date.now()}`
    const parent = parentId ? nodes.find(n => n.id === parentId) : null
    
    const newNode = {
      id: newId,
      type,
      label: `New ${componentTypes.find(t => t.id === type)?.label || 'Component'}`,
      x: parent ? parent.x + 50 : 400 + Math.random() * 100,
      y: parent ? parent.y + 150 : 200 + Math.random() * 100,
      parentId,
      children: []
    }

    setNodes(prev => {
      const updated = [...prev, newNode]
      if (parentId) {
        return updated.map(node =>
          node.id === parentId
            ? { ...node, children: [...node.children, newId] }
            : node
        )
      }
      return updated
    })
    
    setSelectedNode(newId)
  }

  // Delete node
  const deleteNode = (nodeId) => {
    const nodeToDelete = nodes.find(n => n.id === nodeId)
    if (!nodeToDelete) return

    // Recursively get all descendant IDs
    const getDescendants = (id) => {
      const node = nodes.find(n => n.id === id)
      if (!node || node.children.length === 0) return [id]
      return [id, ...node.children.flatMap(getDescendants)]
    }

    const idsToDelete = new Set(getDescendants(nodeId))

    setNodes(prev => prev
      .filter(node => !idsToDelete.has(node.id))
      .map(node => ({
        ...node,
        children: node.children.filter(childId => !idsToDelete.has(childId))
      }))
    )

    if (selectedNode === nodeId) {
      setSelectedNode(null)
    }
  }

  // Update node label
  const updateNodeLabel = (nodeId, newLabel) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId ? { ...node, label: newLabel } : node
    ))
  }

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5))
  const handleZoomReset = () => {
    setZoom(1)
    setPanOffset({ x: 0, y: 0 })
  }

  // Pan controls
  const handleMouseDown = (e) => {
    if (e.target === canvasRef.current || e.target.classList.contains(styles.canvasArea)) {
      setIsPanning(true)
      panStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y }
    }
  }

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  // Draw connections between nodes
  const renderConnections = () => {
    return nodes.map(node => {
      if (!node.parentId) return null
      const parent = nodes.find(n => n.id === node.parentId)
      if (!parent) return null

      const startX = parent.x + 80 // half of node width
      const startY = parent.y + 40 // node height
      const endX = node.x + 80
      const endY = node.y

      // Create a curved path
      const midY = (startY + endY) / 2
      const path = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`

      return (
        <path
          key={`${parent.id}-${node.id}`}
          d={path}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="4 4"
          className={styles.connection}
        />
      )
    })
  }

  return (
    <div className={styles.workspace}>
      {/* Background Decoration */}
      <div className={styles.workspaceBg} aria-hidden="true">
        <div className={`${styles.bgOrb} ${styles['bgOrb--1']}`}></div>
        <div className={`${styles.bgOrb} ${styles['bgOrb--2']}`}></div>
        <div className={`${styles.bgOrb} ${styles['bgOrb--3']}`}></div>
        <div className={styles.bgGrid}></div>
        <div className={styles.bgParticles}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.bgParticle}></div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar
        onAddNode={addNode}
        onDeleteNode={() => selectedNode && deleteNode(selectedNode)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        selectedNode={selectedNode}
        zoom={zoom}
        componentTypes={componentTypes}
      />

      <div className={styles.mainArea}>
        {/* Left Sidebar - Component Palette */}
        <aside 
          className={`${styles.sidebar} ${showSidebar ? styles.open : ''}`}
          aria-label="Component palette"
        >
          <button 
            className={styles.sidebarToggle}
            onClick={() => setShowSidebar(!showSidebar)}
            aria-label={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
          >
            {showSidebar ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          {showSidebar && (
            <div className={styles.sidebarContent}>
              <h3 className={styles.sidebarTitle}>Components</h3>
              <p className={styles.sidebarHint}>Drag to add or click to create</p>
              
              <div className={styles.componentList}>
                {componentTypes.map((type) => (
                  <button
                    key={type.id}
                    className={styles.componentItem}
                    onClick={() => addNode(type.id, selectedNode)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('componentType', type.id)
                    }}
                    style={{ '--component-color': type.color }}
                  >
                    <span className={styles.componentColor}></span>
                    <span>{type.label}</span>
                    <Plus size={16} className={styles.addIcon} />
                  </button>
                ))}
              </div>

              <div className={styles.projectInfo}>
                <h4>Project Info</h4>
                <p><strong>ID:</strong> {projectId || 'New Project'}</p>
                <p><strong>Nodes:</strong> {nodes.length}</p>
                <p><strong>Status:</strong> Draft</p>
              </div>

              <div className={styles.actions}>
                <button className={styles.actionBtn}>
                  <Save size={16} />
                  Save
                </button>
                <button className={styles.actionBtn}>
                  <Download size={16} />
                  Export
                </button>
                <button className={styles.actionBtn}>
                  <Share2 size={16} />
                  Share
                </button>
                <button className={styles.actionBtn}>
                  <Users size={16} />
                  Invite
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* Canvas Area */}
        <div 
          ref={canvasRef}
          className={styles.canvasContainer}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDrop={(e) => {
            e.preventDefault()
            const type = e.dataTransfer.getData('componentType')
            if (type) {
              const rect = canvasRef.current.getBoundingClientRect()
              const x = (e.clientX - rect.left - panOffset.x) / zoom
              const y = (e.clientY - rect.top - panOffset.y) / zoom
              const newId = `node-${Date.now()}`
              setNodes(prev => [...prev, {
                id: newId,
                type,
                label: `New ${componentTypes.find(t => t.id === type)?.label}`,
                x,
                y,
                parentId: null,
                children: []
              }])
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div 
            className={styles.canvasArea}
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            {/* Grid Background */}
            <svg className={styles.grid} width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Connections */}
              <g className={styles.connections}>
                {renderConnections()}
              </g>
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <ComponentNode
                key={node.id}
                node={node}
                isSelected={selectedNode === node.id}
                onSelect={() => handleNodeSelect(node.id)}
                onDrag={handleNodeDrag}
                onDelete={() => deleteNode(node.id)}
                onLabelChange={(label) => updateNodeLabel(node.id, label)}
                color={componentTypes.find(t => t.id === node.type)?.color}
              />
            ))}
          </div>
        </div>

        {/* AI Assistant Panel - Floating & Draggable */}
        <aside 
          className={`${styles.assistantPanel} ${showAssistant ? styles.open : ''} ${assistantMinimized ? styles.minimized : ''} ${assistantPosition.x !== null ? styles.floating : ''}`}
          aria-label="AI Assistant"
          style={assistantPosition.x !== null ? {
            left: assistantPosition.x,
            top: assistantPosition.y,
            right: 'auto',
            bottom: 'auto'
          } : {}}
        >
          {/* Floating toggle button when closed */}
          {!showAssistant && (
            <button 
              className={styles.assistantToggle}
              onClick={() => setShowAssistant(true)}
              aria-label="Show AI assistant"
            >
              <MessageSquare size={20} />
            </button>
          )}

          {showAssistant && (
            <>
              {/* Draggable Header */}
              <div 
                className={styles.assistantHeader}
                onMouseDown={(e) => {
                  if (e.target.closest('button')) return
                  setIsDraggingAssistant(true)
                  const rect = e.currentTarget.closest(`.${styles.assistantPanel}`).getBoundingClientRect()
                  assistantDragRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                  }
                  // Initialize position if not already floating
                  if (assistantPosition.x === null) {
                    setAssistantPosition({ x: rect.left, y: rect.top })
                  }
                }}
                onMouseMove={(e) => {
                  if (isDraggingAssistant) {
                    e.preventDefault()
                    setAssistantPosition({
                      x: Math.max(0, Math.min(window.innerWidth - 380, e.clientX - assistantDragRef.current.x)),
                      y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - assistantDragRef.current.y))
                    })
                  }
                }}
                onMouseUp={() => setIsDraggingAssistant(false)}
                onMouseLeave={() => setIsDraggingAssistant(false)}
              >
                <div className={styles.assistantDragHandle}>
                  <GripVertical size={16} />
                </div>
                <div className={styles.assistantHeaderInfo}>
                  <Bot size={18} />
                  <span>Hexar AI</span>
                </div>
                <div className={styles.assistantControls}>
                  <button 
                    className={styles.assistantControlBtn}
                    onClick={() => setAssistantMinimized(!assistantMinimized)}
                    aria-label={assistantMinimized ? 'Expand' : 'Minimize'}
                  >
                    {assistantMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                  </button>
                  <button 
                    className={styles.assistantControlBtn}
                    onClick={() => {
                      setShowAssistant(false)
                      setAssistantPosition({ x: null, y: null })
                    }}
                    aria-label="Close assistant"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Assistant Content */}
              {!assistantMinimized && (
                <AIAssistant 
                  nodes={nodes}
                  selectedNode={selectedNode ? nodes.find(n => n.id === selectedNode) : null}
                />
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  )
}

export default Workspace
