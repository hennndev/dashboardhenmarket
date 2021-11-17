import React, { useState } from 'react'
import Modal from '../components/UI/Modal'
import FormatPrice from '../components/UI/FormatPrice'
import InputSearch from '../components/UI/InputSearch'
import TransactionsTable from '../components/Transactions/TransactionsTable'

const Transactions = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isModal, setIsModal] = useState(null)

    return (
        <div className="page-container">
            <div className="flex mb-4">
                <InputSearch 
                    classes="flex-grow"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    title="Transactions"/>
            </div>

            <div className="overflow-x-auto">
                <TransactionsTable searchTerm={searchTerm} handleOpenModal={(data) => setIsModal(data)}/>
            </div>

            {isModal && <Modal handleClose={() => setIsModal(null)}>
                <div className="p-4">
                    <h2 className="text-center text-xl mb-4 font-medium text-gray-800">Transaction Detail</h2>
                    <div>
                        {isModal.product.map(item => (
                            <div className="flex items-center mb-2" key={item.id}>
                                <img src={item.productImage} alt={item.productName} className="h-16 mr-2" />
                                <p>{item.count}X {item.productName}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center space-x-3">
                        <p>Total Price: </p>
                        <FormatPrice value={isModal.totalPrice} classes="font-medium text-green-500 text-xl" summary/>
                    </div>
                    <div className="flex items-center space-x-3">
                        <p>Member: </p>
                        <p>{isModal.member? 'Member' : 'General'}</p>
                    </div>
                </div>    
            </Modal>}
        </div>
    )
}

export default Transactions
