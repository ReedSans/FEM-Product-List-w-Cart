import { useSelector } from 'react-redux'
import Checkmark from '../order-confirmation/Checkmark'
import CheckoutItem from '../order-confirmation/CheckoutItem'
import CartTotal from './CartTotal'
import { RootState } from '../../state/store'

type CheckoutModalProps = {
  closeModal: () => void
}

const CheckoutModal = ({closeModal}: CheckoutModalProps) => {
  const cart = useSelector((state: RootState) => state.cart.cartItems)

  return (
    <div className='fixed inset-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[44%] md:-translate-y-1/2 w-screen md:w-[464px] max-h-[90vh] overflow-auto flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg'>
        <div className='py-2 mb-4 mt-20 md:mt-0'>
          <Checkmark />
          <h1 className='text-4xl font-bold text-burnt mb-3'>Order Confirmed</h1>
          <p className='text-terracotta'>We hope you enjoy your food!</p>
        </div>
        <div className='px-5 py-2 bg-accent mb-8'>
          <ul className='max-h-48 overflow-auto hide-scrollbar'>
            {cart.map(cartItem => (<CheckoutItem cartItem={cartItem} />))}
          </ul>
          <CartTotal />
        </div>
        <button className=' py-4 w-full bg-priColor hover:bg-priDark font-medium text-accent rounded-full transition-all duration-300 ease-in-out' 
        onClick={closeModal}  >Start New Order</button>
      </div>
    </div>
  )
}

export default CheckoutModal