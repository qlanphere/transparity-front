import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Ticket from '../../components/Ticket'
import { useAuthContext } from '../../contexts/auth'
import './Tickets.css'
const cors = require('cors')


const host = 'https://transparity.herokuapp.com'
// const host = 'http://localhost:5000'

const Tickets = () => {

    const { currentUser } = useAuthContext()
    const [openTickets, setOpenTickets] = useState([])
    const [closedTickets, setClosedTickets] = useState([])
    const [ticketFormData, setTicketFormData] = useState({ name: "", description: "", res: [], status: true, charityName: ""})
    const [charities, setCharities] = useState([])
    const [newTicket, setNewTicket] = useState(false)

    const handleInput = e => setTicketFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const formIncomplete = () => Object.values(ticketFormData).some(v => !v)


    const optionsGet = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        mode: 'cors'
    }

    const getCharityId = async (name) => {
        let response = await fetch(`${host}/charity/${name}`, optionsGet)
        let charityData = await response.json()
        return charityData._id
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            let charityId = await getCharityId(ticketFormData.charityName)
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                mode: 'cors',
                body: JSON.stringify(ticketFormData)
            }
            console.log(ticketFormData)
            await fetch(`${host}/ticket/${currentUser.sub.id}`, options)
            await fetch(`${host}/ticket/${charityId}`, options)
            setNewTicket(true)

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {

        const getTickets = async () => {
            console.log(`${host}/user/${currentUser.sub.id}`)
            const response = await fetch(`${host}/user/${currentUser.sub.id}`, optionsGet)
            const ticketData = await response.json()
            let ticketArray = ticketData.tickets
            if (ticketArray) {
                let openTicks = ticketArray.filter(ticket => ticket.status == true)
                let closedTicks = ticketArray.filter(ticket => ticket.status == false)
                console.log(ticketArray)
                setOpenTickets(openTicks.map(ticket => <Ticket title={ticket.name} description={ticket.description} date={ticket.ticket_date} id={ticket.ticket_id} charityName = {ticket.charity_name}/>))
                setClosedTickets(closedTicks.map(ticket => <Ticket title={ticket.name} description={ticket.description} date={ticket.ticket_date} id={ticket.ticket_id} charityName = {ticket.charity_name}/>))
            }
        }

        const getCharities = async () => {
            const response = await fetch(`${host}/home`, optionsGet)
            const userData = await response.json()
            const charityArray = userData.filter(user => user.user_type=='charity')
            const dropdownArray  = charityArray.map(c => <option value = {c.name}>{c.name}</option>)
            setCharities(dropdownArray)
        }


        getTickets()
        getCharities()
        setNewTicket(false)
    }, [newTicket])

    return (
        <>
            <div className="tickets-page">
                <h1 className="new-ticket">Create a New <span className="green">Ticket</span></h1>
                <form className="new-ticket-form" onSubmit={(e) => handleSubmit(e)}>
                <select value = {ticketFormData.charityName} name = "charityName" onChange = {handleInput}>
                        {charities}
                    </select>
                    <input type="text" name="name" value={ticketFormData.name} onChange={handleInput} placeholder="Title" />
                    <textarea type="text" name="description" value={ticketFormData.description} onChange={handleInput} placeholder="description" />
                    <input id="ticket-button" type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} />
                </form>

            </div>
            <div className="open-tickets">
                <h1>Open <span className="green">Tickets</span></h1>
                {openTickets}
            </div>
            <div className="closed-tickets">
                <h1>Closed Tickets</h1>
                {closedTickets}
            </div>
        </>
    )
}

export default Tickets
