import React, { useState } from 'react'
import InputSearch from '../components/UI/InputSearch'
import AddMember from '../components/Members/AddMember'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../components/UI/Modal'
import MembersTable from '../components/Members/MembersTable'

const Members = () => {
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(null)
    const [isModal, setIsModal] = useState(null)

    const handleEdit = (data) => {
        setIsEdit(data)
        setIsAdd(true)
    }

    const handleBack = () => {
        setIsAdd(false)
        setIsEdit(null)
    }

    return (
        <div className="page-container">
            <div className="flex justify-between flex-col lg:flex-row mb-7">
                {!isAdd && <InputSearch classes="flex-grow lg:mr-3" title="Members"/>}
                <div className="flex mt-5 lg:mt-0">
                    <button className="btn bg-blue-800 mr-3">Info Members</button>
                    <button className="btn bg-gray-800" onClick={() => setIsAdd(!isAdd)}>
                        {isAdd ? 'Back' : 'Add Members'}
                    </button>
                </div>
            </div>

            {!isAdd && (
                <div className="overflow-x-scroll w-full">
                    <MembersTable handleEdit={handleEdit} handleOpenModal={(data) => setIsModal(data)}/>
                </div>
            )}
            {isAdd && <AddMember
                handleBack={handleBack}
                oldData={isEdit}/>}

            {isModal && <Modal handleClose={() => setIsModal(null)}>
                <div className="p-4 space-y-3">
                    <h2 className="text-center text-xl mb-3">Member Detail</h2>
                    <p>Member Name: {isModal?.memberName}</p>
                    <p>Member Address: {isModal?.memberAddress}</p>
                    <p>Member Email: {isModal?.memberEmail}</p>
                    <p>Member NoTelp: {isModal?.memberNoTelp}</p>
                </div>       
            </Modal>}
        </div>
    )
}

export default Members
