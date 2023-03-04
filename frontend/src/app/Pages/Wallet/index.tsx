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
  const [network, setNetwork] = useState('goerli')
  const [user, setUser] = useState({} as any)
  // const navigation = useNavigate()

  // console.log(window.location.pathname.split('/')[2])
  const uId = window.location.pathname.split('/')[3]
  const { data, error } = getUser({ id: { equals: Number(uId) } })
  // console.log("data", data)
  // console.log("uId", uId)

  useEffect(() => {
    if (error) {
      alert(error.message)
      return
    }
    if (data) {
      console.log('data', data)
      setUser(data?.findFirstUser)
    }
  }, [data?.findFirstUser])

  return (
    <>
      <TopNotif Text="👏 🎉 - Congrats! You just received 344.82 $SPORK for creating your Event Wallet!" />
      <TopNav user={(user?.accounts && user?.accounts.find((x: { network: string }) => x.network === network)?.address) || user?.email || uId}
        setNetwork={setNetwork} />
      <BannerImg Img={<img src={EDBannerImg} />} />
      <MainNav network={network} />
      <WalletComp />
    </>
  )
}

export default WalletPage
