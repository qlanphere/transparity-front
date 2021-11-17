import React, { useState } from 'react'
import './Post.css'
// import EditPost from '../CreatePost/Edit'
import DispayRating from '../../components/DisplayRating'
import EditPost from '../../components/CreatePost/Edit'

import { useCharityContext } from '../../contexts/charityContext';
import { usePostContext } from '../../contexts/postContext';

import EditButton from '../../components/CreatePost/EditButton'

import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth';

const base64 = require('base64topdf');
const host = "https://transparity.herokuapp.com"
// const host = "http://localhost:5000"

const Post = (props) => {
    const { postId, setPostId, emailP, setEmailP } = usePostContext()
    const { charityName, setCharityName, charityId, setCharityId } = useCharityContext()
    const { currentUser } = useAuthContext()
    const [modalShow, setModalShow] = useState(false);
    const [pdf, setPdf] = useState('')
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

    const handlePDF = async (postId, name) => {
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
        const response = await fetch(`${host}/charity/post/${postId}`, options)
        const data = await response.json()
        console.log(data)

        function showPdfInNewTab(base64Data) {
            let pdfWindow = window.open("");
            pdfWindow.document.write(`<iframe width='100%' height='100%' src=${encodeURI(base64Data)} + "'></iframe>`);
        }

        showPdfInNewTab(data.pdf)

    }

    const donate = () => {
        try {
            return currentUser && currentUser.sub.user == 'user' ? <button className="t-button" size="small" onClick={() => handleDonate(props.post_id, props.name)}>Donate</button> : <></>
        } catch { return false }
    }

    const review = () => {
        try {
            return currentUser && currentUser.sub.user == 'user' ? <button className="t-button" size="small" onClick={() => handleReview(props.post_id)}>Review</button> : <></>
        } catch { return false }
    }


    return (
        <>
            <div className="card-container">
                <div className="card-info">
                    {currentUser && props.name === currentUser.sub.name && <EditButton postId={props.postId}>Edit</EditButton>}
                    <h1 className="card-title">{props.title}</h1>
                    <h2 className="charity-name">{props.name}</h2>
                    <img className="card-img" src={props.image} width={150} />
                    <p className="card-description">{props.description}</p>
                    <p>{props.goal}</p>
                    <p className="card-date">{props.date}</p>
                    <p className="card-date">{props.target_date}</p>
                    <EditPost show={modalShow} onHide={() => setModalShow(false)} postId={props.postId} />
                    {donate()}
                    {currentUser ? <button hidden={props.hidden} className="t-button" size="small" onClick={() => handleClick(props.name)}>Learn More</button> : <></>}
                    {currentUser ? <button target="_blank" hidden={props.hidden} className="t-button" size="small" onClick={() => handlePDF(props.postId, props.name)}>See Report</button> : <></>}
                    {review()}
                    <DispayRating charity={props.name} />
                </div>

            </div>
        </>
    );
}

export default Post
