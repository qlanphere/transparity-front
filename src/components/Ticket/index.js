import React from 'react'


const Ticket = (props) => {
    return (
        <div>
            
            <h2><a href={`/tickets/${props.id}`}>{props.title}</a></h2>
            <h3>{props.charityName}</h3>
            <p>{props.description}</p>
            <p>{props.date}</p>
        </div>
    )
}

export default Ticket
