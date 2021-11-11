import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { BiStore } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { MdOutlinePayments } from 'react-icons/md'
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
                <Link to="/" className="sidebar-item" onClick={handleClose}>
                    <AiOutlineHome className="mr-3"/>
                    <h1>Home</h1>
                </Link>
                <Link to="/analytics" className="sidebar-item" onClick={handleClose}>
                    <IoAnalyticsOutline className="mr-3"/>
                    <h1>Analytics</h1>
                </Link>
                <Link to="/products" className="sidebar-item" onClick={handleClose}>
                    <BiStore className="mr-3"/>
                    <h1>Products</h1>
                </Link>
                <Link to="/transactions" className="sidebar-item" onClick={handleClose}>
                    <MdOutlinePayments className="mr-3"/>
                    <h1>Transactions</h1>
                </Link>
                <Link to="/customers" className="sidebar-item" onClick={handleClose}>
                    <FiUsers className="mr-3"/>
                    <h1>Customers</h1>
                </Link>
                <Link to="/employees" className="sidebar-item" onClick={handleClose}>
                    <FiUsers className="mr-3"/>
                    <h1>Employees</h1>
                </Link>
                <Link to="/cashier" className="sidebar-item" onClick={handleClose}>
                    <FiUsers className="mr-3"/>
                    <h1>Cashier</h1>
                </Link>
                <div className="absolute bottom-10 left-0 right-0 border-t-2 border-gray-100 mt-10 pt-3">
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
