import React from 'react'


const InputField = ({inputType, ...rest}) => {
    switch(inputType) {
        case 'textarea' : 
            return <textarea cols="30" rows="5" {...rest}></textarea>
        default :
            return <input {...rest} />
    }
}

const InputControl = ({id, type, title, formik, inputType = null, image = null, placeholder = null, children}) => {

    return (
        <div className="input-control">
            <label htmlFor={id} className="mb-2">{title}</label>
            {image ? children : (
                <InputField
                    type={type}
                    id={id} 
                    placeholder={`${placeholder || title.toLowerCase()}...`}
                    className="border border-gray-200 p-3 rounded-md"
                    {...formik.getFieldProps(id)}
                    onBlur={formik.handleBlur}
                    inputType={inputType}/>
            )}
            {formik.errors[id] && formik.touched[id] && (
                <small className="text-red-400">{formik.errors[id]}</small>
            )}
        </div>
    )
}



export default InputControl
