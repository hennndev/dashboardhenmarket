import React from 'react'
import { MdOutlineDarkMode, MdMenu } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai' 
import { withRouter } from 'react-router-dom'
import { handleSide } from '../../store/reducers/appReducer'
import { useDispatch } from 'react-redux'

const Header = ({location}) => {
    const dispatch = useDispatch()
    let titleHeader = location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)

    if(location.pathname === '/') {
        titleHeader = 'Homepage'
    }
    return (
        <div className="sticky top-0 bg-white z-30 flex-comp py-3 px-5 shadow-md text-gray-500">
            <h1 className="text-lg">{titleHeader}</h1>
            <div className="flex items-center space-x-1 text-xl">
                <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <AiOutlineUser/>
                </div>
                <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <MdOutlineDarkMode/>
                </div>
                <div className="block lg:hidden p-2 hover:bg-gray-100 rounded-full cursor-pointer z-50"
                    onClick={() => dispatch(handleSide())}>
                    <MdMenu/>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(Header)
