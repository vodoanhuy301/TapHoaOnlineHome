import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    
    products: [],
    quantity: 0,
    total: 0,
    totalPay: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.amount;
    },
    addAmountProduct: (state, action) => {
      state.products[action.payload].amount++;
      state.total += state.products[action.payload].price;
    },
    reduceAmountProduct: (state, action) => {
      if (state.products[action.payload].amount > 0) {
        state.products[action.payload].amount--;
        state.total -= state.products[action.payload].price;
      }
    },
    removeProduct: (state, action) => {
      state.total -=  state.products[action.payload].price*state.products[action.payload].amount;
      state.quantity--;
      state.products.splice(action.payload,1);
    },
    addTotalPay: (state, action) => {
      state.totalPay = action.payload;
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity =0;
      state.total=0;
      state.totalPay =0;
    },
  },
});
export const {
  addProduct,
  addAmountProduct,
  reduceAmountProduct,
  addTotalPay,
  resetCart,
  removeProduct
} = cartSlice.actions;
export default cartSlice.reducer;
