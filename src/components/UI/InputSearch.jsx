import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const InputSearch = ({searchTerm, setSearchTerm, title, inputRef = null, classes = ''}) => {
    return (
        <div className={`bg-white rounded flex-comp px-5 shadow-sm ${classes}`}>
            <input 
                value={searchTerm}
                ref={inputRef}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text" placeholder={`Search ${title}`} className="py-2 rounded-md outline-none flex-grow"/>
            {searchTerm && <AiOutlineClose className="text-red-400 ml-5 text-xl cursor-pointer" onClick={() => setSearchTerm('')}/>}
        </div>
    )
}

export default InputSearch
