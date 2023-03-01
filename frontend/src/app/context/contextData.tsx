import React, { useState } from 'react'
import { ContextStore } from '@app/context/contextStore'
import { useLocation } from 'react-router-dom'

interface FormDataProps {
  children: React.ReactNode
}

const FormDataProvider = ({ children }: FormDataProps) => {
  const [nextForm, setNextForm] = useState(1)
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [usernameEntered, setUsernameEntered] = useState('')
  const [instantQuote, setInstantQuote] = useState<number>(1)
  const [estimateCostModal, setEstimateCostModal] = useState(false)
  const [bookCleanModal, setBookCleanModal] = useState(false)
  const [clientDetail, setClientDetail] = useState({})
  const [cleanCost, setCleanCost] = useState(null)
  const [cleanerDetail, setCleanerDetail] = useState({})
  const [quoteFormData, setQuoteFormData] = useState({
    // step-1
    serviceCategory: '',
    cleanFrequency: 'DAILY',
    zip: '',
    numOfBedrooms: 1,
    numOfBathrooms: 0.5,
    kitchen: 1,

    // step-2
    squareFeet: 'SQF_500',
    floors: 1,
    woodLamVinyl: false,
    tileMarbStone: false,
    carpet: false,
    parkingSpace: false,

    // step-3
    numOfCats: 0,
    numOfDogs: 0,
    otherPets: '',

    // step-4
    dishes: false,
    refrigerator: false,
    oven: false,
    cabinets: false,
    laundryLoad: 0,
    instructions: '',

    // step-5 add contacts
    title: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  })

  const [contactInfo, setContactInfo] = useState({
    title: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  })
  const getLastLink = () => {
    const location = useLocation()
    const path = location.pathname
    const getLink = path.split('/')
    const getLastLink = getLink[getLink.length - 1]
    return getLastLink
  }

  const value = {
    nextForm,
    setNextForm,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    usernameEntered,
    setUsernameEntered,
    instantQuote,
    setInstantQuote,
    quoteFormData,
    setQuoteFormData,
    contactInfo,
    setContactInfo,
    estimateCostModal,
    setEstimateCostModal,
    bookCleanModal,
    setBookCleanModal,
    clientDetail,
    setClientDetail,
    cleanCost,
    setCleanCost,
    getLastLink,
    cleanerDetail,
    setCleanerDetail
  }

  return (
    <ContextStore.Provider value={value}>{children}</ContextStore.Provider>
  )
}

export default FormDataProvider
