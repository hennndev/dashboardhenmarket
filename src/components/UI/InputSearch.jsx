import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const InputSearch = ({searchTerm, setSearchTerm, inputRef = null, classes = '', title}) => {
    return (
        <div className={`bg-white rounded flex items-center justify-between px-5 ${classes}`}>
            <input 
                value={searchTerm}
                ref={inputRef}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text" placeholder={`Search ${title}`} className="py-2 rounded-md outline-none flex-grow"/>
            <AiOutlineClose className="text-red-500 ml-5 text-xl cursor-pointer" onClick={() => setSearchTerm('')}/>
        </div>
    )
}

export default InputSearch
