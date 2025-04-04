import { useSelector } from 'react-redux'
import SingleItem from '../SingleItem'
import CarbonNeutral from './CarbonNeutral'
import CartTotal from './CartTotal'
import { RootState } from '../../state/store'


type FilledCartProps = {
  openModal: () => void
}


const FilledCart = ({openModal}: FilledCartProps) => { 
  const cart = useSelector((state: RootState) => state.cart.cartItems)
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity)

  return (
    <div className="px-6 pb-6 pt-5 bg-white rounded-lg">
      <h2 className="text-xl md:text-2xl text-priColor font-bold self-start">Your Cart ({cartQuantity})</h2>
      <div>
        <ul className='max-h-64 overflow-auto hide-scrollbar'>
          {cart.map(cartItem => (<SingleItem cartItem={cartItem} />))}
        </ul>
        <CartTotal />
      </div>
      <CarbonNeutral />
      <button className=' py-4 w-full bg-priColor hover:bg-priDark font-medium text-accent rounded-full transition-all duration-300 ease-in-out' 
      onClick={openModal}>Confirm Order</button>
    </div>
  )
}

export default FilledCart