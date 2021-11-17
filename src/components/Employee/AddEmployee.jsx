import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import InputControl from '../UI/InputControl'
import { addEmployee, editEmployee } from '../../store/actions/actions'

const AddEmployee = ({oldData, handleBack}) => {

    const [isLoading, setIsLoading] = useState(false)
    
    const formik = useFormik({
        initialValues: {
            employeeName: '',
            employeeImage: null,
            employeeStatus: '',
            employeeMotto: '',
            employeeNoTelp: ''
        },
        onSubmit: (values) => {         
            let formatNoTelp = values.employeeNoTelp.toString()
            const frontNoTelp = formatNoTelp.slice(0, 2)
            if(frontNoTelp !== '62') {
                formatNoTelp = '62' + formatNoTelp
            }
            const formatValues = {
                ...values,
                employeeNoTelp: formatNoTelp
            }
            oldData ? editEmployee(oldData, formatValues, setIsLoading, handleBack) : addEmployee(formatValues, setIsLoading, handleBack)
        
        },
        validationSchema: Yup.object({
            employeeName: Yup.string().required('Employee name is required!'),
            employeeStatus: Yup.string().required('Employee status is required!'),
            employeeMotto: Yup.string().required('Employee motto is required!'),
            employeeNoTelp: Yup.number().required('Employee no telp is required')
                                .test('longNum', 'Minimum long number is 8 number or more', 
                                value => value?.toString().length >= 9),
            employeeImage: Yup.mixed().required('Employee image is required')
                                    .test('fileSize', 'Maximum size image is < 1MB', 
                                    value => typeof value !== 'string' ? value?.size <= 1000000 : value.length > 1)
        })
    })

    useEffect(() => {
        if(oldData) {
            formik.setValues({
                employeeName: oldData.employeeName,
                employeeImage: oldData.employeeImage,
                employeeStatus: oldData.employeeStatus,
                employeeMotto: oldData.employeeMotto,
                employeeNoTelp: oldData.employeeNoTelp
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDrop = (acceptedFiles) => {
        formik.setValues({
            ...formik.values,
            employeeImage: acceptedFiles[0]
        })
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    return (
        <div className="bg-white">
            <form className="p-5" onSubmit={formik.handleSubmit}>
                <h1 className="text-center text-2xl text-gray-700 font-bold mb-10">Add Employee</h1>

                {/* EMPLOYEE NAME */}
                <InputControl
                    id="employeeName"
                    title="Employee Name"
                    type="text"
                    formik={formik}
                />
                {/* EMPLOYEE STATUS */}
                <InputControl
                    id="employeeStatus"
                    title="Employee Status"
                    type="text"
                    formik={formik}
                />
                {/* EMPLOYEE MOTTO */}
                <InputControl
                    id="employeeMotto"
                    title="Employee Motto"
                    type="text"
                    formik={formik}
                />
                {/* EMPLOYEE NO TELP */}
                <InputControl
                    id="employeeNoTelp"
                    title="Employee No Telp (+62..)"
                    type="number"
                    formik={formik}
                />
               
                {/* EMPLOYEE IMAGE */}
                <InputControl id="employeeImage" title="Employee Image" formik={formik} image>
                    <div {...getRootProps()} 
                        className={`border-2 border-dashed px-5 py-10 text-center ${isDragActive? 'border-blue-300' : 'border-gray-300'}`}>
                        <input {...getInputProps()}/>
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                    <small>{formik?.values?.employeeImage?.name || oldData?.employeeImageName }</small>
                </InputControl>
                
                
                <div className="mt-10 flex items-center space-x-3">
                    <button className={`btn ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'} flex items-center`} type="submit">
                        {isLoading && <div className="btn-loading"/>}
                        {isLoading ? 'Loading, please wait' : 'Submit'}
                    </button>
                    <button type="buttom" className={`btn bg-gray-500 ${isLoading && 'cursor-not-allowed'}`} onClick={handleBack}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployee
