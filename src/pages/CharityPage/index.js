import React, {useContext, useState, useEffect} from 'react'
import Post from '../../components/Post'
import { useAuthContext } from "../../contexts/auth";

const host = "https://transparity.herokuapp.com"

const CharityPage = () => {

    const [posts, setPosts] = useState([])
    const [reviews, setReviews] = useState([])
    const [charityName, setCharityName] = useState('')
    const { currentUser } = useAuthContext();
    console.log(currentUser)

    useEffect(() => {
        
        const getPosts = async () => {
            
            setCharityName(window.location)
            console.log(charityName)

            const response = await fetch(`${host}/charity/${currentUser.id}`)
            let data = await response.json()
            // need to sort posts by most recent 
            let postArray = data.map(post => 
                                    <Post title = {post.title}
                                        description = {post.description}
                                        image = {post.image}
                                        date = {post.creation_date} />)
            setPosts(postArray)
        }

        const getReviews = async () => {
            const response = await fetch(`${host}/feedback/${currentUser.id}`)
        }

        getPosts()

    }, [])

    return (
        <div className = 'd-flex justify-content-center align-items-center flex-column'>
                {posts}
                {reviews}
            
        </div>
    )
}

export default CharityPage
