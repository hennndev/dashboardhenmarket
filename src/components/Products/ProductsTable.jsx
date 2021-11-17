import React, { useEffect } from 'react'
import FormatPrice from '../UI/FormatPrice'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct, getProducts } from '../../store/actions/actions'

const ProductsTable = ({handleOpenModal, handleEdit, handleAddCart, cashier = null, searchTerm = ''}) => {

    const dispatch = useDispatch()
    let products = useSelector(state => state.products)

    const filteringProducts = products.filter(product => {
        return product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||     
                product.productCty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.productPrice >= +searchTerm
    })

    const handleClick = (data) => {
        if(cashier) {
            handleAddCart(data)
        } else {
            return
        }
    }

    useEffect(() => {
        dispatch(getProducts())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    cashier ? products = !searchTerm ? [] : filteringProducts : products = filteringProducts

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
                        {Array(6).fill().map((_,idx) => (
                            <td className="text-center p-5" key={idx}>empty</td>
                        ))}
                    </tr>
                )}
                {products.map((item, idx) => (
                    <tr className="border-b border-gray-300 cursor-pointer" key={item.id} onClick={() => handleClick( item)}>
                        {!cashier && <td className="text-center px-10">{idx + 1}</td>}
                        <td className={`flex items-center justify-center py-3 ${cashier && 'pl-5 w-20 h-20'}`}>
                            <img src={item.productImage} alt={item.productName} className={`${cashier ? 'w-full h-full' : 'w-16 h-16'} object-cover`} />
                        </td>
                        <td className="text-center break-words px-10">
                            {item.productName} 
                        </td>
                        <FormatPrice value={item.productPrice}/>
                        <td className="text-center px-5">
                            <button className="btn bg-gray-700 text-sm" onClick={(e) => handleOpenModal(item, e)}>
                                Detail
                            </button>
                        </td> 
                        {!cashier && (
                            <td className="text-sm px-5">
                                <div className="flex items-center justify-center space-x-2">
                                    <button className="btn bg-blue-500 px-3" onClick={() => handleEdit(item)}>
                                        Update
                                    </button>
                                    <button className="btn bg-red-500 px-3" onClick={() => deleteProduct(item)}>
                                        Delete
                                    </button>
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
