import React from 'react'
import NumberFormat from 'react-number-format'

const FormatPrice = ({value, summary = null, ptag = null, classes = null}) => {
    return <NumberFormat
            value={value}
            displayType="text"
            thousandSeparator={true}
            className={classes ? classes : "text-center px-5 font-medium"}
            prefix="Rp"
            renderText={(value, props) => {
                return summary ? <span {...props}>{value}</span> : <td {...props}>{value}</td>
            }}/>
}

export default FormatPrice
