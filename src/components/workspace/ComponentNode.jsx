import { useState, useRef, useEffect } from 'react'
import { GripVertical, Edit2, Trash2, Check, X } from 'lucide-react'
import styles from './ComponentNode.module.scss'

/**
 * ComponentNode Component
 * Draggable node representing a component in the tree
 * 
 * @param {Object} props
 * @param {Object} props.node - Node data
 * @param {boolean} props.isSelected - Whether node is selected
 * @param {Function} props.onSelect - Selection handler
 * @param {Function} props.onDrag - Drag handler
 * @param {Function} props.onDelete - Delete handler
 * @param {Function} props.onLabelChange - Label change handler
 * @param {string} props.color - Node color
 */
const ComponentNode = ({ 
  node, 
  isSelected, 
  onSelect, 
  onDrag, 
  onDelete, 
  onLabelChange,
  color = '#2563EB'
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editLabel, setEditLabel] = useState(node.label)
  const nodeRef = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const inputRef = useRef(null)

  // Focus input when editing
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // Handle drag start
  const handleMouseDown = (e) => {
    if (e.target.closest(`.${styles.actions}`) || isEditing) return
    
    e.stopPropagation()
    setIsDragging(true)
    
    const rect = nodeRef.current.getBoundingClientRect()
    const canvas = nodeRef.current.closest('[class*="canvasArea"]')
    const canvasRect = canvas?.getBoundingClientRect() || { left: 0, top: 0 }
    
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  // Handle drag
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const canvas = nodeRef.current.closest('[class*="canvasArea"]')
      if (!canvas) return
      
      const canvasRect = canvas.getBoundingClientRect()
      const transform = window.getComputedStyle(canvas).transform
      const matrix = new DOMMatrix(transform)
      const scale = matrix.a || 1
      
      const newX = (e.clientX - canvasRect.left - dragOffset.current.x) / scale
      const newY = (e.clientY - canvasRect.top - dragOffset.current.y) / scale
      
      onDrag(node.id, Math.max(0, newX), Math.max(0, newY))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, node.id, onDrag])

  // Handle label save
  const handleLabelSave = () => {
    if (editLabel.trim()) {
      onLabelChange(editLabel.trim())
    } else {
      setEditLabel(node.label)
    }
    setIsEditing(false)
  }

  // Handle label cancel
  const handleLabelCancel = () => {
    setEditLabel(node.label)
    setIsEditing(false)
  }

  // Handle key press in edit mode
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLabelSave()
    } else if (e.key === 'Escape') {
      handleLabelCancel()
    }
  }

  return (
    <div
      ref={nodeRef}
      className={`${styles.node} ${isSelected ? styles.selected : ''} ${isDragging ? styles.dragging : ''}`}
      style={{
        left: node.x,
        top: node.y,
        '--node-color': color
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      role="button"
      tabIndex={0}
      aria-label={`Component: ${node.label}`}
      aria-selected={isSelected}
    >
      {/* Drag Handle */}
      <div className={styles.dragHandle}>
        <GripVertical size={14} aria-hidden="true" />
      </div>

      {/* Node Content */}
      <div className={styles.content}>
        {/* Type Indicator */}
        <span className={styles.typeIndicator}></span>
        
        {/* Label */}
        {isEditing ? (
          <div className={styles.editWrapper}>
            <input
              ref={inputRef}
              type="text"
              className={styles.editInput}
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleLabelSave}
            />
            <button 
              className={styles.editBtn}
              onClick={handleLabelSave}
              aria-label="Save"
            >
              <Check size={14} />
            </button>
            <button 
              className={styles.editBtn}
              onClick={handleLabelCancel}
              aria-label="Cancel"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <span className={styles.label}>{node.label}</span>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={(e) => {
            e.stopPropagation()
            setIsEditing(true)
          }}
          aria-label="Edit label"
        >
          <Edit2 size={14} />
        </button>
        <button
          className={styles.actionBtn}
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          aria-label="Delete node"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Connection Point (bottom) */}
      <div className={styles.connectionPoint} aria-hidden="true"></div>
    </div>
  )
}

export default ComponentNode
