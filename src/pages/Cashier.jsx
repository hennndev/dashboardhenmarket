import React, { useState, useRef } from 'react'
import Modal from '../components/UI/Modal'
import Summary from '../components/Cashier/Summary'
import InputSearch from '../components/UI/InputSearch'
import CashierTable from '../components/Cashier/CashierTable'
import CashierBlank from '../components/Cashier/CashierBlank'
import ProductsTable from '../components/Products/ProductsTable'

const Cashier = () => {
    const [isModal, setIsModal] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [cartTerm, setCartTerm] = useState(JSON.parse(localStorage.getItem('cartTerm')) || [])
    const inputRef = useRef(null)

    const handleCloseModal = () => setIsModal(null)
    const handleOpenModal = (data, e) => {
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
        <div className="page-container">
            <InputSearch 
                title="Products"
                inputRef={inputRef}
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}/>

            <div className="overflow-x-scroll w-full mt-5">    
                <ProductsTable 
                    cashier
                    handleOpenModal={handleOpenModal}
                    handleAddCart={handleAddCart}
                    searchTerm={searchTerm}
                    classes/>
            </div>
            
            {cartTerm.length > 0 && (
                <div className="overflow-x-scroll w-full mt-5">
                    <CashierTable 
                        cartTerm={cartTerm}
                        handleAddCart={handleAddCart}
                        handleDeleteCart={handleDeleteCart}/>
                </div>
            )}

            {cartTerm.length < 1 && <CashierBlank handleSearch={() => inputRef.current.focus()}/>}

            <div className="flex items-center justify-end">
                {cartTerm.length > 0 && 
                    <Summary 
                        totalPrice={totalPrice} 
                        cartTerm={cartTerm}
                        handleClear={() => setCartTerm([])}/>}
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
