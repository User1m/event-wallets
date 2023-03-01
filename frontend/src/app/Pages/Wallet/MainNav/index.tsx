import React, { useState } from 'react'
import NavItem from './NavItem'
import { ReactComponent as ArrowDown } from './icons/arrowDown.svg'
import { ReactComponent as ArrowUp } from './icons/arrowUp.svg'
import { ReactComponent as Money } from './icons/money.svg'
import { ReactComponent as Connect } from './icons/qr.svg'
import { ReactComponent as Notif } from './icons/notif.svg'
import Modal from '../walletModal'
import SendModal from '../ModalContent/send'
import FundModal from '../ModalContent/fund'

interface NavItemDict {
  label: string
  icon: JSX.Element
  modalContent?: JSX.Element
}

const navItems: NavItemDict[] = [
  { label: 'Send', icon: <ArrowUp />, modalContent: <SendModal /> },
  { label: 'Receive', icon: <ArrowDown /> },
  { label: 'Fund', icon: <Money />, modalContent: <FundModal /> },
  { label: 'Connect', icon: <Connect /> },
  { label: 'Notifications', icon: <Notif /> }
]

function MainNav () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<JSX.Element>()

  const handleNavItemClick = (modalContent: JSX.Element) => {
    setIsModalOpen(true)
    setModalContent(modalContent)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(<></>)
  }

  return (
    <>
      <div className="nav">
        {navItems.map((navItem) => {
          return (
            <div
              className="navBtn"
              key={navItem.label}
              onClick={() =>
                handleNavItemClick(
                  navItem.modalContent ? navItem.modalContent : <></>
                )
              }
            >
              <NavItem Icon={navItem.icon} Text={navItem.label} />
            </div>
          )
        })}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </>
  )
}

export default MainNav
