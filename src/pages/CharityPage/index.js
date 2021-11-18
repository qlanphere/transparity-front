import React, { useContext, useState, useEffect } from "react";
import Post from "../../components/Post";
import { useAuthContext } from "../../contexts/auth";
import { useCharityContext } from "../../contexts/charityContext";
import Button from "../../components/CreateBio/BioButton"
import PostButton from '../../components/CreatePost/PostButton'
import { usePostContext } from "../../contexts/postContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Footer from '../../components/Footer'
const cors = require("cors");

const host = "https://transparity.herokuapp.com";

const CharityPage = () => {
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { charityName, setCharityName } = useCharityContext();
  const { currentUser } = useAuthContext();
  const { updatedBio, setUpdatedBio, posted, setPosted } = usePostContext()
  const [bio, setBio] = useState({ avatar: 'https://wwflac.awsassets.panda.org/img/carrera_zoo_3_549988.jpg', bio: '' })


  useEffect(() => {

    setCharityName(window.location.pathname.split('/')[2].split('%20').join(' '))
  }, [])

  useEffect(() => {

    const getPosts = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
        };
        const response = await fetch(`${host}/charity/${window.location.pathname.split('/')[2]}`, options);
        let data = await response.json();

        setBio(({
          avatar: 'https://wwflac.awsassets.panda.org/img/carrera_zoo_3_549988.jpg',
          bio: data.bio
        }))
        // need to sort posts by most recent
        if (data.posts.length != 0) {
          let postArray = data.posts.map((post) => (
            <Post
              title={post.title}
              description={post.description}
              image={post.img}
              date={post.creation_date}
              hidden="true"
              name={data.name}
              postId={post.post_id}
              goal={post.goal}
            />
          ));
          //postArray.push(<ToastContainer />)

          const sortedArr = postArray.sort(function (a, b) {
            if (a.creation_date > b.creation_date) return -1;
            if (a.creation_date < b.creation_date) return 1;
            return 0;
          });

          setPosts(sortedArr.reverse())
        } else {
          setPosts(<h3>You have no posts yet!</h3>)
        }
        setUpdatedBio(false)
        // sortedArr != [] ? setPosts(sortedArr.reverse()) : setPosts(<h3>You have no posts yet!</h3>)
        setPosted(false)
      } catch (err) {
        console.log(err)
      }
    }
    getPosts();
  }, [updatedBio, posted]);



  const createBio = () => {
    try {
      return currentUser.sub.name == charityName ? <Button /> : <></>
    } catch { return false }
  }

  const createPost = () => {
    try {
      return currentUser.sub.name == charityName ? <PostButton /> : <></>
    } catch { return false }
  }
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1 className="profile-page-title">{charityName}'s Profile Page</h1>
      <div id="bio" className='flex'>
        <img className="bio-img" src={bio.avatar} />
        <h3 className="bio-description">{bio.bio}</h3>
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <div className="mx-2">
      {createBio()}
        </div>
        <div className="mx-2">
      {createPost()}
        </div>
      </div>
      <div className="grid-display">{posts}</div>
      {reviews}
      <Footer />
    </div>
  );
};

export default CharityPage;
