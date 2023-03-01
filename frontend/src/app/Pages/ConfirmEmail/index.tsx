import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmEmail = () => {
  const [uId, setUID] = useState('')
  const confirmEmailRef = useRef<HTMLAnchorElement>(null)
  const pathSplit = window.location.pathname.split('/')
  const email = pathSplit[3]

  useEffect(() => {
    // console.log('pathSplit', pathSplit.length)
    if (pathSplit[2] !== 'emailConf') {
      setUID(pathSplit[2])
    }
    const confirmEmailTimer = setTimeout(() => {
      if (confirmEmailRef.current) {
        confirmEmailRef.current.click()
      }
    }, 2000)
    return () => clearTimeout(confirmEmailTimer)
  }, [])

  return (
    <div className="confirmEmail">
      <div className="container">
        <a
          href={
            uId
              ? window.location.href.replace('confirm', 'wallet')
              : `https://www.${email.split('@')[1]}`
          }
          rel="noreferrer"
          ref={confirmEmailRef}
        >
          {uId
            ? 'Creating your event wallet....'
            : 'Go to your email to confirm your event wallet!'}
        </a>
        <div className="subText">This page will redirect in 2 seconds...</div>
      </div>
    </div>
  )
}

export default ConfirmEmail
