
import React, { useContext, useState, useEffect } from 'react'
import './Rating.css'
const host = 'https://transparity.herokuapp.com'

const DispayRating = (props) => {
  const [rating, setRating] = useState(0)
  const [punctualityRating, setPunctualityRating] = useState(0)
  const [returningRating, setReturningRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [allPosts, setAllPosts] = useState(0)
  let charity_id = props.charity
  // console.log(charity_id)
  // let charity_id = 'bicccharity'
  useEffect(() => {

    const getAllPosts = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          mode: 'cors',
        }

        const response = await fetch(`${host}/charity/${charity_id}`, options)
        let data = await response.json()
        console.log(data)
        // if all the charities are in data
        // let postArray = data.map(post => post.posts.map(ele=>ele.reviews.map(rd=>rd.rating.transparency)))
        let postLength = data.posts.length
        console.log("data length", postLength)

        if (postLength != 0) {
          setAllPosts(postLength)
          console.log("inside first if")
          //gives an array of all the transparency scores for all the reviews
          let postArray = data.posts.map(post => post.reviews.map(ele => ele.rating.transparency))
          //gives an array of all the punctuality scores for all the reviews
          let punctualArray = data.posts.map(post => post.reviews.map(ele => ele.rating.punctuality))
          //gives an array of all the retention scores for all the reviews
          let returnArray = data.posts.map(post => post.reviews.map(ele => ele.rating.comeback))

          //returning the array of how many reviws in the post
          let reviewLength = data.posts.map(post => post.reviews.length)
          console.log("review length:", reviewLength)

          //calculates the reduced sum of the all the transparency array
          let reducedTrans = postArray.map(x => {
            if (x.length > 0) {
              return x.reduce((a, b) => parseInt(a) + parseInt(b))
            }
            else return 0
          })

          //calculates the reduced sum of the all the punctuality array
          let reducedPunc = punctualArray.map(x => {
            if (x.length > 0) {
              return x.reduce((a, b) => parseInt(a) + parseInt(b))
            }
            else return 0
          })

          //calculates the reduced sum of the all the retention array
          let reducedReturn = returnArray.map(x => {
            if (x.length > 0) {
              return x.reduce((a, b) => parseInt(a) + parseInt(b))
            }
            else return 0
          })

          console.log("transparency", reducedTrans)
          console.log("punctual", punctualArray)
          console.log("return ", returnArray)
          // setTotalReviews(reviewLength.length)
          //calculates the average in all the 3 areas
          if (reviewLength !== 0 && postArray.length != 0 && punctualArray.length != 0 && returnArray.length != 0) {
            //transparency
            let sum = reducedTrans.reduce((a, b) => parseInt(a) + parseInt(b))
            setRating(Math.round(parseInt(sum) / reviewLength.length).toFixed(1))
            //punctuality
            let sumP = reducedPunc.reduce((a, b) => parseInt(a) + parseInt(b))
            setPunctualityRating(Math.round(parseInt(sumP) / reviewLength.length).toFixed(1))
            //Retention
            let sumR = reducedReturn.reduce((a, b) => parseInt(a) + parseInt(b))
            setReturningRating(Math.round(parseInt(sumR) / reviewLength.length).toFixed(1))

            if (sum + sumP + sumR == 0) {
              setTotalReviews(0)

            }
            else setTotalReviews(reviewLength.length)
          }


        }
        else {
          setAllPosts(0)
          setTotalReviews(0)
        }






      } catch (err) {
        console.log(err)
      }


    }

    getAllPosts()
  }, [allPosts])

  return (
    <div>
      <h6>{totalReviews} Reviews</h6>
      {totalReviews !== 0 && <div className="review-container"><p>Transparency <span className="green">{rating}/5</span> </p><p>Punctuality <span className="green">{punctualityRating}/5</span> </p><p>Retention <span className="green">{returningRating}/5</span> </p></div>}
    </div>
  )
}

export default DispayRating
