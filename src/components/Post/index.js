import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './Post.css'
// import EditPost from '../CreatePost/Edit'
import DispayRating from '../../components/DisplayRating'
import EditPost from '../../components/CreatePost/Edit'

import { useCharityContext } from '../../contexts/charityContext';
import { usePostContext } from '../../contexts/postContext';

import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth';

const host = "https://transparity.herokuapp.com"
// const host = "http://127.0.0.1:5000"

const Post = (props) => {
    const { setPostId, emailP, setEmailP } = usePostContext()
    const { charityName, setCharityName, charityId, setCharityId } = useCharityContext()
    const { currentUser } = useAuthContext()
    const [modalShow, setModalShow] = useState(false);
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

    function handleEdit(e){
        
        <EditPost postId = {props.post_id}/>
    }

    return (
        <>
            <div className="card-container">
                <div className="card-info">
                    <h1 className="card-title">{props.title}</h1>
                    <h2 className="charity-name">{props.name}</h2>
                    <img className="card-img" src={props.image} width={150} />
                    <p className="card-description">{props.description}</p>
                    <p>{props.goal}</p>
                    <p className="card-date">{props.date}</p>
                    <p className="card-date">{props.target_date}</p>

                    {/* insert button for edit post */}
                    <EditPost show={modalShow} onHide={() => setModalShow(false)} />
                    {currentUser.sub.user == 'user' ? <button className="t-button" size="small" onClick={() => handleDonate(props.post_id, props.name)}>Donate</button> : <></>}
                    <button hidden={props.hidden} className="t-button" size="small" onClick={() => handleClick(props.name)}>Learn More</button>
                    {currentUser.sub.user == 'user' ? <button className="t-button" size="small" onClick={() => handleReview(props.post_id)}>Review</button> : <></>}
                    <DispayRating charity={props.name} />
                    { <button onClick={handleEdit}>...</button>}
                    {/* props.name === currentUser.sub.user &&  */}
                </div>
            </div>

        </>
    );
}

export default Post
