import { createSlice } from "@reduxjs/toolkit";


const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        isSide: false,
        admin: JSON.parse(localStorage.getItem('admin')) || null,
        products: JSON.parse(localStorage.getItem('products')) || [],
        employees: [],
    },
    reducers: {
        handleSide: (state, action) => {
            state.isSide = (action.payload || !state.isSide)
        },
        handleAdmin: (state, action) => {
            state.admin = action.payload
            localStorage.setItem('admin', JSON.stringify(action.payload))
        },
        handleProducts: (state, action) => {
            state.products = action.payload
            localStorage.setItem('products', JSON.stringify(action.payload))
        },
        handleEmployees: (state, action) => {
            state.employees = action.payload
        }
    }
})


const appReducer = appSlice.reducer
const { handleSide, handleAdmin, handleProducts, handleEmployees } = appSlice.actions

export { appReducer, handleSide, handleAdmin, handleProducts, handleEmployees }