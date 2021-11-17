import React from 'react'
import './Response.css'

const Response = (props) => {
    return (
        <div className="ticket-response">
            <p>{props.description}</p>
            <p>{props.date}</p>
            <p>{props.name}</p>
        </div>
    )
}

export default Response
