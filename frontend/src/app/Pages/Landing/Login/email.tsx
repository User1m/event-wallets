import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { CREATE_USER } from 'src/graphql/mutations'
// import { toast } from 'react-toastify'

const Email = () => {
  const [email, setEmail] = useState('')
  const [createUser, { loading }] = useMutation(CREATE_USER)
  // const navigation = useNavigate()

  // console.log('window.location', window.location)

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    // console.log("here")
    e.preventDefault()
    if (email === '') {
      return
    }
    if (!navigator.onLine) {
      alert('Network error')
      return
    }
    const pathSplit = window.location.pathname.split('/')
    const eventSlug = pathSplit[1]
    const input = { email, eventSlug }
    // console.log('input', input)

    createUser({
      variables: {
        input
      },
      onCompleted (data) {
        // console.log('data', data)
        if (data) {
          // navigation(`${orgId}/emailConf/${email}`)
          window.location.href = window.location.href.replace(
            `/${eventSlug}`,
            `/${eventSlug}/emailConf/${email}`
          )
        }
      },
      onError (error) {
        console.log(error)
        alert(error?.message)
      }
    })
  }

  return (
    <div className="email">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
      />
      <div className="authBtn">
        <a href="" onClick={onSubmit}>
          Sign in With Email
        </a>
      </div>
    </div>
  )
}

export default Email
