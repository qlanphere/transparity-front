import React from 'react'
import './Ticket.css'


const Ticket = (props) => {
    return (
        <div className="ticket-container">
            <h3 className="ticket-charity">{props.charityName}</h3>
            <h4 className="ticket-title"><a href={`/tickets/${props.id}`}>{props.title}</a></h4>
            <p className="ticket-description">{props.description}</p>
            <p className="ticket-date">{props.date}</p>
        </div>
    )
}

export default Ticket
