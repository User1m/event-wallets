import React, { useEffect, useState } from 'react'
import MainNav from './MainNav'
import TopNotif from './topNotif'
import BannerImg from './bannerImg'
import EDBannerImg from '../../../static/img/ed.png'
import WalletComp from './Wallet'
import TopNav from './topNav'
import { toast } from 'react-toastify'
import { getUser } from 'src/graphql/queries'

const WalletPage = () => {
  // const [balance, setBalance] = useState('')
  const [user, setUser] = useState({ email: null, accAddress: null })
  // const navigation = useNavigate()

  // console.log(window.location.pathname.split('/')[2])
  const uId = window.location.pathname.split('/')[3]
  const { data, error } = getUser({ id: { equals: uId } })
  // console.log("data", data)
  // console.log("uId", uId)

  useEffect(() => {
    if (error) {
      alert(error.message)
      return
    }
    if (data) {
      // console.log('data', data)
      setUser(data?.findFirstUser)
    }
  }, [data?.findFirstUser])

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
