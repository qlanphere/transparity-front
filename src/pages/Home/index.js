import React, {useContext, useState, useEffect} from 'react'
import Post from '../../components/Post'

const host = "http://localhost:5000"

const Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        
        const getPosts = async () => {
            const response = await fetch(host)
            let data = await response.json()
            // need to sort posts by most recent 
            let postArray = data.map(post => 
                                    <Post title = {post.title}
                                        description = {post.description}
                                        image = {post.image}
                                        date = {post.creation_date} />)
            setPosts(postArray)
        }

        getPosts()

    }, [])


    return (
        <>
            <div className = 'd-flex justify-content-center align-items-center flex-column'>
                {posts}
                {/* <Post title ="stuff" description = "here is content" image = "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg" />
                <Post title ="stuff" description = "here is content" image = "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg" /> */}
            </div>
        </>
    )
}

export default Home
