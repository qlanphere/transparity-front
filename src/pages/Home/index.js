import React, { useContext, useState, useEffect } from 'react'
import Post from '../../components/Post'
import { useAuthContext } from '../../contexts/auth'
import './Home.css'

const host = "https://transparity.herokuapp.com"

let dummyData = [{
    name: "Red Cross",
    posts: {
        title: "Title 1", description: "some stuff here 1", image: "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg", creation_date: '10/10/20'
    }
}, {
    name: "Other Charity",
    posts: {
        title: "Title 2", description: "some stuff here 2", image: "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg", creation_date: '10/11/20'
    }
}, {
    name: "Salvation Army",
    posts: {
        title: "Title 3", description: "some stuff here 3", image: "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg", creation_date: '10/12/20'
    }
}]

const Home = () => {

    const [posts, setPosts] = useState([])
    const {currentUser} = useAuthContext()

    useEffect(() => {

        const options = {
            headers: { 'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem("token")}`},
            mode: 'cors'
        }

        const getPosts = async () => {
            //const response = await fetch(`${host}/home`, options)
            //let data = await response.json()
            // need to sort posts by most recent 
            let postArray = dummyData.map(post =>
                <Post title={post.posts.title}
                    description={post.posts.description}
                    image={post.posts.image}
                    date={post.posts.creation_date}
                    name={post.name} />)
            setPosts(postArray)
        }

        getPosts()
        console.log(currentUser)

    }, [])


    return (
        <>

            <div id="home-page" className='d-flex justify-content-end align-items-center flex-column mr-auto'>
                <h1> Home </h1>
                {posts}
                {/* <Post title ="stuff" description = "here is content" image = "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg" />
                <Post title ="stuff" description = "here is content" image = "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg" /> */}
            </div>
        </>
    )
}

export default Home
