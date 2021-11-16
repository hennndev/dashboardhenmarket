import React from 'react'
import FormatPrice from '../UI/FormatPrice'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

const CashierTable = ({cartTerm, handleAddCart, handleDeleteCart}) => {

    return (
        <table className="border-collapse bg-white w-full rounded-md shadow-md">
            <thead>           
                <tr className="border-b border-gray-300">
                    <td className="font-medium text-center p-3">Image</td>
                    <td className="font-medium text-center p-3">Name</td>
                    <td className="font-medium text-center p-3">Price</td>
                    <td className="font-medium text-center p-3">Action</td>
                    <td className="font-medium text-center p-3">Total</td>
                    <td className="font-medium text-center p-3">Delete</td>
                </tr>
               
            </thead>
            <tbody>
                {cartTerm.map((item) => (
                    <tr className="border-b border-gray-300 cursor-pointer" key={item.id}>
                        <td className="flex items-center justify-center py-3 pl-2">
                            <img src={item.productImage} alt={item.productName} className="h-16 w-16" />
                        </td>
                        <td className="text-center break-words px-5">
                            {item.productName}
                        </td>
                        <FormatPrice value={item.productPrice}/>
                        <td className="px-2">
                            <div className="flex items-center justify-center space-x-3">
                                <AiOutlineMinusCircle className="text-2xl" onClick={() => handleDeleteCart(item)}/>
                                <p className="text-md">{item.count}</p>
                                <AiOutlinePlusCircle className="text-2xl" onClick={() => handleAddCart(item)}/>
                            </div>
                        </td>
                        <FormatPrice value={item.productPrice * item.count}/> 
                        <td className="text-center px-2 text-sm">
                            <button className="btn bg-red-500" onClick={(del = true) => handleDeleteCart(item, del)}>Delete</button>
                        </td> 
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CashierTable
