import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DessertItem from "../../types";

type ProductState = {
  products: DessertItem[]
}

const initialState: ProductState = {
  products: []
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<DessertItem[]>) => {
      state.products = action.payload
    },
  }
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer