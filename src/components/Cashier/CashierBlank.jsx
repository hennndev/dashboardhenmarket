import React from 'react'

const CashierBlank = ({handleSearch}) => {
    return (
        <div className="grid place-items-center bg-white py-20">
            <h1 className="text-2xl text-center text-gray-800">Search Products For Transactions</h1>
            <button className="btn bg-gray-800 mt-5" onClick={handleSearch}>Search</button>
        </div>
    )
}

export default CashierBlank
