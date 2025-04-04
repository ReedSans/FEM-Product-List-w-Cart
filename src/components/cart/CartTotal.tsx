import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'

const CartTotal = () => {
  const cartTotal = useSelector((state: RootState) => state.cart.totalPrice)
  return (
    <div className='py-6 flex justify-between items-center'>
      <span className='text-xs xl:text-base text-clay font-medium'>Order Total</span>
      <span className='text-xl xl:text-2xl font-bold'>${cartTotal.toFixed(2)}</span>
    </div>
  )
}

export default CartTotal