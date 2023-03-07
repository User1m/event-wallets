import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TRANSFER_AMOUNT, TRANSFER_OWNER } from 'src/graphql/mutations'
import { getUser } from 'src/graphql/queries'

const navItems: string[] = ['Send', 'Transfer Owner']
interface PropType {
  network?: string
}

const SendModal = (props: PropType) => {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0])
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [transferAmount, { loading }] = useMutation(TRANSFER_AMOUNT)
  const [transferOWner] = useMutation(TRANSFER_OWNER)
  // const navigation = useNavigate()

  const pathSplit = window.location.pathname.split('/')
  const orgId = pathSplit[1]
  const uId = pathSplit[3]

  const { data, error } = getUser({ id: { equals: uId } })
  // console.log("data", data)
  // console.log("uId", uId)

  useEffect(() => {
    if (error) {
      alert(error.message)
      // return;
    }
    // if (data) {
    //   console.log('data', data)
    //   setUser(data?.findFirstUser)
    // }
    // console.log('net', props.network)
  }, [])
  // console.log('window.location', window.location)

  const onSubmitTransfer = async (e: React.MouseEvent<HTMLElement>) => {
    // console.log("here")
    // e.preventDefault()

    const input = {
      email: data?.findFirstUser?.email,
      orgId,
      toAddress: address,
      amount,
      network: props.network
    }
    // console.log('input', input)
    transferAmount({
      variables: {
        input
      },
      onCompleted (data) {
        // console.log('_data', data)
        if (data) {
          alert(data._transfer)
          window.location.href = window.location.href.replace(
            'wallet',
            'transfer'
          )
        }
      },
      onError (error) {
        // console.log('error', error)
        alert(error?.message)
      }
    })
  }

  const onSubmitTransferOwner = async (e: React.MouseEvent<HTMLElement>) => {
    // console.log("here")
    // e.preventDefault()

    const input = {
      id: data?.findFirstUser?.id,
      orgId,
      toAddress: address,
      network: props.network
    }
    // console.log('input', input)
    transferOWner({
      variables: {
        input
      },
      onCompleted (data) {
        // console.log('_data', data)
        if (data) {
          alert(data._transfer)
          window.location.href = window.location.href.replace(
            'wallet',
            'transfer'
          )
        }
      },
      onError (error) {
        // console.log('error', error)
        alert(error?.message)
      }
    })
  }

  const handleNavItemClick = (navItem: string) => {
    setActiveNavItem(navItem)
  }

  return (
    <div className="sendModal">
      <div className="mainNav">
        {navItems.map((navItem) => (
          <div
            className={`navItem ${
              navItem === activeNavItem ? 'navItemActive' : ''
            }`}
            key={navItem}
            onClick={() => handleNavItemClick(navItem)}
          >
            {navItem}
          </div>
        ))}
      </div>
      <div className="divider"></div>
      {activeNavItem === navItems[0] && (
        <>
          <div className="field">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              id="address"
              placeholder="Address (0x32cAE5a...)"
            />
          </div>
          <div className="field">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount of ETH (0.000001)"
              name="amount"
              id="amount"
            />
          </div>
          <div className="sendBtn" onClick={onSubmitTransfer}>
            Send
          </div>
        </>
      )}
      {activeNavItem === navItems[1] && (
        <>
          <div className="field">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              id="address"
              placeholder="New Owner (0x32cAE5a...)"
            />
          </div>
          {/* <div className="field">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount of ETH (0.000001)"
              name="amount"
              id="amount"
            />
          </div> */}
          <div className="sendBtn" onClick={onSubmitTransferOwner}>
            Transfer
          </div>
        </>
      )}
    </div>
  )
}

export default SendModal
