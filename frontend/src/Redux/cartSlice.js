import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProducts"))
    : [],
  selectedProductsID: localStorage.getItem("selectedProductsID")
    ? JSON.parse(localStorage.getItem("selectedProductsID"))
    : [],
};
export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // state.value += action.payload
      const productWithQuantity={...action.payload,"Quantity":1}
      state.selectedProducts.push(productWithQuantity)
      state.selectedProductsID.push(action.payload.id)
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
      localStorage.setItem("selectedProductsID",JSON.stringify(state.selectedProductsID))
    },
    increaseQuantity: (state, action) => {
      // state.value += action.payload
      const incresedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload.id
      })
      incresedProduct.Quantity += 1
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
    decreaseQuantity: (state, action) => {
      const decreasedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload.id

      })
      decreasedProduct.Quantity -=1
      if (decreasedProduct.Quantity === 0) {
         // delete the selected product
        const newArr = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id;
        });
        const newArr2 = state.selectedProductsID.filter((item) => {
          return item !== action.payload.id;
        });
        state.selectedProducts = newArr;
        state.selectedProductsID = newArr2;
      localStorage.setItem("selectedProductsID" , JSON.stringify(state.selectedProductsID))
      }
      localStorage.setItem("selectedProducts" , JSON.stringify(state.selectedProducts))
    },
    deleteProduct: (state, action) => {
       // delete the selected product
      const newArr = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id;
      });
      const newArr2 = state.selectedProductsID.filter((item) => {
        return item !== action.payload.id;
      });
      state.selectedProducts = newArr;
      state.selectedProductsID = newArr2;
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
      localStorage.setItem("selectedProductsID",JSON.stringify(state.selectedProductsID))
    },
  },
})
// Action creators are generated for each case reducer function
export const { addToCart , increaseQuantity , decreaseQuantity , deleteProduct } = counterSlice.actions
export default counterSlice.reducer