import React, { useState } from 'react'
import Modal from '../components/UI/Modal'
import FormatPrice from '../components/UI/FormatPrice'
import InputSearch from '../components/UI/InputSearch'
import AddProduct from '../components/Products/AddProduct'
import ProductsTable from '../components/Products/ProductsTable'

const Products = () => {
    const [isAdd, setIsAdd] = useState(false) //ADD FUNCTION
    const [isEdit, setIsEdit] = useState(null) //UPDATE FUNCTION
    const [isModal, setIsModal] = useState(null) //MODAL FUNCTION
    const [searchTerm, setSearchTerm] = useState('') //SEARCH FUNCTION

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

    return (
        <div className="page-container">
            <div className="flex justify-between flex-col sm:flex-row mb-6">
                {!isAdd && (
                    <InputSearch 
                        title="Products"
                        classes="flex-grow sm:mr-3"
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}/>
                )}
                <button className="btn bg-gray-700 mt-4 w-max sm:mt-0" onClick={handleAdd}>
                    {!isAdd ? 'Add Product' : 'Back'}
                </button>
            </div>
            {isAdd && <AddProduct 
                oldData={isEdit}
                handleBack={handleBack}/>}
            {!isAdd && (
                <div className="overflow-x-scroll w-full">    
                    <ProductsTable 
                        handleOpenModal={(data) => setIsModal(data)}
                        handleEdit={handleEdit}
                        searchTerm={searchTerm}/>
                </div>
            )}
            {isModal && <Modal handleClose={() => setIsModal(null)}>
                <div className="p-4 space-y-3">
                    <h2 className="text-center text-xl mb-3 font-medium">Product Detail</h2>
                    <p>Product Name: {isModal?.productName}</p>
                    <p>Product Price: <FormatPrice
                        summary
                        value={isModal?.productPrice}
                        classes="text-lg font-medium text-gray-900"/> </p>
                    
                    <p>Product Quantity: {isModal?.productQty}</p>
                    <p>Product Category: {isModal?.productCty}</p>
                    <p>Product Description: {isModal?.productDesc}</p>
                </div>    
            </Modal>}
        </div>
    )
}

export default Products
