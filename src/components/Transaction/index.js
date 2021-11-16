import React from 'react'
import './transaction.css'
import { useAuthContext } from '../../contexts/auth';

const Transaction = (props) => {

    const { currentUser } = useAuthContext()
    return (
        <div className="transaction">
            <h1 className="transaction-amount">${props.amount}</h1>
            {currentUser.sub.user == 'user' ? <h3>{props.charity_name}</h3> : <h3 className="donate-email">{props.user_name}</h3>}
            <p>{props.date}</p>
        </div>
    )
}

export default Transaction
