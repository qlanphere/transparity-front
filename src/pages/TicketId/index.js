import React, { useEffect, useState } from 'react'
import Ticket from '../../components/Ticket'
import { useAuthContext } from '../../contexts/auth'

const host = 'https://transparity.herokuapp.com'

const TicketId = () => {

    const {currentUser} = useAuthContext()
    const path = window.location.pathname.split('/')
    const id = path[path.length-1]
    const [ticketData, setTicketData] = useState('')

    useEffect(() => {
        const getTicket = async () => {

            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`},
                mode: 'cors'
            }
            const response = await fetch(`${host}/tickets/${id}`, options)
            const ticket = await response.json()
            console.log(ticket)
            setTicketData(<Ticket title = {ticket.name} description = {ticket.description} date = {ticket.ticket_date} id = {ticket.ticket_id} />)

        }

        getTicket()

    }, [])

    return (
        <>
            <h1>Ticket {id}</h1>
            {ticketData}

            <form>

            </form>
        </>
    )
}

export default TicketId
