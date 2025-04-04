import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DessertItem, { CartItem } from "../../types";

type CartState = {
  cartItems: CartItem[],
  totalQuantity: number,
  totalPrice: number
}

const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<DessertItem>) => {
      const item = action.payload
      const foundItem = state.cartItems.find(cartItem => cartItem.name === item.name)

      if (!foundItem) {
        const newCartItem: CartItem = {
          ...item,
          quantity: 1,
          totalPrice: item.price,
        }
        state.cartItems.push(newCartItem)
      } else {
        foundItem.quantity ++
        foundItem.totalPrice += item.price
      }
      state.totalQuantity ++
      state.totalPrice += item.price
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const dessertName = action.payload
      const foundItem = state.cartItems.find(cartItem => cartItem.name === dessertName)

      if (foundItem) {
        state.totalQuantity -= foundItem.quantity
        state.totalPrice -= foundItem.totalPrice
        state.cartItems = state.cartItems.filter(cartItem => cartItem.name !== foundItem.name)
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const dessertName = action.payload
      const foundItem = state.cartItems.find(cartItem => cartItem.name === dessertName)
      
      if (foundItem) {
        foundItem.quantity++
        state.totalQuantity++
        foundItem.totalPrice += foundItem.price
        state.totalPrice += foundItem.price
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const dessertName = action.payload
      const foundItem = state.cartItems.find(cartItem => cartItem.name === dessertName)
      
      if(foundItem){
        if (foundItem?.quantity > 1) {
          foundItem.quantity--
          state.totalQuantity--
          foundItem.totalPrice -= foundItem.price
          state.totalPrice -= foundItem.price
        } else {
          state.totalQuantity -= foundItem.quantity
          state.totalPrice -= foundItem.totalPrice
          state.cartItems = state.cartItems.filter(cartItem => cartItem.name !== foundItem.name)
        }
      }      
    },
  }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer