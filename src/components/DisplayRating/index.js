import React, { useContext, useState, useEffect } from 'react'
// const host = 'https://transparity.herokuapp.com'
const host = 'http://localhost:5000'
let dummyData = [{
    name: "Red Cross",
    posts: {
        post_id: "RWiKTh2",
        title: "Greenpeace", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae facere molestiae eligendi voluptatem saepe vel modi corrupti, ipsum ratione nisi sint, molestias impedit numquam exercitationem nesciunt est eum dolor quas!", image: "https://i.pinimg.com/originals/0c/3b/7f/0c3b7f62c49f3ee684e3478bd3f171e5.jpg", goal: "£20,000", creation_date: '10/10/20',
        reviews:[{
            rating: {
              transparency: "2",
              punctuality: "4",
              comeback: "1",
            },
            description: "hello"
          }]
    }
}, {
    name: "Other Charity",
    posts: {
        title: "Cancer Research UK", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit necessitatibus sequi voluptate quas maiores fugiat cupiditate sapiente in dolorem voluptatibus?", image: "data:image/png;base64,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",
        goal: "£20,000", creation_date: '10/11/20', 
        reviews:[{
            rating: {
              transparency: "5",
              punctuality: "4",
              comeback: "3",
            },
            description: "hi"
          }]
    }
}, {
    name: "Salvation Army",
    posts: {
        title: "British Heart Foundation", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque iste incidunt minima autem tenetur, deserunt nesciunt magnam explicabo suscipit debitis.", image: "https://www.amrc.org.uk/GetImage.aspx?IDMF=53d50048-60e2-4da6-9e38-1b0c59596bc3&w=300&h=200&src=mc", goal: "£20,000", creation_date: '10/12/20',
        reviews:[{
            rating: {
              transparency: "1",
              punctuality: "3",
              comeback: "2",
            },
            description: "hey"
          }]
    }
}]
const DispayRating = () => {
    const [rating,setRating] = useState(0)
    const [allPosts,setAllPosts] = useState([])
    console.log(localStorage.getItem("token"))
    useEffect(() => {

        const getAllPosts = async () => {
            // try {
            //     const options = {
            //       method: 'GET',
            //       headers: {
            //         'Content-Type': 'application/json',
            //         "Access-Control-Allow-Origin": "*",
            //         "Authorization": `Bearer ${localStorage.getItem("token")}`
            //       },
            //       mode: 'cors',
            //     }

            //     const response = await fetch(`${host}/home`, options)
            //     let data =  await response.json()
            //     console.log(data)
            //     // let postArray = data.map(post => post.posts.title)
                
            //     // setAllPosts(postArray)
            //   } catch (err) {
            //     console.log(err)
            //   }    

            let data = dummyData.map(post=>{
                // console.log(post.posts.reviews[0].punctuality)
                let rev = post.posts.reviews
                console.log(rev[0])
                for (let i=0;i<rev.length;i++){
                    return rev[0]["transparency"]
                }
                // return post.posts.reviews.map(ele=>ele)
            })
            setAllPosts(data)
            
        }

        getAllPosts()
    }, [])

    return (
        <div>
            Rating : {allPosts}
        </div>
    )
}

export default DispayRating
