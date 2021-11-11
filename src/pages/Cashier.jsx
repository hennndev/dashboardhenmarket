import React, { useState } from 'react'
import Modal from '../components/UI/Modal'
import ProductsTable from '../components/Products/ProductsTable'
import CartTable from '../components/Cashier/CartTable'
import Summary from '../components/Cashier/Summary'
import { AiOutlineClose } from 'react-icons/ai'


const Cashier = () => {
    const [isModal, setIsModal] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [cartTerm, setCartTerm] = useState(JSON.parse(localStorage.getItem('cartTerm')) || [])

    const handleCloseModal = () => setIsModal(null)
    const handleOpenModal = (e, data) => {
        e.stopPropagation()
        setIsModal(data)
    }

    const handleAddCart = (item) => {
        const updateCart = [...cartTerm]
        const existItem = updateCart.find(product => product.id === item.id)
        const itemIdx = updateCart.indexOf(existItem)
        if(existItem) {
            existItem.count++
            updateCart[itemIdx] = existItem
        } else {
            updateCart.push({
                ...item,
                count: 1
            })
        }
        setCartTerm(updateCart)
        localStorage.setItem('cartTerm', JSON.stringify(updateCart))
    }

    const handleDeleteCart = (item, del) => {
        let updateCart = [...cartTerm]
        const existItem = updateCart.find(product => product.id === item.id)
        const itemIdx = updateCart.indexOf(existItem)
        if(existItem) {
            if(del || existItem.count === 1) {
                updateCart  = cartTerm.filter(product => product.id !== item.id)
            } else {
                existItem.count--
                updateCart[itemIdx] = existItem
            }  
        }
        setCartTerm(updateCart)    
        localStorage.setItem('cartTerm', JSON.stringify(updateCart))
    }
    
    const totalPrice = cartTerm.reduce((currVal, val) => {
        return currVal + (val.count * val.productPrice)
    }, 0)

    


    return (
        <div className="p-5 pb-20 md:p-10">
            <div className="w-full bg-white mb-5 flex items-center justify-between px-5">
                <input 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text" placeholder="Search products" className="py-3 rounded-md outline-none flex-grow"/>
                <AiOutlineClose className="text-red-500 ml-5 text-xl cursor-pointer" onClick={() => setSearchTerm('')}/>
            </div>

            <div className="overflow-x-scroll w-full mt-5">    
                <ProductsTable 
                    cashier
                    handleOpenModal={handleOpenModal}
                    handleAddCart={handleAddCart}
                    searchTerm={searchTerm}/>
            </div>
            
            <div className="overflow-x-auto w-full">
                <CartTable 
                    cartTerm={cartTerm}
                    handleAddCart={handleAddCart}
                    handleDeleteCart={handleDeleteCart}/>
            </div>
            <div className="flex items-center justify-end">
                {cartTerm.length > 0 && <Summary totalPrice={totalPrice}/>}
            </div>
            
            
            {isModal && <Modal handleClose={handleCloseModal}>
                <div className="p-4">
                    <h2 className="text-center text-xl mb-3">Product Detail</h2>
                    <p>Product Name: {isModal?.productName}</p>
                    <p>Product Price: ${isModal?.productPrice}</p>
                    <p>Product Quantity: {isModal?.productQty}</p>
                    <p>Product Description: {isModal?.productDesc}</p>
                </div>    
            </Modal>}
        </div>
    )
}

export default Cashier
