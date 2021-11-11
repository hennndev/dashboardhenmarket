import React, { useState } from 'react'
import Cards from '../components/Employee/Cards'
import AddEmployee from '../components/Employee/AddEmployee'

const Employees = () => {
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(null)

    const handleAdd = () => {
        setIsAdd(!isAdd)
        setIsEdit(null)
    }
    const handleBack = () => {
        setIsAdd(false)
        setIsEdit(null)
    }
    const handleEdit = (data) => {
        setIsEdit(data)
        setIsAdd(true)
    }

    return (
        <div className="p-10">
            <div className="flex justify-end mb-10">
                <button className="btn bg-gray-800" onClick={handleAdd}>
                    {isAdd ? 'Back' : 'Add Employee'}
                </button>
            </div>
            {!isAdd && <Cards handleEdit={handleEdit}/>}
            {isAdd && <AddEmployee 
                isEdit={isEdit}
                handleBack={handleBack}/>}
        </div>
    )
}

export default Employees
