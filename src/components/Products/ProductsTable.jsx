import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, deleteProduct } from '../../store/actions/actions'

const ProductsTable = ({handleOpenModal, handleEdit, cashier = null, searchTerm = '', handleAddCart}) => {

    const dispatch = useDispatch()
    let products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const filteringProducts = products.filter(product => {
        return product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const handleClick = (data) => {
        if(cashier) {
            handleAddCart(data)
        } else {
            return ;
        }
    }

    cashier ? products = !searchTerm ? [] : filteringProducts : products = products

    return (
        <table className="border-collapse bg-white w-full">
            <thead>
                {!cashier && (
                    <tr className="border-b border-gray-300">
                        <td className="font-medium text-center p-3">No</td>
                        <td className="font-medium text-center p-3">Image</td>
                        <td className="font-medium text-center p-3">Name</td>
                        <td className="font-medium text-center p-3">Price</td>
                        <td className="font-medium text-center p-3">Detail</td>
                        <td className="font-medium text-center p-3">Actions</td>
                    </tr>
                )}
            </thead>
            <tbody>
                {!cashier && products.length < 1 && (
                    <tr className="border-b border-gray-300">
                        <td className="text-center px-5">empty</td>
                        <td className="flex items-center justify-center py-3">
                            empty
                        </td>
                        <td className="text-center break-words px-10">
                            empty
                        </td>
                        <td className="text-center px-10">
                            empty
                        </td>
                        <td className="text-center px-5">
                            empty
                        </td> 
                        <td className="text-sm px-5">
                            <div className="flex items-center justify-center">
                                empty
                            </div>
                        </td>
                    </tr>
                )}
                {products.map((item, idx) => (
                    <tr className="border-b border-gray-300 cursor-pointer" key={item.id} onClick={(e) => handleClick( item)}>
                        <td className="text-center px-10">{idx + 1}</td>
                        <td className="flex items-center justify-center py-3">
                            <img src={item.productImage} alt="" className="h-16 w-16" />
                        </td>
                        <td className="text-center break-words px-10">
                            {item.productName} 
                        </td>
                        <td className="text-center px-10">
                            ${item.productPrice}
                        </td>
                        <td className="text-center px-5">
                            <button className="btn bg-gray-800 text-sm" onClick={(e) => handleOpenModal(e, item)}>Detail</button>
                        </td> 
                        {!cashier && (
                            <td className="text-sm px-5">
                                <div className="flex items-center justify-center">
                                <button className="btn mr-1 bg-blue-500 px-3" onClick={() => handleEdit(item)}>Update</button>
                                <button className="btn bg-red-500 px-3" onClick={() => deleteProduct(item.id, item.productImage)}>Delete</button>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}   
            </tbody>
        </table>
    )
}

export default ProductsTable
