import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/actions'
import { handleAdmin } from '../store/reducers/appReducer'

const Login = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                const res = await login(values.email, values.password)
                if(res) {
                    setIsLoading(false)
                    setIsError(null)
                    dispatch(handleAdmin(res.user))
                    props.history.push('/')
                }
            } catch(err) {
                console.log(err)
                setIsError(err)
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email('Email not valid'),
            password: Yup.string().required('Password is required').min(8, 'Minimum password is 8 character or more')
        })
    })

    return (
        <div className="flex items-center justify-center px-5">
            <form className="mt-24 shadow-lg rounded-md w-modal h-96 bg-white p-5" onSubmit={formik.handleSubmit}>
                <h1 className="text-center text-xl font-medium mb-5">Login Form</h1>
                {/* EMAIL */}
                <div className="input-control">
                    <label htmlFor="email" className="mb-2">Email</label>
                    <input 
                        type="email" 
                        className="border border-gray-300 py-1 px-3 outline-none rounded" 
                        placeholder="input your email..."
                        {...formik.getFieldProps('email')}
                        onBlur={formik.handleBlur}/>
                    {formik.touched.email && formik.errors.email && <small className="text-red-400">{formik.errors.email}</small>}
                </div>
                {/* PASSWORD */}
                <div className="input-control">
                    <label htmlFor="email" className="mb-2">Password</label>
                    <input 
                        type="password" 
                        className="border border-gray-300 py-1 px-3 outline-none rounded" 
                        placeholder="input your password..."
                        {...formik.getFieldProps('password')}
                        onBlur={formik.handleBlur}/>
                    {formik.touched.password && formik.errors.password && <small className="text-red-400">{formik.errors.password}</small>}
                </div>
                <div className="grid place-items-center mt-5">
                    <button className={`btn ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'} flex items-center`} type="submit">
                        {isLoading && <div className="animate-spin ease duration-300 w-3 h-3 mr-2 border-2 border-white"/>}
                        {isLoading ? 'Loading, please wait' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
