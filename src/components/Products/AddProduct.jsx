import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
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
            console.log(values)
            {oldData ? editProduct(oldData, values, setIsLoading, handleBack) : addProduct(values, setIsLoading, handleBack)}
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
                <div className="input-control">
                    <label htmlFor="productName" className="mb-2">Product Name</label>
                    <input 
                        type="text" 
                        id="productName" 
                        placeholder="product name..." 
                        className="border border-gray-200 p-3 rounded-md"
                        {...formik.getFieldProps('productName')}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.productName && formik.touched.productName && (
                        <small className="text-red-400">{formik.errors.productName}</small>
                    )}
                </div>

                {/* PRODUCT PRICE */}
                <div className="input-control">
                    <label htmlFor="productPrice" className="mb-2">Product Price</label>
                    <input 
                        type="number" 
                        id="productPrice"
                        placeholder="product price..." 
                        className="border border-gray-200 p-3 rounded-md"
                        {...formik.getFieldProps('productPrice')}
                        onBlur={formik.handleBlur}/>
                    {formik.touched.productPrice && formik.errors.productPrice && <small className="text-red-400">{formik.errors.productPrice}</small>}
                </div>

                {/* PRODUCT QUANTITY */}
                <div className="input-control">
                    <label htmlFor="productQty" className="mb-2">Product Quantity</label>
                    <input 
                        type="number" 
                        id="productQty"
                        placeholder="product quantity..." 
                        className="border border-gray-200 p-3 rounded-md"
                        {...formik.getFieldProps('productQty')}
                        onBlur={formik.handleBlur}/>
                    {formik.touched.productQty && formik.errors.productQty && <small className="text-red-400">{formik.errors.productQty}</small>}
                </div>

                {/* PRODUCT DESC */}
                <div className="input-control">
                    <label htmlFor="productDesc" htmlFor="productDesc" className="mb-2">Product Description</label>
                    <textarea 
                        id="productDesc" 
                        cols="30" rows="5" 
                        className="border border-gray-200 p-3 rounded-md"
                        {...formik.getFieldProps('productDesc')}
                        onBlur={formik.handleBlur}>
                    

                    </textarea>
                    {formik.touched.productDesc && formik.errors.productDesc && <small className="text-red-400">{formik.errors.productDesc}</small>}
                </div>

                {/* IMAGE */}
                <div className="input-control">
                    <label htmlFor="imageProduct" className="mb-2">Image Product</label>
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
                    {formik.touched.productImage && formik.errors.productImage && <small className="text-red-400">{formik.errors.productImage}</small>}
                </div>
                <div className="mt-10 flex items-center space-x-3">
                    <button className={`btn ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'} flex items-center`} type="submit">
                        {isLoading && <div className="animate-spin ease duration-300 w-3 h-3 mr-2 border-2 border-white"/>}
                        {isLoading ? 'Loading, please wait' : 'Submit'}
                    </button>
                    <button className="btn bg-gray-500" onClick={handleBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
