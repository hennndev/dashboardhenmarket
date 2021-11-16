import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'

const Analytics = () => {
    
    const transactions = useSelector(state => state.transactions)

    const months = []
    const avgIncomeInMonth = []
    const monthsSort = moment.monthsShort()
    const monthsStartToEnd = Array(Math.floor(moment("11-31-2022").diff(moment('11-15-2021'), 'months', true))).fill()
    let monthStart = moment('11-15-2021').format('M')

    const allMonthInTr = {}

    const formatTransactions =  transactions.map(tr => {
        return {
            month: new Date(tr.timestamp).getMonth() + 1,
            totalPrice: tr.totalPrice
        }
    }).reverse()
    
    
    formatTransactions.forEach(({month,...val}) => allMonthInTr[month] = month)

   
    monthsStartToEnd.forEach(() => {
        if(monthStart > 12) monthStart = 1
        months.push(
            monthsSort[monthStart - 1]
        )
        avgIncomeInMonth.push(
            allMonthInTr[monthStart] ? formatTransactions.filter(val => val.month === allMonthInTr[monthStart]).reduce((currVal, val) => currVal += val.totalPrice, 0) : 0
        )
        monthStart++
    })


    const data = {
        labels: months,
        datasets: [
            {
                label: '2021 - 2022',
                data: avgIncomeInMonth,
                fill: false,
                backgroundColor: '#2FDD92',
                borderColor: '#2FDD92' 
            }
        ]
    }

    const options = {
        scales: {
            y: {
              beginAtZero: true
            }
          }
    }
    

    return (
        <div className="page-container grid place-items-center">
            <div className="w-11/12 bg-white p-10 rounded-md">
                <h1 className="text-2xl font-medium mb-5 text-center">Total Income 2021 - 2022</h1>
                <Line data={data} options={options}/>
            </div>
        </div>
    )
}

export default Analytics
