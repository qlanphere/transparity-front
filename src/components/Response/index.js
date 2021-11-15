import React from 'react'

const Response = (props) => {
    return (
        <div>
            <p>{props.description}</p>
            <p>{props.date}</p>
            <p>{props.name}</p>
        </div>
    )
}

export default Response
