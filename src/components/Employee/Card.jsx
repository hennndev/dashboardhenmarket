import React from 'react'

const Card = ({employee, deleteEmployee}) => {
    return (
        <div className="min-h-60 bg-white p-5 shadow-md">
            <div className="flex justify-center items-center">
                <div className="h-20 w-20 rounded-full">
                    <img src={employee.employeeImage} alt="" className="w-full h-full object-cover rounded-full" />
                </div>
            </div>
            <div className="mt-5 px-5">
                <h2 className="border-b border-gray-300 py-2">
                    Nama :
                    {' '}{employee.employeeName}
                </h2>
                <h2 className="border-b border-gray-300 py-2">
                    Status :
                    {' '}{employee.employeeStatus}
                </h2>
                <h2 className="border-b border-gray-300 py-2">
                    Motto :
                    {' '}{employee.employeeMotto}
                </h2>
                <h2 className="border-b border-gray-300 py-2">
                    No Telp :
                    {' '}{employee.employeeNoTelp}
                </h2>
                <div className="flex items-center justify-center mt-5 space-x-3">
                    <button className="btn bg-blue-500 text-sm">Update</button>
                    <button className="btn bg-red-500 text-sm" onClick={deleteEmployee}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Card
