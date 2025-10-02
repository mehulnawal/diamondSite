import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
    name: 'ThemeSlice',
    initialState: {
        value: 'dark'
    },
    reducers: {
        themeToggle: (state) => {
            state.value = state.value == 'dark' ? 'light' : 'dark';
        }
    }
})

export const { themeToggle } = ThemeSlice.actions;
export default ThemeSlice.reducer;