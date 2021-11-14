import React, { useEffect, useState } from 'react'
import Ticket from '../../components/Ticket'
import { useAuthContext } from '../../contexts/auth'

const host = 'https://transparity.herokuapp.com'

const TicketId = () => {

    const {currentUser} = useAuthContext()
    const path = window.location.pathname.split('/')
    const id = path[path.length-1]
    const [ticketData, setTicketData] = useState('')
    const [responseFormData, setResponseFormData] = useState({name: currentUser.sub.name, user_type: currentUser.sub.user, description: ""})
    const [responseData, setResponseData] = useState([])

    const handleInput = e => setResponseFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const formIncomplete = () => Object.values(responseFormData).some(v => !v)

    const handleSubmit = async () => {

        try {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                mode: 'cors',
                body: JSON.stringify(responseFormData)
            }
            currentUser.sub.user=='user' ? await fetch(`${host}/user/ticket/${id}`, options) : await fetch(`${host}/charity/ticket/${id}`, options)
            
        } catch (err) {
            console.log(err)
        }
    }

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
            setTicketData(<Ticket title = {ticket.name} description = {ticket.description} date = {ticket.ticket_date} id = {ticket.ticket_id} charityName = {ticket.charity_name}/>)

        }

        getTicket()

    }, [])

    return (
        <>
            <h1>Ticket {id}</h1>
            {ticketData}

            <form>
            <form className="new-ticket-form" onSubmit={(e) => handleSubmit(e)}>
                    <textarea type="text" name="description" value={responseFormData.description} onChange={handleInput} placeholder="Enter response" />
                    <input type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} />
                </form>
            </form>
        </>
    )
}

export default TicketId
