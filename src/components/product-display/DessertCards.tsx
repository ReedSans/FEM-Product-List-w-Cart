import DessertItem from "../../types.ts";
import DecrementButton from "./DecrementButton.tsx";
import IncrementButton from "./IncrementButton.tsx";
import CartIcon from "../cart/CartIcon.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store.ts";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/slices/cartSlice.ts";

const DessertCards = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const cart = useSelector((state: RootState) => state.cart.cartItems);

  const DessertCard = ({ dessert }: { dessert: DessertItem }) => {
    const dispatch = useDispatch();
    const foundItem = cart.find(cartItem => cartItem.name === dessert.name)

    return (
      <div className="flex flex-col gap-9">
        <div className="relative ">
          <img
            src={dessert.image?.desktop}
            alt="Product"
            className={`hidden md:block size-56 rounded-xl ${
              foundItem ? "border-2 border-priColor" : ""
            }`}
          />
          <img
            src={dessert.image?.mobile}
            alt="Product"
            className={`block md:hidden rounded-md ${
              foundItem ? "border-2 border-priColor" : ""
            }`}
          />
          {!foundItem && (
            <button className="py-2 px-5 absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] bg-white border rounded-full flex justify-between w-36 text-[14px] font-medium" onClick={() => dispatch(addToCart(dessert))}>
              <CartIcon />
              Add to Cart
            </button>
          )}
          {foundItem && (
            <span className="py-2 px-5 absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] bg-priColor border rounded-full flex justify-between w-36 text-[14px] font-medium">
              <DecrementButton dessert={dessert} />
              {foundItem.quantity}
              <IncrementButton dessert={dessert} />
            </span>
          )}
        </div>
        <div>
          <p className="text-xs text-sand font-normal">{dessert.category}</p>
          <p className="text-burnt font-semibold">{dessert.name}</p>
          <p className="text-priColor font-semibold">
            ${dessert.price.toFixed(2)}
          </p>
        </div>
      </div>
    );
  };

  return products.map((product, index) => (
    <DessertCard key={index} dessert={product} />
  ));
};

export default DessertCards;
