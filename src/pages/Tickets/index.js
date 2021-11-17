import React, { useState, useEffect } from 'react'
import Ticket from '../../components/Ticket'
import { useAuthContext } from '../../contexts/auth'
import './Tickets.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form'
import Footer from '../../components/Footer'
const cors = require('cors')


const host = 'https://transparity.herokuapp.com'

const Tickets = () => {

    const { currentUser } = useAuthContext()
    const [openTickets, setOpenTickets] = useState([])
    const [closedTickets, setClosedTickets] = useState([])
    const [ticketFormData, setTicketFormData] = useState({ name: "", description: "", res: [], status: true, charityName: "" })
    const [charities, setCharities] = useState([])
    const [validated, setValidated] = useState(false);
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
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
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
            setNewTicket(true)
            setTicketFormData({ name: "", description: "", res: [], status: true, charityName: "" })
            toast.success('Ticket Created Succesfully')

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
                setOpenTickets(openTicks.map(ticket => <Ticket title={ticket.name} description={ticket.description} date={ticket.ticket_date} id={ticket.ticket_id} charityName={ticket.charity_name} />).reverse())
                setClosedTickets(closedTicks.map(ticket => <Ticket title={ticket.name} description={ticket.description} date={ticket.ticket_date} id={ticket.ticket_id} charityName={ticket.charity_name} />).reverse())
            }
        }

        const getCharities = async () => {
            const response = await fetch(`${host}/home`, optionsGet)
            const userData = await response.json()
            const charityArray = userData.filter(user => user.user_type == 'charity')
            const dropdownArray = charityArray.map(c => <option value={c.name}>{c.name}</option>)
            setCharities(dropdownArray)
        }


        getTickets()
        getCharities()
        setNewTicket(false)
    }, [newTicket])

    return (
        <>
            {(currentUser.sub.user != 'charity') ? <div className="tickets-page">
                <h1 className="new-ticket">Create a New <span className="green">Ticket</span></h1>
                <Form noValidate validate={validated} className="new-ticket-form" onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group>
                    <Form.Select value={ticketFormData.charityName} name="charityName" onChange={handleInput} required>
                        {charities}
                    </Form.Select>
                        </Form.Group>
                        <Form.Group>
                    <Form.Control type="text" name="name" minLength="2" value={ticketFormData.name} onChange={handleInput} placeholder="Title" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid title.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" type="text" name="description" minlength="2" value={ticketFormData.description} onChange={handleInput} placeholder="description" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <input id="ticket-button" type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} />
                </Form>

            </div> : <></>}
            <div className="open-tickets">
                <h1>Open <span className="green">Tickets</span></h1>
                {openTickets}
            </div>
            {(currentUser.sub.user != 'charity') ? <div className="closed-tickets">
                <h1>Closed Tickets</h1>
                {closedTickets}
            </div> : <></>}<ToastContainer />
            {/* <Footer /> */}
        </>
    )
}

export default Tickets
