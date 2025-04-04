import DessertItem from "../../types";
import { useDispatch } from "react-redux";
import { decreaseQuantity } from "../../state/slices/cartSlice";

type DecrementButtonProps = {
  dessert: DessertItem;
};

const DecrementButton = ({ dessert }: DecrementButtonProps) => {
  const dispatch = useDispatch();

  return (
    <button
      className="border border-white hover:border-priColor bg-priColor hover:bg-white hover:stroke-priColor rounded-full px-[4px] transition-all duration-300 ease-in-out"
      onClick={() => dispatch(decreaseQuantity(dessert.name))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="2"
        fill="none"
        viewBox="0 0 10 2"
      >
        <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
      </svg>
    </button>
  );
};

export default DecrementButton;
