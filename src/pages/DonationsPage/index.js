import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'

const host = 'https://transparity.netlify.app'

const DonationsPage = () => {

    const {currentUser} = useAuthContext()
    const [donations, setDonations] = useState(0)

    let dummyData = [{amount: 12}, {amount: 25}, {amount: 72}]

    useEffect (() => {
        
        const getDonations = async () => {
            // let response = await fetch(`${host}/${currentUser.id}`)
            // let userData = await response.json()
            // let donationData = userData.donations
            let donationArray = dummyData.map(element => element.amount)
            setDonations(donationArray.reduce((a, b) => a + b, 0)) 
        }

        getDonations()

    }, [])

    return (
        <>
            <h1>{currentUser.user_type=='charity' ? `Donations Received`:`${currentUser.name}'s Donations'`}</h1>
            <h3>${donations}</h3>
        </>
    )
}

export default DonationsPage
