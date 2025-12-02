import { Plus, ZoomIn, ZoomOut, Maximize, Trash2, Undo, Redo } from 'lucide-react'
import styles from './Toolbar.module.scss'

/**
 * Toolbar Component
 * Workspace toolbar with canvas controls
 * 
 * @param {Object} props
 * @param {Function} props.onAddNode - Add node handler
 * @param {Function} props.onDeleteNode - Delete node handler
 * @param {Function} props.onZoomIn - Zoom in handler
 * @param {Function} props.onZoomOut - Zoom out handler
 * @param {Function} props.onZoomReset - Reset zoom handler
 * @param {string} props.selectedNode - Currently selected node ID
 * @param {number} props.zoom - Current zoom level
 * @param {Array} props.componentTypes - Available component types
 */
const Toolbar = ({
  onAddNode,
  onDeleteNode,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  selectedNode,
  zoom,
  componentTypes
}) => {
  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Workspace toolbar">
      {/* Add Component */}
      <div className={styles.group}>
        <span className={styles.groupLabel}>Add Component</span>
        <div className={styles.buttons}>
          {componentTypes.slice(0, 3).map((type) => (
            <button
              key={type.id}
              className={styles.btn}
              onClick={() => onAddNode(type.id, selectedNode)}
              title={`Add ${type.label}`}
              style={{ '--btn-color': type.color }}
            >
              <span 
                className={styles.colorDot}
                style={{ background: type.color }}
              ></span>
              <span className={styles.btnLabel}>{type.label}</span>
            </button>
          ))}
          <div className={styles.dropdown}>
            <button className={styles.btn} title="More types">
              <Plus size={16} />
            </button>
            <div className={styles.dropdownContent}>
              {componentTypes.map((type) => (
                <button
                  key={type.id}
                  className={styles.dropdownItem}
                  onClick={() => onAddNode(type.id, selectedNode)}
                >
                  <span 
                    className={styles.colorDot}
                    style={{ background: type.color }}
                  ></span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Actions */}
      <div className={styles.group}>
        <span className={styles.groupLabel}>Actions</span>
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${!selectedNode ? styles.disabled : ''}`}
            onClick={onDeleteNode}
            disabled={!selectedNode}
            title="Delete selected"
          >
            <Trash2 size={16} />
          </button>
          <button
            className={styles.btn}
            title="Undo (Coming soon)"
            disabled
          >
            <Undo size={16} />
          </button>
          <button
            className={styles.btn}
            title="Redo (Coming soon)"
            disabled
          >
            <Redo size={16} />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Zoom Controls */}
      <div className={styles.group}>
        <span className={styles.groupLabel}>Zoom</span>
        <div className={styles.buttons}>
          <button
            className={styles.btn}
            onClick={onZoomOut}
            title="Zoom out"
            disabled={zoom <= 0.5}
          >
            <ZoomOut size={16} />
          </button>
          <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
          <button
            className={styles.btn}
            onClick={onZoomIn}
            title="Zoom in"
            disabled={zoom >= 2}
          >
            <ZoomIn size={16} />
          </button>
          <button
            className={styles.btn}
            onClick={onZoomReset}
            title="Reset view"
          >
            <Maximize size={16} />
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className={styles.spacer}></div>

      {/* Status */}
      <div className={styles.status}>
        {selectedNode ? (
          <span className={styles.selectedInfo}>
            <span className={styles.dot}></span>
            Node selected
          </span>
        ) : (
          <span className={styles.hint}>Click a node to select</span>
        )}
      </div>
    </div>
  )
}

export default Toolbar
