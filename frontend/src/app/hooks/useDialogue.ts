import swal from 'sweetalert'
import { toast } from 'react-toastify'

export default function useDialog () {
  const createSuccess = () => {
    swal('', {
      title: 'Your clean request is pending.',
      text: "Thank you for being awesome! I'll talk to you soon. Meanwhile, please check your email for a message from me. Have a great day!",
      icon: 'success',
      buttons: ['', 'check your email']
    })
      .then(() => {
        toast.success('Your clean request is pending \n check your email')
      })
      .catch(() => {
        alert('Something went wrong. Please try again.')
      })
  }
  return {
    createSuccess
  }
}
