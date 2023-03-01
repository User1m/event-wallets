import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CREATE_USER } from 'src/graphql/mutations'
import { toast } from 'react-toastify'

const Email = () => {
  const [email, setEmail] = useState('')
  const [createUser, { loading }] = useMutation(CREATE_USER)
  const navigation = useNavigate()

  const onSubmit = async () => {
    if (email === '') {
      return
    }
    if (!navigator.onLine) {
      toast.error('Network error')
      return
    }
    const orgId = window.location.pathname.split('/')[1]
    createUser({
      variables: {
        input: {
          email,
          orgId
        }
      },
      onCompleted (data) {
        console.log('data', data)
        if (data) {
          navigation(`${orgId}/emailConf`)
        }
      },
      onError (error) {
        console.log(error)
        toast.error(error?.message)
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
        <a href="emailConf" onClick={onSubmit}>
          Sign in With Email
        </a>
      </div>
    </div>
  )
}

export default Email
