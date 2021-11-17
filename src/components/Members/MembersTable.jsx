import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMembers, deleteMember } from '../../store/actions/actions'

const MembersTable = ({handleEdit, handleOpenModal, homepage = null}) => {

    const dispatch = useDispatch()
    let members = useSelector(state => state.members)

    useEffect(() => {
        dispatch(getMembers())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(homepage) members = members.slice(0, 3)

    return (
        <table className="border-collapse bg-white w-full">
            <thead>
                <tr className="border-b border-gray-300">
                    <td className="font-medium text-center p-3">No</td>
                    <td className="font-medium text-center p-3">Name</td>
                    <td className="font-medium text-center p-3">Email</td>
                    {!homepage && (
                        <>
                            <td className="font-medium text-center p-3">Detail</td>
                            <td className="font-medium text-center p-3">Actions</td>
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {members.length < 1 && (
                    <tr className="border-b border-gray-300 cursor-pointer">
                        {Array(homepage ? 3 : 5).fill().map((_, idx) => (
                            <td className="text-center p-5" key={idx}>
                                empty
                            </td>
                        ))}
                    </tr>  
                )}
                {members.map((member, idx) => (
                    <tr className="border-b border-gray-300 cursor-pointer" key={member.id}>
                        <td className="text-center px-10">{idx + 1}</td>
                        <td className="text-center py-5">
                            {member.memberName}
                        </td>
                        <td className="text-center break-words px-5">
                            {member.memberEmail}
                        </td>
                        {!homepage && (
                            <>
                                <td className="text-center px-10">
                                    <button className="btn text-sm bg-gray-700" onClick={() => handleOpenModal(member)}>Detail</button>
                                </td>
                                <td className="text-sm px-5">
                                    <div className="flex items-center justify-center">
                                        <button className="btn mr-1 bg-blue-500 px-3" onClick={() => handleEdit(member)}>Update</button>
                                        <button className="btn bg-red-500 px-3" onClick={() => deleteMember(member)}>Delete</button>
                                    </div>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MembersTable
