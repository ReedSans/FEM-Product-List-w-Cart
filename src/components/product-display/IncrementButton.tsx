import DessertItem from "../../types";
import { useDispatch } from "react-redux";
import { increaseQuantity } from "../../state/slices/cartSlice";

type IncrementButtonProps = {
  dessert: DessertItem;
};

const IncrementButton = ({ dessert }: IncrementButtonProps) => {
  const dispatch = useDispatch();

  return (
    <button
      className="border border-white hover:border-priColor bg-priColor hover:bg-white hover:stroke-priColor rounded-full px-[4px] transition-all duration-300 ease-in-out"
      onClick={() => dispatch(increaseQuantity(dessert.name))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="none"
        viewBox="0 0 10 10"
      >
        <path
          fill="#fff"
          d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
        />
      </svg>
    </button>
  );
};

export default IncrementButton;
