import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import InputControl from '../UI/InputControl'
import { addMember, editMember } from '../../store/actions/actions'

const AddMember = ({oldData, handleBack}) => {

    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            memberName: '',
            memberEmail: '',
            memberAddress: '',
            memberNoTelp: ''
        },
        onSubmit: (values) => {
            let formatNoTelp = values.memberNoTelp.toString()
            const frontNoTelp = formatNoTelp.slice(0, 2)
            if(frontNoTelp !== '62') {
                formatNoTelp = '62' + formatNoTelp.slice(1)
            }
            const formatValues = {...values, memberNoTelp: formatNoTelp}
            oldData ? editMember(oldData, formatValues, setIsLoading, handleBack) : addMember(formatValues, setIsLoading, handleBack)
        },
        validationSchema: Yup.object({
            memberName: Yup.string().required('Member name is required!'),
            memberEmail: Yup.string().required('Member email is required!').email('Email not valid'),
            memberAddress: Yup.string().required('Member address is required!'),
            memberNoTelp: Yup.number().required('Member no telp is required!')
                        .test('minSize', 'Minimum long number is 8 number or more', 
                        value => value?.toString().length >= 9)
        })
    })


    useEffect(() => {
        if(oldData) {
            formik.setValues({
                memberName: oldData.memberName,
                memberEmail: oldData.memberEmail,
                memberAddress: oldData.memberAddress,
                memberNoTelp: oldData.memberNoTelp
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oldData])

    return (
        <div className="bg-white">
            <form className="p-5" onSubmit={formik.handleSubmit}>
                <h1 className="text-center text-2xl text-gray-700 font-bold mb-10">Add Member</h1>

                <InputControl
                    type="text"
                    id="memberName"
                    title="Member Name"
                    formik={formik}/>
                <InputControl
                    type="email"
                    id="memberEmail"
                    title="Member Email"
                    formik={formik}/>
                <InputControl
                    type="text"
                    id="memberAddress"
                    title="Member Address"
                    formik={formik}/>
                <InputControl
                    type="text"
                    id="memberNoTelp"
                    title="Member No Telp"
                    formik={formik}/>
                            
                <div className="mt-10 flex items-center space-x-3">
                    <button className={`btn ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'} flex items-center`} type="submit">
                        {isLoading && <div className="animate-spin ease duration-300 w-3 h-3 mr-2 border-2 border-white"/>}
                        {isLoading ? 'Loading, please wait' : 'Submit'}
                    </button>
                    <button className={`btn bg-gray-500 ${isLoading && 'cursor-not-allowed'}`} onClick={handleBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddMember
