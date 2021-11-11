import React, { useEffect } from 'react'
import Card from './Card'
import { useSelector, useDispatch } from 'react-redux'
import { deleteEmployee, getEmployees } from '../../store/actions/actions'

const Cards = ({handleEdit}) => {

    const dispatch = useDispatch()
    const employees = useSelector(state => state.employees)

    useEffect(() => {
        dispatch(getEmployees())
    }, [])  

    return (
        <div className="grid grid-cols-card gap-10">
            {employees.map(employee => (
                <Card
                    handleEdit={handleEdit}
                    deleteEmployee={() => deleteEmployee(employee.id, employee.employeeImage)}
                    employee={employee}
                    key={employee.id}/>
            ))}
        </div>
    )
}

export default Cards
