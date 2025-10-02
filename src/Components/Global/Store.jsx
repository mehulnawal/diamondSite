import { configureStore } from "@reduxjs/toolkit";
import ThemeSliceReducer from './Slice/ThemeSlice'

export const Store = configureStore({
    reducer: {
        themeSlice: ThemeSliceReducer
    }
})