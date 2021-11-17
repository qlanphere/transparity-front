import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../contexts/auth'
import Transaction from '../../components/Transaction'
import './Donations.css';
import Footer from '../../components/Footer';

const host = 'https://transparity.herokuapp.com'
// const host = 'http://localhost:5000'

const DonationsPage = () => {

    const { currentUser } = useAuthContext()
    const [donations, setDonations] = useState(0)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {

        const getDonations = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                mode: 'cors',
            }
            let response = await fetch(`${host}/user/${currentUser.sub.id}`, options)
            let userData = await response.json()
            let donationData = userData.donations

            let transactionArray = donationData.map(transaction =>
                <Transaction amount={transaction.amount}
                    charity_name={transaction.charity_name}
                    user_name={transaction.user_name}
                    date={transaction.date} />)

            let donationArray = donationData.map(element => element.amount)
            setDonations(donationArray.reduce((a, b) => a + b, 0))
            setTransactions(transactionArray)
        }

        getDonations()

    }, [])

    return (
        <div className="donations-history-page">
            <h1 className="donations-history-title">{currentUser.user == 'charity' ? `Donations Received` : `${currentUser.sub.name}'s Total Amount Donated: `}</h1>
            <h3 className="total-donated"><span className="green">$</span>{donations}</h3>
            <div className="grid-display">{transactions}</div>
            <Footer />
        </div>
    )
}

export default DonationsPage
