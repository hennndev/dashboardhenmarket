import React, { useState } from 'react'
import InputSearch from '../components/UI/InputSearch'
import AddEmployee from '../components/Employee/AddEmployee'
import EmployeeContainer from '../components/Employee/EmployeeContainer'

const Employees = () => {
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

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
        <div className="page-container">
            <div className="flex justify-between flex-col sm:flex-row mb-6">
                {!isAdd && <InputSearch 
                    title="Employees"
                    classes="flex-grow sm:mr-3" searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}
                <button className="btn bg-gray-700 w-max mt-4 sm:mt-0" onClick={handleAdd}>
                    {isAdd ? 'Back' : 'Add Employee'}
                </button>
            </div>
            {!isAdd && <EmployeeContainer handleEdit={handleEdit} searchTerm={searchTerm}/>}
            {isAdd && <AddEmployee oldData={isEdit} handleBack={handleBack}/>}
        </div>
    )
}

export default Employees
