import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import InputControl from '../UI/InputControl'
import { addProduct, editProduct } from '../../store/actions/actions'

const AddProduct = ({oldData, handleBack}) => {

    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            productName: '',
            productImage: null,
            productPrice: '',
            productQty: '',
            productDesc: ''
        },
        onSubmit: (values) => {
            oldData ? editProduct(oldData, values, setIsLoading, handleBack) : addProduct(values, setIsLoading, handleBack)
        },
        validationSchema: Yup.object({
            productName: Yup.string().required('Product name is required!'),
            productPrice: Yup.number().required('Product price is required!').min(1, 'Minimum price is more than 0'),
            productQty: Yup.number().required('Product quantity is required!'),
            productDesc: Yup.string().required('Product description is required!'),
            productImage: Yup.mixed().required('Product image is required')
                                    .test('fileSize', 'Maximum size image is < 1MB', 
                                    value => typeof value !== 'string' ? value?.size <= 1000000 : value.length > 1)
        })
    })


    useEffect(() => {
        if(oldData) {
            formik.setValues({
                productName: oldData.productName,
                productImage: oldData.productImage,
                productPrice: oldData.productPrice,
                productQty: oldData.productQty,
                productDesc: oldData.productDesc
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oldData])

    const onDrop = (acceptedFiles) => {
        formik.setValues({
            ...formik.values,
            productImage: acceptedFiles[0]
        })
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    return (
        <div className="bg-white">
            <form className="p-5" onSubmit={formik.handleSubmit}>
                <h1 className="text-center text-2xl text-gray-700 font-bold mb-10">Add Product</h1>

                {/* PRODUCT NAME */}
                <InputControl 
                    id="productName"
                    title="Product Name"
                    type="text"
                    formik={formik}/>

                {/* PRODUCT PRICE */}
                <InputControl 
                    id="productPrice"
                    title="Product Price"
                    type="number"
                    formik={formik}/>

                {/* PRODUCT QUANTITY */}
                <InputControl 
                    id="productQty"
                    title="Product Quantity"
                    type="number"
                    formik={formik}/>

                {/* PRODUCT DESC */}
                <InputControl 
                    id="productDesc"
                    title="Product Description"
                    formik={formik}
                    inputType="textarea"/>

                {/* PRODUCT IMAGE */}
                <InputControl id="productImage" title="Product Image" formik={formik} image> 
                    <div {...getRootProps()} 
                        className={`border-2 border-dashed px-5 py-10 text-center ${isDragActive ? 'border-blue-300' : 'border-gray-300'}`}>
                        <input {...getInputProps()} onBlur={formik.handleBlur}/>
                        {
                            isDragActive ?
                            <p className="">Drop the files here ...</p> :
                            <p className="">Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                    <small>{formik?.values?.productImage?.name || oldData?.productImageName}</small>
                </InputControl>


                <div className="mt-10 flex items-center space-x-3">
                    <button 
                        className={`btn ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'} flex items-center`} 
                        type="submit">
                        {isLoading && <div className="btn-loading"/>}
                        {isLoading ? 'Loading, please wait' : 'Submit'}
                    </button>
                    <button className={`btn bg-gray-500 ${isLoading && 'cursor-not-allowed'}`} onClick={handleBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
