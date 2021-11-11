import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'
import { MdStorefront } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import Card from './Card'
import { useSelector } from 'react-redux'

const Cards = () => {

    const products = useSelector(state => state.products)

    const cardsData = [
        {
            id: 1,
            icon: BsCurrencyDollar,
            title: 'Total Income',
            bgColor: 'bg-green-500',
            value: `$${1000}`
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
            title: 'Total Customers',
            bgColor: 'bg-yellow-500',
            value: products.length
        },
    ]

    return (
        <div className="grid grid-cols-card gap-10">
            {cardsData.map(data => (
                <Card key={data.id} data={data}/>
            ))}
        </div>
    )
}

export default Cards
