import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Ticket from '../../components/Ticket'
import { useAuthContext } from '../../contexts/auth'
const cors = require('cors')

const host = 'https://transparity.herokuapp.com'
// const host = 'http://localhost:5000'

const Tickets = () => {

    const {currentUser} = useAuthContext()
    const [openTickets, setOpenTickets] = useState([])
    const [closedTickets, setClosedTickets] = useState([])
    const [ticketFormData, setTicketFormData] = useState({name: "", description: "", res: [], status: true})

    const handleInput = e => setTicketFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const formIncomplete = () => Object.values(ticketFormData).some(v => !v)

    const handleSubmit = async () => {
        try {
            const options = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`},
                mode: 'cors',
                body: JSON.stringify(ticketFormData)
            }
            console.log(ticketFormData)
        await fetch(`${host}/ticket/${currentUser.sub.id}`, options)
        // resolve('Ticket created succesful')
        } catch (err) {
            // reject(`Ticket Error: ${err}`);
            console.log(err)
        }

    }

    useEffect(() => {

        const getTickets = async () => {
            console.log(`${host}/user/${currentUser.sub.id}`)
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`},
                mode: 'cors'
            }
            const response = await fetch(`${host}/user/${currentUser.sub.id}`, options)
            const ticketData = await response.json()
            let ticketArray = ticketData.tickets
            if (ticketArray) {
                let openTicks = ticketArray.filter(ticket => ticket.status == true)
                let closedTicks = ticketArray.filter(ticket => ticket.status == false)
                setOpenTickets(openTicks.map(ticket => <Ticket title = {ticket.name} description = {ticket.description} date = {ticket.ticket_date} id = {ticket.ticket_id} />))
                setClosedTickets(closedTicks.map(ticket => <Ticket title = {ticket.name} description = {ticket.description} date = {ticket.ticket_date} id = {ticket.ticket_id} />))
            }

        }
        getTickets()
    }, [])

    return (
        <>
        <div>
            <h1>Create New Ticket</h1>
            <form onSubmit={handleSubmit}>
                <input type = "text" name="name" value={ticketFormData.name} onChange={handleInput} placeholder="Title" />
                <input type = "text" name="description" value={ticketFormData.description} onChange={handleInput} placeholder="description" />
                <input type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()}/>
            </form>

        </div>
            <div>
                <h1>Open Tickets</h1>
                    {openTickets}
            </div>
            <div>
                <h1>Closed Tickets</h1>
                    {closedTickets}
            </div>
        </>
    )
}

export default Tickets
