import React from 'react'

const Ticket = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <p>{props.date}</p>
        </div>
    )
}

export default Ticket
