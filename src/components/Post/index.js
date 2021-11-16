import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './Post.css'

import { useCharityContext } from '../../contexts/charityContext';
import { usePostContext } from '../../contexts/postContext';

import { useHistory } from 'react-router-dom';

const host = "https://transparity.herokuapp.com"
// const host = "http://127.0.0.1:5000"

const Post = (props) => {
    const { setPostId, emailP, setEmailP } = usePostContext()
    const { charityName, setCharityName, charityId, setCharityId } = useCharityContext()
    const history = useHistory();

    const handleClick = (name) => {
        setCharityName(name)
        history.push(`/charities/${name}`)
    }

    const handleReview = async (postId) => {
        console.log(postId)
        await setPostId(postId)
        console.log(postId)
        history.push('/feedbackForm')
    }

    const handleDonate = async (postId, name) => {
        console.log(postId)
        await setPostId(postId)
        await setCharityName(name)
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            mode: 'cors',
        }
        const response = await fetch(`${host}/charity/${name}`, options)
        const data = await response.json()
        console.log(data)
        console.log(data["email"])
        setEmailP(data["email"])
        setCharityId(data["_id"])

        history.push('/donate')
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

                    <button className="t-button" size="small" onClick={() => handleDonate(props.post_id, props.name)}>Donate</button>
                    <button className="t-button" size="small" onClick={() => handleClick(props.name)}>Learn More</button>
                    <button className="t-button" size="small" onClick={() => handleReview(props.post_id)}>Review</button>
                </div>
            </div>
        </>
    );
}

export default Post
