import React, { useEffect } from 'react'
import Card from './Card'
import { useSelector, useDispatch } from 'react-redux'
import { deleteEmployee, getEmployees } from '../../store/actions/actions'

const EmployeeContainer = ({handleEdit, searchTerm}) => {

    const dispatch = useDispatch()
    const employees = useSelector(state => state.employees)

    useEffect(() => {
        dispatch(getEmployees())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  

    const filteringEmployees = employees.filter(empl => {
        return empl.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empl.employeeStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(empl.employeeNoTelp).toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div className="cards">
            {filteringEmployees.map(employee => (
                <Card
                    handleEdit={() => handleEdit(employee)}
                    deleteEmployee={() => deleteEmployee(employee)}
                    employee={employee}
                    key={employee.id}/>
            ))}
        </div>
    )
}

export default EmployeeContainer
