
import React, { useContext, useState, useEffect } from 'react'
import './Rating.css'
const host = 'https://transparity.herokuapp.com'
// const host = 'http://localhost:5000'

const DispayRating = (props) => {
    const [rating,setRating] = useState(0)
    const [punctualityRating,setPunctualityRating] = useState(0)
    const [returningRating,setReturningRating] = useState(0)
    const [totalReviews,setTotalReviews] = useState(0)
    const [allPosts,setAllPosts] = useState(0)
    // const [stars,setStars] = useState("")
    //let dataLength = dummyData.length
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
                let data =  await response.json()
                console.log(data)
                // if all the charities are in data
                    // let postArray = data.map(post => post.posts.map(ele=>ele.reviews.map(rd=>rd.rating.transparency)))
                    let postLength = data.posts.length
                    console.log("data length" , postLength)
                  
                    if (postLength !=0){
                      setAllPosts(postLength)
                      console.log("inside first if")
                      //gives an array of all the transparency scores for all the reviews
                        let postArray = data.posts.map(post=>post.reviews.map(ele=>ele.rating.transparency))
                       //gives an array of all the punctuality scores for all the reviews
                        let punctualArray = data.posts.map(post=>post.reviews.map(ele=>ele.rating.punctuality))
                         //gives an array of all the retention scores for all the reviews
                        let returnArray = data.posts.map(post=>post.reviews.map(ele=>ele.rating.comeback))

                        //returning the array of how many reviws in the post
                        let reviewLength = data.posts.map(post=>post.reviews.length)
                        console.log("review length:" , reviewLength)

                        //calculates the reduced sum of the all the transparency array
                        let reducedTrans = postArray.map(x=>{
                          if (x.length>0){
                            return x.reduce((a,b)=>parseInt(a)+parseInt(b))
                          }
                          else return 0
                        })

                        //calculates the reduced sum of the all the punctuality array
                        let reducedPunc = punctualArray.map(x=>{
                          if (x.length>0){
                            return x.reduce((a,b)=>parseInt(a)+parseInt(b))
                          }
                          else return 0
                        })

                        //calculates the reduced sum of the all the retention array
                        let reducedReturn = returnArray.map(x=>{
                          if (x.length>0){
                            return x.reduce((a,b)=>parseInt(a)+parseInt(b))
                          }
                          else return 0
                        })

                        console.log("transparency" , reducedTrans)
                        console.log("punctual" , punctualArray)
                        console.log("return " , returnArray)
                        // setTotalReviews(reviewLength.length)
                        //calculates the average in all the 3 areas
                        if (reviewLength !==0 && postArray.length != 0 && punctualArray.length != 0 && returnArray.length!=0){
                            //transparency
                            let sum = reducedTrans.reduce((a,b)=> parseInt(a)+parseInt(b))
                            setRating(Math.round(parseInt(sum)/reviewLength.length).toFixed(1))  
                            //punctuality
                            let sumP = reducedPunc.reduce((a,b)=>parseInt(a)+parseInt(b))
                            setPunctualityRating(Math.round(parseInt(sumP)/reviewLength.length).toFixed(1))  
                            //Retention
                            let sumR = reducedReturn.reduce((a,b)=>parseInt(a)+parseInt(b))
                            setReturningRating(Math.round(parseInt(sumR)/reviewLength.length).toFixed(1)) 

                            if (sum + sumP + sumR == 0){
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
            
            // //Calculate transparency rating
            // let data = dummyData.map(post=>{
            //     let rev = post.posts.reviews[0].rating.transparency
            //     return rev
            // })

            // if (data.length !=0){
            //     // console.log(data)
            //     let sum = data.reduce((a,b)=>parseInt(a)+parseInt(b))
            //     setRating(Math.round(sum/dataLength).toFixed(1))  
            //     // console.log(rating)
            // }

            // //Calculate punctuality rating
            // let punctualityData = dummyData.map(post=>{
            //     let puncRev = post.posts.reviews[0].rating.punctuality
            //     // console.log(puncRev)
            //     return puncRev
            // })

            // if (punctualityData.length !=0){
            //     // console.log(data)
            //     let psum = punctualityData.reduce((a,b)=>parseInt(a)+parseInt(b))
            //     setPunctualityRating(Math.round(psum/dataLength).toFixed(1))  
            //     // console.log(rating)
            // }

            // //Calculate returning-customer rating
            // let returningData = dummyData.map(post=>{
            //     let returnRev = post.posts.reviews[0].rating.comeback
            //     return returnRev
            // })

            // if (returningData.length !=0){
            //     // console.log(data)
            //     let sum = returningData.reduce((a,b)=>parseInt(a)+parseInt(b))
            //     setReturningRating(Math.round(sum/dataLength).toFixed(1))  
            //     // console.log(rating)
            // }
            // console.log(dataLength)
         
                // switch(rating){
                //     case 1:
                //         setStars('*')
                //         break;
                //     case 2:
                //         setStars('* *')
                //         break;
                //     case 3:
                //         setStars('* * *')
                //         break;
                //     case 4:
                //         setStars('* * * *')
                //         break;
                //     case 5:
                //         setStars('* * * * * ')
                //         break;
                    
                // }
                
            

            
            
        }

        getAllPosts()
    }, [allPosts])

    return (
        <div>
           <h6>{totalReviews} Reviews</h6>
           {/* <h2>{allPosts}</h2> */}
           {totalReviews !==0 && <div><p>Transparency: {rating}/5 </p><p>Punctuality: {punctualityRating}/5 </p><p>Retention: {returningRating}/5 </p></div>}
           
           
           
           
           

    
        </div>
    )
}

export default DispayRating
