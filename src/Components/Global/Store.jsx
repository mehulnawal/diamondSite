import { configureStore } from "@reduxjs/toolkit";
import ThemeSliceReducer from './Slice/ThemeSlice'
import ProductSliceReducer from './Slice/ProductsSlice'

export const Store = configureStore({
    reducer: {
        themeSlice: ThemeSliceReducer,
        productSlice: ProductSliceReducer
    }
})