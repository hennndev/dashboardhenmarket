import React, { useState } from 'react'
import { BiUserCheck } from 'react-icons/bi'
import FormatPrice from '../UI/FormatPrice'
import { addTransaction } from '../../store/actions/actions'

const Summary = ({totalPrice, handleClear, cartTerm}) => {
    const [isMember, setIsMember] = useState(false)
    
    const handleTransaction = () => {
        const dataTransaction = {
            member: isMember ? true : false,
            totalPrice: isMember ? totalPrice * 0.9 : totalPrice,
            product: cartTerm
        }
        addTransaction(dataTransaction)
    }

    return (
        <div className="w-96 bg-white mt-5 p-5 relative shadow-md rounded-md">
            <h1 className="text-md mb-1">Total = {' '}
                <FormatPrice 
                    summary
                    value={totalPrice}
                    classes={`text-xl font-bold ${isMember ? 'line-through text-gray-500' : 'text-green-500'} mr-2`}
                />  
                {isMember && (
                    <FormatPrice 
                        summary
                        value={totalPrice * 0.9}
                        classes="text-xl text-green-500 font-bold"
                    />  
                )}
            </h1>
            
            <h1 className="text-md mb-1">Discout Member = {isMember ? '10' : '0'}%</h1>
            <h1 className="text-md mb-1">Discout Monthly = 0%</h1>
            <div className="mt-3">
                <button className="btn bg-red-500 mr-3" onClick={handleClear}>Clear</button>
                <button 
                    className="btn bg-green-500"
                    onClick={handleTransaction}>
                    {isMember ? 'Checkout as member' : 'Checkout'}
                </button>
            </div>
            <div 
                className={`absolute top-5 right-3 rounded-full p-1 border border-green-700 grid place-items-center ${isMember ? 'bg-green-700 text-white' : 'text-green-700'} text-xl  hover:text-white hover:bg-green-700`}
                onClick={() => setIsMember(!isMember)}>
                <BiUserCheck/>
            </div>
        </div>
    )
}

export default Summary
