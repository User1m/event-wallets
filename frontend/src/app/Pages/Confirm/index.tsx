import { useMutation } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from 'src/graphql/queries'
import { toast } from 'react-toastify'
import { CREATE_WALLET } from 'src/graphql/mutations'

const ConfirmPage = () => {
  const confirmEmailRef = useRef<HTMLAnchorElement>(null)

  const path = window.location.pathname
  const isConfirm = path.includes('/confirm')
  const isEmail = path.includes('/emailConf')
  const isTransfer = path.includes('/transfer')

  const pathSplit = path.split('/')
  const [email, setEmail] = useState(isConfirm ? pathSplit[3] : '')
  const { data, error } = getUser({ id: { equals: pathSplit[3] || '' } })
  const [confirmUser, { loading }] = useMutation(CREATE_WALLET)

  // console.log("pathSplit", pathSplit[3])
  // console.log("email", email)
  // console.log("data", data)

  useEffect(() => {
    if (data?.findFirstUser) {
      setEmail(data.findFirstUser?.email)
      if (data?.findFirstUser?.accAddress === '') {
        confirmUser({
          variables: {
            input: {
              id: data?.findFirstUser.id
            }
          },
          onCompleted (data) {
            console.log('_data', data)
            toast.success('Wallet Created!')
            // setUser(data?._confirmUser)
          },
          onError (error) {
            console.log(error)
            alert(error?.message)
          }
        })
      }
    }
    const confirmEmailTimer = setTimeout(() => {
      if (confirmEmailRef.current) {
        confirmEmailRef.current.click()
      }
    }, 3000)
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
          {isEmail
            ? 'Go to your email to confirm your event wallet!'
            : isConfirm
              ? 'Creating your event wallet....'
              : isTransfer
                ? 'Transfer initiated....'
                : ''}
        </a>
        <div className="subText">This page will redirect in 3 seconds...</div>
      </div>
    </div>
  )
}

export default ConfirmPage
