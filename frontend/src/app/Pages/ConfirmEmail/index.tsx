import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from 'src/graphql/queries'

const ConfirmEmail = () => {
  const confirmEmailRef = useRef<HTMLAnchorElement>(null)
  const pathSplit = window.location.pathname.split('/')
  const [email, setEmail] = useState(
    pathSplit[2] === 'emailConf' ? pathSplit[3] : ''
  )
  const { data, error } = getUser({ id: { equals: pathSplit[3] || '' } })

  // console.log("pathSplit", pathSplit[3])
  // console.log("email", email)
  // console.log("data", data)

  useEffect(() => {
    if (data?.findFirstUser) {
      setEmail(data.findFirstUser?.email)
    }
    const confirmEmailTimer = setTimeout(() => {
      if (confirmEmailRef.current) {
        confirmEmailRef.current.click()
      }
    }, 2000)
    return () => clearTimeout(confirmEmailTimer)
  }, [data?.findFirstUser])

  return (
    <div className="confirmEmail">
      <div className="container">
        <a
          href={
            // data?.findFirstUser
            //   ? window.location.href.replace('confirm', 'wallet')
            //   :
            `https://www.${email.split('@')[1]}`
          }
          rel="noreferrer"
          ref={confirmEmailRef}
        >
          {data?.findFirstUser
            ? 'Creating your event wallet....'
            : 'Go to your email to confirm your event wallet!'}
        </a>
        <div className="subText">This page will redirect in 2 seconds...</div>
      </div>
    </div>
  )
}

export default ConfirmEmail
