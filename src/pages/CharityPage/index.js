import React, {useContext, useState, useEffect} from 'react'
import Post from '../../components/Post'
import { useAuthContext } from "../../contexts/auth";
const cors = require('cors')

const host = "https://transparity.herokuapp.com"
// const host = 'http://localhost:5000'

const CharityPage = () => {

    const [posts, setPosts] = useState([])
    const [reviews, setReviews] = useState([])
    const [charityName, setCharityName] = useState('')
    const { currentUser } = useAuthContext();
    console.log(currentUser)

    useEffect(() => {
        
        const getPosts = async () => {
            const charity = window.location.pathname.split('/')[2]
            setCharityName(charity)
            console.log(charityName)
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                mode: 'cors',
            }
            const response = await fetch(`${host}/charity/${charityName}`, options)
            let data = await response.json()
            console.log(data)
            // need to sort posts by most recent 
            let postArray = data.posts.map(post => 
                                    <Post title = {post.title}
                                        description = {post.description}
                                        image = {post.img}
                                        date = {post.creation_date} />)
            setPosts(postArray)
        }

        const getReviews = async () => {
            const response = await fetch(`${host}/feedback/${currentUser.id}`)
        }

    


        getPosts()

    }, [charityName])

    return (
        <div className = 'd-flex justify-content-center align-items-center flex-column'>
                {posts}
                {reviews}
            
        </div>
    )
}

export default CharityPage
