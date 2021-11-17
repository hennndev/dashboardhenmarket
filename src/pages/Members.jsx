import React, { useState } from 'react'
import Modal from '../components/UI/Modal'
import InputSearch from '../components/UI/InputSearch'
import AddMember from '../components/Members/AddMember'
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
                <button className="btn bg-gray-700 mt-4 w-max lg:mt-0" onClick={() => setIsAdd(!isAdd)}>
                    {isAdd ? 'Back' : 'Add Members'}
                </button>
            </div>

            {!isAdd && (
                <div className="overflow-x-scroll">
                    <MembersTable handleEdit={handleEdit} handleOpenModal={(data) => setIsModal(data)}/>
                </div>
            )}
            {isAdd && <AddMember handleBack={handleBack} oldData={isEdit}/>}
            
            {isModal && <Modal handleClose={() => setIsModal(null)}>
                <div className="p-4 space-y-3">
                    <h2 className="text-center text-xl mb-3 font-medium">Member Detail</h2>
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
