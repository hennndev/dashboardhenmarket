import React, { useState, useRef } from 'react'
import Modal from '../components/UI/Modal'
import Summary from '../components/Cashier/Summary'
import FormatPrice from '../components/UI/FormatPrice'
import InputSearch from '../components/UI/InputSearch'
import CashierTable from '../components/Cashier/CashierTable'
import CashierBlank from '../components/Cashier/CashierBlank'
import ProductsTable from '../components/Products/ProductsTable'

const Cashier = () => {
    const [isModal, setIsModal] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [cartTerm, setCartTerm] = useState(JSON.parse(localStorage.getItem('cartTerm')) || [])
    const inputRef = useRef(null)


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

    const handleClear = () => {
        setCartTerm([])
        localStorage.setItem('cartTerm', JSON.stringify([]))
    }


    return (
        <div className="page-container">
            <InputSearch 
                title="Products"
                inputRef={inputRef}
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}/>

            <div className="overflow-x-scroll mt-5">    
                <ProductsTable 
                    cashier
                    handleOpenModal={handleOpenModal}
                    handleAddCart={handleAddCart}
                    searchTerm={searchTerm}/>
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
                        handleClear={handleClear}/>}
            </div>
            
            
            {isModal && <Modal handleClose={() => setIsModal(null)}>
                <div className="p-4 space-y-3">
                    <h2 className="text-center text-xl mb-5 font-medium">Product Detail</h2>
                    <p>Product Name: {isModal?.productName}</p>
                    <p>Product Price: {' '}
                        <FormatPrice value={isModal?.productPrice} summary classes="text-lg text-gray-800 font-medium"/> 
                    </p>
                    <p>Product Quantity: {isModal?.productQty}</p>
                    <p>Product Category: {isModal?.productCty}</p>
                    <p>Product Description: {isModal?.productDesc}</p>
                </div>    
            </Modal>}
        </div>
    )
}

export default Cashier
