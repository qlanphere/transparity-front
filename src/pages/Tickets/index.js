import React, { useState, useEffect, Component } from 'react'
import Select from 'react-select'
import { Dropdown } from 'react-bootstrap'
import axios from 'axios';
import Ticket from '../../components/Ticket'
import { useAuthContext } from '../../contexts/auth'
const cors = require('cors')


// const host = 'https://transparity.herokuapp.com'
const host = 'http://localhost:5000'

const Tickets = () => {

    const { currentUser } = useAuthContext()
    const [openTickets, setOpenTickets] = useState([])
    const [closedTickets, setClosedTickets] = useState([])
    const [ticketFormData, setTicketFormData] = useState({ name: "", description: "", res: [], status: true, charityName: ""})
    const [charities, setCharities] = useState([])

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
        let response = await fetch(`${host}/charities/${name}`, optionsGet)
        let charityData = await response.json()
    }

    const handleSubmit = async () => {
        try {
            // getCharityId()
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
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {

        const getTickets = async () => {
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
    }, [])

    return (
        <>
            <div>
                <h1>Create New Ticket</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <select value = {ticketFormData.charityName} name = "charityName" onChange = {handleInput}>
                        {charities}
                    </select>
                    <input type="text" name="name" value={ticketFormData.name} onChange={handleInput} placeholder="Title" />
                    <input type="text" name="description" value={ticketFormData.description} onChange={handleInput} placeholder="description" />
                    <input type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} />
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
