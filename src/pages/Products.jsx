import React, { useState } from 'react'
import Modal from '../components/UI/Modal'
import AddProduct from '../components/Products/AddProduct'
import ProductsTable from '../components/Products/ProductsTable'

const Products = () => {
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(null)
    const [isModal, setIsModal] = useState(null)

    const handleAdd = () => {
        setIsAdd(!isAdd)
        setIsEdit(null)
    }
    const handleEdit = (data) => {
        setIsEdit(data)
        setIsAdd(true)
    }
    const handleBack = () => {
        setIsAdd(false)
        setIsEdit(null)
    }

    const handleCloseModal = () => setIsModal(null)
    const handleOpenModal = (data) => setIsModal(data)

    return (
        <div className="p-5 pb-20 md:p-10">
            <div className="flex justify-end">
                <button className="btn bg-gray-800 mb-4" onClick={handleAdd}>
                    {!isAdd ? 'Add Product' : 'Back'}
                </button>
            </div>
            {isAdd && <AddProduct 
                oldData={isEdit}
                handleBack={handleBack}/>}
            {!isAdd && (
                <div className="overflow-x-scroll w-full">    
                    <ProductsTable 
                        handleOpenModal={handleOpenModal}
                        handleEdit={handleEdit}/>
                </div>
            )}
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

export default Products
