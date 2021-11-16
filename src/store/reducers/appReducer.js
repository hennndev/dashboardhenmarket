import { createSlice } from "@reduxjs/toolkit";


const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        isSide: false,
        admin: JSON.parse(localStorage.getItem('admin')) || null,
        products: JSON.parse(localStorage.getItem('products')) || [],
        employees: [],
        transactions: JSON.parse(localStorage.getItem('transactions')) || [],
        members: JSON.parse(localStorage.getItem('members')) || []
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
        },
        handleTransactions: (state, action) => {
            const formatTransactions = action.payload.map(tr => {
                return tr.timestamp ? {...tr, timestamp: tr.timestamp.toDate().toUTCString()} : tr
            })
            state.transactions = formatTransactions
            localStorage.setItem('transactions', JSON.stringify(formatTransactions))
        },
        handleMembers: (state, action) => {
            const formatMembers = action.payload.map(member => {
                return member.timestamp ? {...member, timestamp: member.timestamp?.seconds ? member.timestamp.toDate().toLocaleString() : member.timestamp} : member
            })
            state.members = formatMembers
            localStorage.setItem('members', JSON.stringify(formatMembers))
        }
    }
})


const appReducer = appSlice.reducer
const { handleSide, handleAdmin, handleProducts, handleEmployees, handleTransactions, handleMembers } = appSlice.actions

export { appReducer, handleSide, handleAdmin, handleProducts, handleEmployees, handleTransactions, handleMembers }