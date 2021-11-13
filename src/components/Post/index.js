import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './Post.css'

import { useCharityContext } from '../../contexts/charityContext';
import { useHistory } from 'react-router-dom';

const Post = (props) => {

    const { setCharityName } = useCharityContext()
    const history = useHistory();

    const handleClick = (name) => {
        setCharityName(name)
        history.push(`/charities/${name}`)

    }

    return (
        <>
            <div className="card-container">
                <img className="card-img" src={props.image} width={150} />
                <div className="card-info">
                    <h1 className="card-title">{props.title}</h1>
                    <p className="card-description">{props.description}</p>
                    <p>{props.goal}</p>
                    <p className="card-date">{props.date}</p>

                    <button className="t-button" size="small">Donate</button>
                    <button className="t-button" size="small" onClick={() => handleClick(props.name)}>Learn More</button>
                </div>
            </div>
        </>
    );
}

export default Post
