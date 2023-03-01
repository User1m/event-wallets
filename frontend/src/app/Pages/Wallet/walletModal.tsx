import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal ({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modalWrapper">
      <div className="modalOverlay" onClick={onClose}></div>
      <div className="modalContent">
        <div className="modalHeader">
          <button className="modalCloseButton" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  )
}

export default Modal
