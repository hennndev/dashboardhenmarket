import React from 'react'
import Swal from 'sweetalert2'
import { BiStore } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { MdPayment } from 'react-icons/md'
import { RiHistoryFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai'
import { IoAnalyticsOutline, IoLogInOutline } from 'react-icons/io5'
import { handleSide, handleAdmin } from '../../store/reducers/appReducer'

const Sidebar = () => {
    const isSide = useSelector(state => state.isSide)
    const dispatch  = useDispatch()

    const handleClose = () => dispatch(handleSide(false))
    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF5C58',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Logout now!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(handleAdmin(null))
                localStorage.removeItem('products')
                localStorage.removeItem('cartTerm')
                localStorage.removeItem('transactions')
                localStorage.removeItem('members')
                Swal.fire(
                    'Logout success!',
                    'success'
                )
            }
        })
    }

    return (
        <div className={`fixed z-40 ${!isSide? '-left-full' : 'left-0'} transition-all lg:sticky top-0 w-min bg-white text-gray-800 shadow-lg h-screen`}>
            <div className="flex items-center justify-center text-2xl pt-3 px-12 font-bold">
                <h1>HenMarket</h1>
            </div>

            <div className="mt-10 font-medium">
                <NavLink activeClassName="active" to="/" exact className="sidebar-item" onClick={handleClose}>
                    <AiOutlineHome className="mr-3"/>
                    <h1>Home</h1>
                </NavLink>
                <NavLink activeClassName="active" to="/analytics" className="sidebar-item" onClick={handleClose}>
                    <IoAnalyticsOutline className="mr-3"/>
                    <h1>Analytics</h1>
                </NavLink>
                <NavLink activeClassName="active" to="/products" className="sidebar-item" onClick={handleClose}>
                    <BiStore className="mr-3"/>
                    <h1>Products</h1>
                </NavLink>
                <NavLink activeClassName="active" to="/transactions" className="sidebar-item" onClick={handleClose}>
                    <RiHistoryFill className="mr-3"/>
                    <h1>Transactions</h1>
                </NavLink>
                <NavLink activeClassName="active" to="/members" className="sidebar-item" onClick={handleClose}>
                    <FiUsers className="mr-3"/>
                    <h1>Members</h1>
                </NavLink>
                <NavLink activeClassName="active" to="/employees" className="sidebar-item" onClick={handleClose}>
                    <FiUsers className="mr-3"/>
                    <h1>Employees</h1>
                </NavLink>
                <NavLink activeClassName="active" to="/cashier" className="sidebar-item" onClick={handleClose}>
                    <MdPayment className="mr-3"/>
                    <h1>Cashier</h1>
                </NavLink>
                <div className="absolute bottom-10 left-0 right-0 border-t-2 border-gray-200 pt-3">
                    <div className="sidebar-item">
                        <AiOutlineSetting className="mr-3"/>
                        <h1>Settings</h1>
                    </div>
                    <div className="sidebar-item" onClick={handleLogout}>
                        <IoLogInOutline className="mr-3"/>
                        <h1>Logout</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
