import { removeFromCart } from "../state/slices/cartSlice";
import { CartItem } from "../types";
import { useDispatch } from 'react-redux'


type SingleItemProps = {
  cartItem: CartItem
}

const SingleItem = ({cartItem}: SingleItemProps) => {
  const dispatch = useDispatch()

  return (
    <li className="py-4 border-b flex justify-between items-center">
      <div>
        <p className="text-sm text-burnt font-semibold mb-2">{cartItem.name}</p>
        <p className="flex gap-2">
          <span className="text-xs md:text-sm text-priColor font-medium mr-3">{cartItem.quantity}x</span>
          <span className="text-xs md:text-sm text-terracotta font-normal">@&nbsp;${cartItem.price.toFixed(2)}</span>
          <span className="text-xs md:text-sm text-clay font-medium">
            ${(cartItem.price * cartItem.quantity).toFixed(2)}
          </span>
        </p>
      </div>
      <button className="group border-2 border-sand hover:border-clay rounded-full p-[2px] transition-all duration-300 ease-in-out" onClick={() => dispatch(removeFromCart(cartItem.name))}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
        >
          <path
            fill=""
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
            className="fill-sand group-hover:fill-clay transition-all duration-300 ease-in-out"
          />
        </svg>
      </button>
    </li>
  );
};

export default SingleItem;
