import React, { useState } from 'react'
import { BiUserCheck } from 'react-icons/bi'
import NumberFormat from 'react-number-format'

const Summary = ({totalPrice}) => {
    const [isMember, setIsMember] = useState(false)
    

    return (
        <div className="w-96 bg-white mt-5 p-5 relative">
            <h1 className="text-md mb-1">Total =  
                <NumberFormat
                    value={totalPrice}
                    thousandSeparator={true}
                    displayType="text"
                    className={`text-xl font-bold ${isMember ? 'line-through text-gray-500' : 'text-green-500'}`}
                    prefix="Rp"
                    renderText={(value, props) => (
                        <span {...props}>{' '}{value}</span>
                )}/>
                {isMember && (
                    <NumberFormat
                        value={totalPrice * 0.9}
                        thousandSeparator={true}
                        displayType="text"
                        className="text-xl text-green-500 font-bold"
                        prefix="Rp"
                        renderText={(value, props) => (
                            <span {...props}>{' '}{value}</span>
                    )}/>
                )}
            </h1>
            
            <h1 className="text-md mb-1">Discout Member = {isMember ? '10' : '0'}%</h1>
            <h1 className="text-md mb-1">Discout Monthly = 0%</h1>
            <div className="mt-3">
                <button className="btn bg-red-500 mr-3">Clear</button>
                <button className="btn bg-green-500">{isMember ? 'Checkout as member' : 'Checkout'}</button>
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
