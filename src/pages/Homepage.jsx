import React, { useEffect } from 'react'
import { FiUsers } from 'react-icons/fi'
import { MdStorefront } from 'react-icons/md'
import Card from '../components/Homepage/Card'
import { BsCurrencyDollar } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../store/actions/actions'
import MembersTable from '../components/Members/MembersTable'
import TransactionsTable from '../components/Transactions/TransactionsTable'

const Homepage = (props) => {

    const dispatch = useDispatch()
    const members = useSelector(state => state.members)
    const products = useSelector(state => state.products)
    const transactions = useSelector(state => state.transactions)

    useEffect(() => {
        dispatch(getProducts())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    

    const cardsData = [
        {
            id: 1,
            icon: BsCurrencyDollar,
            title: 'Total Income',
            bgColor: 'bg-green-500',
            value: `${transactions.reduce((currVal, val) => currVal + val.totalPrice, 0)}`
        },
        {
            id: 2,
            icon: MdStorefront,
            title: 'Total Products',
            bgColor: 'bg-blue-500',
            value: products.length
        },
        {
            id: 3,
            icon: FiUsers,
            title: 'Total Members',
            bgColor: 'bg-yellow-500',
            value: members.length
        },
    ]

    return (
        <div className="p-10">
            <div className="cards">
                {cardsData.map(data => (
                    <Card key={data.id} data={data}/>
                ))}
            </div>
            <div className="flex mt-10 flex-col xl:flex-row">
                <div className="flex-1 xl:mr-5">
                    <div className="flex-comp mb-3 text-lg font-medium">
                        <h1 className="text-gray-600">Latest transactions</h1>
                        <button className="btn bg-gray-700 text-sm" onClick={() => props.history.push('/transactions')}>Show more</button>
                    </div>
                    <div className="overflow-x-scroll">    
                        <TransactionsTable homepage/>
                    </div>
                </div>

                <div className="flex-1 mt-8 xl:mt-0">
                    <div className="flex-comp mb-3 text-lg font-medium">
                        <h1 className="text-gray-600">Latest member</h1>
                        <button className="btn bg-gray-700 text-sm" onClick={() => props.history.push('/members')}>Show more</button>
                    </div>
                    <div className="overflow-x-scroll">
                        <MembersTable homepage/>
                    </div>
                </div>   
            </div> 
        </div>
    )
}

export default Homepage
