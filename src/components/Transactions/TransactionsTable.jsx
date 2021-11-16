import React, { useEffect } from 'react'
import FormatPrice from '../UI/FormatPrice'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTransaction, getTransactions } from '../../store/actions/actions'

const TransactionsTable = ({handleOpenModal, searchTerm = '', homepage}) => {

    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transactions)

    useEffect(() => {
        dispatch(getTransactions())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let filteringTransactions = transactions.filter(tr => {
        return tr.product.some(pr => pr.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            String(tr.member ? 'Member' : 'General').toLowerCase().includes(searchTerm.toLowerCase())
    })

    if(homepage) filteringTransactions =  filteringTransactions.slice(0, 3)


    return (
        <table className="border-collapse bg-white w-full">
            <thead>         
                <tr className="border-b border-gray-300">
                    <td className="font-medium text-center p-3">Date</td>
                    <td className="font-medium text-center p-3">Products</td>
                    <td className="font-medium text-center p-3">Member</td>
                    <td className="font-medium text-center p-3">Total Price</td>
                    {!homepage && (
                        <>
                            <td className="font-medium text-center p-3">Actions</td>
                        </>
                    )}
                </tr>          
            </thead>
            <tbody>
                {transactions.length < 1 && (
                    <tr className="border-b border-gray-300 cursor-pointer">
                        {Array(homepage ? 4 : 5).fill().map((_, idx) => (
                            <td className="text-center p-5" key={idx}>
                                empty
                            </td>
                        ))}
                    </tr>  
                )}

                {filteringTransactions.map((tr) => (
                    <tr className="border-b border-gray-300 cursor-pointer" key={tr.id}>
                        <td className="text-center px-5">
                            {new Date(tr.timestamp).toLocaleString()}
                        </td>
                        <td className={`flex items-center justify-center text-center flex-col py-3`}>
                            {tr.product.map(pr => (
                                <span key={pr.id}>- {pr.productName}</span>
                            ))}
                        </td>
                        <td className="text-center break-words px-10">
                            {!tr.member ? 'General' : 'Member'}
                        </td>
                        <FormatPrice value={tr.totalPrice} classes="text-center px-10 font-medium text-green-500"/>
                        {!homepage && (    
                            <td className="text-sm px-5">
                                <div className="flex items-center justify-center space-x-3">
                                    <button className="btn bg-gray-800 text-sm" onClick={() => handleOpenModal(tr)}>Detail</button>
                                    <button className="btn bg-red-500 px-3" onClick={() => deleteTransaction(tr)}>Delete</button>
                                </div>
                            </td>
                        )}
                    </tr>  
                ))}
                
            </tbody>
        </table>
    )
}

export default TransactionsTable
