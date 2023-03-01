import React, { useEffect, useState } from 'react'
import MainNav from './MainNav'
import TopNotif from './topNotif'
import BannerImg from './bannerImg'
import EDBannerImg from '../../../static/img/ed.png'
import WalletComp from './Wallet'
import TopNav from './topNav'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CREATE_WALLET } from 'src/graphql/mutations'
import { getUser } from 'src/graphql/queries'

const WalletPage = () => {
  const [ballance, setBallance] = useState('')
  const [user, setUser] = useState({ email: null, accAddress: null })
  const [confirmUser, { loading }] = useMutation(CREATE_WALLET)
  // const navigation = useNavigate()

  // console.log(window.location.pathname.split('/')[2])
  const uId = window.location.pathname.split('/')[3]
  const { data, error } = getUser({ id: { equals: uId } })
  // console.log("data", data)
  // console.log("uId", uId)

  useEffect(() => {
    if (error) {
      toast.error(error.message)
      return
    }
    if (data) {
      console.log('data', data)
      setUser(data?.findFirstUser)
      if (data?.findFirstUser?.accAddress === '') {
        confirmUser({
          variables: {
            input: {
              id: uId
            }
          },
          onCompleted (data) {
            console.log('_data', data)
            setUser(data?._confirmUser)
          },
          onError (error) {
            console.log(error)
            toast.error(error?.message)
          }
        })
      }
    }
  }, [])

  return (
    <>
      <TopNotif Text="👏 🎉 - Congrats! You just received 344.82 $SPORK for creating your Event Wallet!" />
      <TopNav user={user?.accAddress || user?.email || uId} />
      <BannerImg Img={<img src={EDBannerImg} />} />
      <MainNav />
      <WalletComp />
    </>
  )
}

export default WalletPage
