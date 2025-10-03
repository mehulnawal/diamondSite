import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState: {
        products: [
            { "id": "1", "productName": "Diamond Solitaire Ring", "price": 1200 },
            { "id": "2", "productName": "Princess Cut Earrings", "price": 850 },
            { "id": "3", "productName": "Round Cut Necklace", "price": 1500 },
            { "id": "4", "productName": "Emerald Cut Bracelet", "price": 950 },
            { "id": "5", "productName": "Cushion Cut Pendant", "price": 700 },
            { "id": "6", "productName": "Oval Diamond Ring", "price": 1300 },
            { "id": "7", "productName": "Halo Engagement Ring", "price": 1800 },
            { "id": "8", "productName": "Vintage Diamond Earrings", "price": 900 },
            { "id": "9", "productName": "Tennis Bracelet", "price": 1400 },
            { "id": "10", "productName": "Pear Cut Pendant", "price": 750 },
            { "id": "11", "productName": "Marquise Ring", "price": 1250 },
            { "id": "12", "productName": "Cluster Earrings", "price": 800 },
            { "id": "13", "productName": "Infinity Necklace", "price": 1100 },
            { "id": "14", "productName": "Bezel Set Ring", "price": 950 },
            { "id": "15", "productName": "Three Stone Ring", "price": 1600 },
            { "id": "16", "productName": "Diamond Stud Earrings", "price": 700 },
            { "id": "17", "productName": "Solitaire Pendant", "price": 1200 },
            { "id": "18", "productName": "Vintage Ring", "price": 1350 },
            { "id": "19", "productName": "Halo Pendant", "price": 1000 },
            { "id": "20", "productName": "Classic Diamond Band", "price": 900 }
        ],
        addToCartArray: JSON.parse(localStorage.getItem("AddToCart")) || [],
        addToWishListArray: JSON.parse(localStorage.getItem("AddToWishList")) || [],
    },
    reducers: {
        showProducts: (state) => {
            return state
        },
        deleteProducts: (state, action) => {
            state.products = state.products.filter(v => v.id != action.payload);
        },
        addToWishListProducts: (state, action) => {
            state.addToWishListArray.push(action.payload);
            localStorage.setItem("AddToWishList", JSON.stringify(state.addToWishListArray));
        },
        addToCartProducts: (state, action) => {
            state.addToCartArray.push(action.payload);
            localStorage.setItem("AddToCart", JSON.stringify(state.addToCartArray));
        },
    }
})

export const { showProducts, deleteProducts, addToWishListProducts, addToCartProducts } = ProductSlice.actions;
export default ProductSlice.reducer