import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'

const host = 'https://transparity.herokuapp.com'

const Tickets = () => {

    const {currentUser} = useAuthContext()
    const [openTickets, setOpenTickets] = useState([])
    const [closedTickets, setClosedTickets] = useState([])

    useEffect = (() => {

        const getTickets = async () => {

            let response = await fetch(`${host}/ticket/${currentUser.sub.id}`)
            let ticketData = await response.json()
            console.log(ticketData)

        }
        getTickets()
    }, [])

    return (
        <>
            <div>
                <h1>Open Tickets</h1>

            </div>
            <div>
                <h1>Closed Tickets</h1>

            </div>
        </>
    )
}

export default Tickets
