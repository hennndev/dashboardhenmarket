import React from 'react'
import FormatPrice from '../UI/FormatPrice'
import { BsArrowRightCircle } from 'react-icons/bs'

const Card = ({data: {icon: Icon, title, bgColor, value, id }}) => {
    return (
        <div className="h-32 bg-white rounded-md p-5 relative shadow-sm">
            <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full ${bgColor} text-white w-min`}>
                    <Icon className="text-xl"/>
                </div>
                <div>
                    <h3 className="text-gray-500 text-md">{title}</h3>
                    {id === 1 ? <FormatPrice value={value} summary classes="text-gray-800 font-medium text-xl"/> : (
                        <p className="text-gray-800 font-medium text-xl">
                            {value}
                        </p>
                    )}
                    
                </div>
            </div>
            <div className="absolute bottom-2 right-5 flex items-center space-x-2 text-gray-400 cursor-pointer animate-bounce">
                <BsArrowRightCircle/>
                <p>Detail</p>
            </div>
        </div>
    )
}

export default Card
