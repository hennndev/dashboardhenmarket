import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/actions'
import InputControl from '../components/UI/InputControl'
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
            } catch(error) {
                setIsLoading(false)
                if(error.code === 'auth/user-not-found') {
                    setIsError('Email not valid as admin')
                } else if(error.code === 'auth/wrong-password') {
                    setIsError('Wrong password')
                } else {
                    setIsError(error.code)
                }
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
                
                <InputControl
                    id="email"
                    title="Email"
                    placeholder="input your email"
                    formik={formik}/>
                <InputControl
                    id="password"
                    type="password"
                    title="Password"
                    placeholder="input your password"
                    formik={formik}/>

                <div className="grid place-items-center mt-5">
                    <button className={`btn ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'} flex items-center`} type="submit">
                        {isLoading && <div className="btn-loading"/>}
                        {isLoading ? 'Loading, please wait' : 'Login'}
                    </button>
                    {isError && <small className="mt-2 text-red-400">{isError}</small>}
                </div>
            </form>
        </div>
    )
}

export default Login
