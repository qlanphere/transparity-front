import React from 'react'
import './transaction.css'

const Transaction = (props) => {
    return (
        <div className="transaction">
            <h1 className="transaction-amount">${props.amount}</h1>
            <h3>{props.charity_name}</h3>
            <p>{props.date}</p>
        </div>
    )
}

export default Transaction
