import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import { addEmployee, editEmployee } from '../../store/actions/actions'

const AddProduct = ({handleBack}) => {

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
            addEmployee(values, setIsLoading, handleBack)
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
                <div className="input-control">
                    <label htmlFor="employeeName" className="mb-2">Employee Name</label>
                    <input 
                        type="text" 
                        id="employeeName" 
                        placeholder="employee name..." 
                        className="border border-gray-200 p-3 rounded-md"
                        {...formik.getFieldProps('employeeName')}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.employeeName && formik.touched.employeeName && (
                        <small className="text-red-400">{formik.errors.employeeName}</small>
                    )}
                </div>

                {/* EMPLOYEE STATUS */}
                <div className="input-control">
                    <label htmlFor="employeeStatus" className="mb-2">Employee Status</label>
                    <input 
                        type="text" 
                        id="employeeStatus"
                        placeholder="employee status..." 
                        className="border border-gray-200 p-3 rounded-md"
                        {...formik.getFieldProps('employeeStatus')}
                        onBlur={formik.handleBlur}/>
                    {formik.touched.employeeStatus && formik.errors.employeeStatus && <small className="text-red-400">{formik.errors.employeeStatus}</small>}
                </div>

                {/* EMPLOYEE MOTTO */}
                <div className="input-control">
                    <label htmlFor="employeeMotto" className="mb-2">Employee Motto</label>
                    <input 
                        type="text" 
                        id="employeeMotto"
                        placeholder="employee motto..." 
                        className="border border-gray-200 p-3 rounded-md"
                        {...formik.getFieldProps('employeeMotto')}
                        onBlur={formik.handleBlur}/>
                    {formik.touched.employeeMotto && formik.errors.employeeMotto && <small className="text-red-400">{formik.errors.employeeMotto}</small>}
                </div>

                {/* EMPLOYEE MOTTO */}
                <div className="input-control">
                    <label htmlFor="employeeNoTelp" className="mb-2">Employee No Telp</label>
                    <input 
                        type="number" 
                        id="employeeNoTelp"
                        placeholder="employee no telp..." 
                        className="border border-gray-200 p-3 rounded-md"
                        {...formik.getFieldProps('employeeNoTelp')}
                        onBlur={formik.handleBlur}/>
                    {formik.touched.employeeNoTelp && formik.errors.employeeNoTelp && <small className="text-red-400">{formik.errors.employeeNoTelp}</small>}
                </div>

                {/* IMAGE */}
                <div className="input-control">
                    <label htmlFor="employeeImage" className="mb-2">Image Product</label>
                    <div {...getRootProps()} 
                        className={`border-2 border-dashed px-5 py-10 text-center ${isDragActive? 'border-blue-300' : 'border-gray-300'}`}>
                        <input {...getInputProps()} onBlur={formik.handleBlur}/>
                        {
                            isDragActive ?
                            <p className="">Drop the files here ...</p> :
                            <p className="">Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                    <small>{formik?.values?.employeeImage?.name}</small>
                    {formik.touched.employeeImage && formik.errors.employeeImage && <small className="text-red-400">{formik.errors.employeeImage}</small>}
                </div>
                <div className="mt-10 flex items-center space-x-3">
                <button className={`btn ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'} flex items-center`} type="submit">
                        {isLoading && <div className="animate-spin ease duration-300 w-3 h-3 mr-2 border-2 border-white"/>}
                        {isLoading ? 'Loading, please wait' : 'Submit'}
                    </button>
                    <button type="buttom" className="btn bg-gray-500" onClick={handleBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
