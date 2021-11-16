import React, { useContext, useState, useEffect } from 'react'
import Post from '../../components/Post'
import { useAuthContext } from '../../contexts/auth'
import './Home.css'
import Footer from '../../components/Footer'
import { HdrOnSelectSharp } from '@mui/icons-material'
import Button from '../../components/CreatePost/PostButton'


const host = "https://transparity.herokuapp.com"

const Home = () => {
    const [posts, setPosts] = useState([])
    const { currentUser } = useAuthContext()

    useEffect(() => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            mode: 'cors'
        }

        const getPosts = async () => {
            const response = await fetch(`${host}/home`, options)
            let data = await response.json()
            let arr;
            let newArr = data.map((p) => {
                return p.posts.map(post =>
                    <Post title={post.title}
                        description={post.description}
                        image={post.img}
                        goal={post.goal}
                        date={post.creation_date}
                        name={p.name}
                        post_id={post.post_id}
                    />)

            })
            function flatten(ary) {
                let ret = [];
                for (let i = 0; i < ary.length; i++) {
                    if (Array.isArray(ary[i])) {
                        ret = ret.concat(flatten(ary[i]));
                    } else {
                        ret.push(ary[i]);
                    }
                }
                return ret;
            }
            arr = flatten(newArr)
            console.log(arr)
            const sortedArr = arr.sort(function (a, b) {
                if (a.creation_date > b.creation_date) return -1;
                if (a.creation_date < b.creation_date) return 1;
                return 0;
            });
            setPosts(sortedArr.reverse())
        }


        getPosts()
        console.log(currentUser)

    }, [])

    const create = () => {
        try {
            return currentUser && currentUser.sub.user == 'charity' ? <Button /> : <></>
        } catch { return false }
    }


    return (
        <>

            <div id="home-page" className='d-flex justify-content-end align-items-center flex-column mr-auto'>
                <h1 className="dashboard-title"> Welcome to <span className="charity-mode">Transparity</span> </h1>
                {create()}
                {posts}
                {/* <Post title ="stuff" description = "here is content" image = "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg" />
                <Post title ="stuff" description = "here is content" image = "https://iacharity.org/wp-content/uploads/2020/04/iac-charity-hero-vip-drive.jpg" /> */}
            </div>
        </>
    )
}

export default Home
