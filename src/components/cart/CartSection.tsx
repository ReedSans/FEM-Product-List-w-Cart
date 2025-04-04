import FilledCart from "./FilledCart"
import EmptyCart from "./EmptyCart"
import { useState } from "react"
import CheckoutModal from "./CheckoutModal"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const CartSection = () => {
  const cart = useSelector((state: RootState) => state.cart.cartItems)
  const [modalstate, setModalState] = useState(false)

  const openModal = () => {
    setModalState(true)
  }
  
  const closeModal = () => {
    setModalState(false)
  }

  return (
    <div className="flex-grow">
      {cart.length > 0 ? (
        <FilledCart openModal={openModal} />
      ) : (
        <EmptyCart />
      )}
      {modalstate && <CheckoutModal closeModal={closeModal} />}
    </div>
  )
}

export default CartSection