import React, { useEffect, useState } from 'react'
import Ticket from '../../components/Ticket'
import { useAuthContext } from '../../contexts/auth'
import { MessageList } from 'react-chat-elements'
import Response from '../../components/Response'

const host = 'https://transparity.herokuapp.com'
// const host = 'http://localhost:5000'

const TicketId = () => {

    const { currentUser } = useAuthContext()
    const path = window.location.pathname.split('/')
    const id = path[path.length - 1]
    const [ticketData, setTicketData] = useState('')
    const [responseFormData, setResponseFormData] = useState({ name: currentUser.sub.name, user_type: currentUser.sub.user, description: "" })
    const [responseData, setResponseData] = useState([])
    const [recipientFormData, setRecipientFormData] = useState({ name: '', user_type: currentUser.sub.user=='charity' ? 'user':'charity', description: "" })

    const [status, setStatus] = useState(true)
    const [newResponse, setNewResponse] = useState(false)

    const handleCloseTicket = async () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            mode: 'cors',
            body: JSON.stringify({status: false})
        }
        await fetch(`${host}/ticket/status/${id}`, options)
        setStatus(false)
    }
    const canIReply = () => {
        try {
        return responseData ? (responseData[responseData.length - 1].props.name == currentUser.sub.name) : false
        } catch { return false}
    }
    const handleInput = e => {
        setResponseFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setRecipientFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setRecipientFormData(prev => ({...prev, name: ticketData.props.charityName}))
    }
    const formIncomplete = () => Object.values(responseFormData).some(v => !v) || canIReply()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const options1 = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                mode: 'cors',
                body: JSON.stringify(responseFormData)
            }
            const options2 = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                mode: 'cors',
                body: JSON.stringify(recipientFormData)
            }
            let recipientType = currentUser.sub.user=='charity' ? 'user':'charity'

            await fetch(`${host}/${currentUser.sub.user}/ticket/${id}`, options1)
            await fetch(`${host}/${recipientType}/ticket/${id}`, options2)

            setNewResponse(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            mode: 'cors'
        }
        
        const getTicket = async () => {
            const response = await fetch(`${host}/tickets/${id}`, options)
            const ticket = await response.json()
            setStatus(ticket.status ? true: false)
            setTicketData(<Ticket title={ticket.name} description={ticket.description} date={ticket.ticket_date} id={ticket.ticket_id} charityName={ticket.charity_name} />)
            setResponseData(ticket.res.map(message => <Response description={message.description} date={message.date} name={message.name} />))
        }

        getTicket()
        
        setNewResponse(false)
        

    }, [status, newResponse])

    return (
        <>
            <h1>Ticket {id}</h1>
            {ticketData}
            {currentUser.sub.user == 'user' ? <input type = "button" onClick = {handleCloseTicket} value = "Close Ticket"></input>: <></>}
            <div>
                {responseData}
            </div>

            <form className="new-ticket-form" onSubmit={(e) => handleSubmit(e)}>
                <textarea type="text" name="description" value={responseFormData.description} onChange={handleInput} placeholder="Enter response" />
                <input type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} />
            </form>
        </>
    )
}

export default TicketId
