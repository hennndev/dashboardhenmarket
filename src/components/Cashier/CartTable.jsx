import React from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

const CartTable = ({cartTerm, handleAddCart, handleDeleteCart}) => {

    return (
        <table className="border-collapse bg-white w-full">
            <tbody>
                {cartTerm.map((item) => (
                    <tr className="border-b border-gray-300 cursor-pointer">
                        <td className="flex items-center justify-center py-3">
                            <img src={item.productImage} alt={item.productName} className="h-16 w-16" />
                        </td>
                        <td className="text-center break-words px-10">
                            {item.productName}
                        </td>
                        <td className="text-center px-10">
                            ${item.productPrice}
                        </td>
                        <td className="px-5">
                            <div className="flex items-center justify-center space-x-3">
                                <AiOutlineMinusCircle className="text-2xl" onClick={() => handleDeleteCart(item)}/>
                                <p className="text-md">{item.count}</p>
                                <AiOutlinePlusCircle className="text-2xl" onClick={() => handleAddCart(item)}/>
                            </div>
                        </td>
                        <td className="text-center px-5">
                            ${item.productPrice * item.count}
                        </td> 
                        <td className="text-center px-5">
                            <button className="btn bg-red-500" onClick={(del = true) => handleDeleteCart(item, del)}>Delete</button>
                        </td> 
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CartTable
