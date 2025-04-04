import { CartItem } from '../../types'

type CheckoutItemProps = {
  cartItem: CartItem
}

const CheckoutItem = ({cartItem}: CheckoutItemProps) => {
  return (
    <>
      <li className="py-4 border-b flex justify-between items-center">
        <div className='flex gap-2 items-center'>
          <img src={cartItem.image.thumbnail} alt="" className='size-[60px] rounded-md' />
          <div>
            <p className="text-sm text-burnt font-semibold mb-2">{cartItem.name}</p>
            <p className="flex gap-2">
              <span className="text-sm text-priColor font-medium mr-3">{cartItem.quantity}x</span>
              <span className="text-sm text-terracotta font-medium">@&nbsp;${cartItem.price.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <span className='text-burnt font-semibold'>
          ${(cartItem.price * cartItem.quantity).toFixed(2)}
        </span>
      </li>
    </>
  )
}

export default CheckoutItem