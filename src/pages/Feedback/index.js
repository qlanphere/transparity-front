import React, { useState, useContext, useEffect } from "react";
import { useAuthContext } from "../../contexts/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Feedback.css";
import { usePostContext } from '../../contexts/postContext';
import axios from 'axios';
// const host = 'https://transparity.herokuapp.com'
const host = 'http://localhost:5000'
const cors = require('cors')

const Feedback = () => {

  const { postId } = usePostContext()
  console.log(postId)

  const { currentUser } = useAuthContext()
  const charity_id = currentUser.sub.id
  const [formData, setFormData] = useState({
    rating: {
      transparency: "2",
      punctuality: "4",
      comeback: "1",
    },
    description: ""
  });
  const [TRating, setTrating] = useState(2);
  const [PRating, setPrating] = useState(4);
  const [CRating, setCrating] = useState(1);
  const [description, setDescription] = useState("")

  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    console.log('pressed yet?' + pressed)
    if (pressed == true) {
      console.log('inside use effect' + formData)
      const sendFeedback = async () => {
        // return new Promise(async (resolve, reject) => {
        try {
          const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            mode: 'cors',
            body: JSON.stringify(formData)
          }
          console.log(formData)
          console.log(charity_id)

          await fetch(`${host}/feedback/${postId}`, options)
          setPressed(false)
        } catch (err) {
          console.log(err)
        }
      }
      sendFeedback()
    }
  }, [formData])


  async function handleSubmit(e) {
    console.log(formData)
    e.preventDefault();
    // setFormData({TRating,PRating,CRating},desciption)
    setFormData({
      ...formData, rating: {
        transparency: TRating,
        punctuality: PRating,
        comeback: CRating
      },
      description: description,
    })
    console.log(formData)
  }

  function handleChange(e) {
    setDescription(e.target.value)
  }
  console.log("before" ,formData)
  



  return (
    <div>
      <h1>Feedback form</h1><h4>Please select the rating for each areas.</h4>
      {/* <h3> transparency rating is {TRating}</h3>
      <h3   > punctuality rating is {PRating}</h3>
      <h3> Comeback rating is {CRating}</h3> */}

      <form method="PATCH" class="rating-form" onSubmit={(e) => { sendFeedback(e) }}>
        <div className="mt-5 card">
          <p >
            1.  Did you receive an email from the charity to tell you how your
            donation was used?
          </p>
          <div className="d-flex justify-content-center">
            <label htmlFor="super-happy">
              <input
                type="radio"
                name="transparecyRating"
                class="super-happy"
                id="super-happy"
                value="5"
                checked={TRating == 5}
                onChange={(e) => { setTrating(e.target.value) }}
              />

              <svg viewBox="0 0 24 24">
                <path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
            </label>

            <label htmlFor="happy">
              <input
                type="radio"
                name="transparecyRating"
                class="happy"
                id="happy"
                value="4"
                checked={TRating == 4}
                onChange={(e) => { setTrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
              </svg>
            </label>

            <label htmlFor="neutral">
              <input
                type="radio"
                name="transparecyRating"
                class="neutral"
                id="neutral"
                value="3"
                checked={TRating == 3}
                onChange={(e) => { setTrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M9,14H15A1,1 0 0,1 16,15A1,1 0 0,1 15,16H9A1,1 0 0,1 8,15A1,1 0 0,1 9,14Z" />
              </svg>
            </label>

            <label htmlFor="sad">
              <input type="radio"
                name="transparecyRating"
                class="sad"
                id="sad"
                value="2"
                checked={TRating == 2}
                onChange={(e) => { setTrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" />
              </svg>
            </label>

            <label htmlFor="super-sad">
              <input
                type="radio"
                name="transparecyRating"
                class="super-sad"
                id="super-sad"
                value="1"
                checked={TRating == 1}
                onChange={(e) => { setTrating(e.target.value) }}
              />
              <svg viewBox="0 0 24 24">
                <path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,8.82L14.06,7.76L13,8.82L14.06,9.88L13,10.94L14.06,12L15.12,10.94L16.18,12L17.24,10.94L16.18,9.88L17.24,8.82L16.18,7.76M7.82,12L8.88,10.94L9.94,12L11,10.94L9.94,9.88L11,8.82L9.94,7.76L8.88,8.82L7.82,7.76L6.76,8.82L7.82,9.88L6.76,10.94L7.82,12M12,14C9.67,14 7.69,15.46 6.89,17.5H17.11C16.31,15.46 14.33,14 12,14Z" />
              </svg>
            </label>
          </div>
        </div>
        {/* Second question */}
        <div className="mt-5 card">
          <p >
            2. Does the charity always inform you back about your donations?
          </p>
          <div className="d-flex justify-content-center">
            <label htmlFor="super-happy1">
              <input
                type="radio"
                name="punctualityRating"
                class="super-happy"
                id="super-happy1"
                value="5"
                checked={PRating == 5}
                onChange={(e) => { setPrating(e.target.value) }}
              />
              <svg viewBox="0 0 24 24">
                <path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
            </label>

            <label htmlFor="happy1">
              <input
                type="radio"
                name="punctualityRating"
                class="happy"
                id="happy1"
                value="4"
                checked={PRating == 4}
                onChange={(e) => { setPrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
              </svg>
            </label>

            <label htmlFor="neutral1">
              <input
                type="radio"
                name="punctualityRating"
                class="neutral"
                id="neutral1"
                value="3"
                checked={PRating == 3}
                onChange={(e) => { setPrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M9,14H15A1,1 0 0,1 16,15A1,1 0 0,1 15,16H9A1,1 0 0,1 8,15A1,1 0 0,1 9,14Z" />
              </svg>
            </label>

            <label htmlFor="sad1">
              <input type="radio"
                name="punctualityRating"
                class="sad"
                id="sad1"
                value="2"
                checked={PRating == 2}
                onChange={(e) => { setPrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" />
              </svg>
            </label>

            <label htmlFor="super-sad1">
              <input
                type="radio"
                name="punctualityRating"
                class="super-sad"
                id="super-sad1"
                value="1"
                checked={PRating == 1}
                onChange={(e) => { setPrating(e.target.value) }}
              />
              <svg viewBox="0 0 24 24">
                <path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,8.82L14.06,7.76L13,8.82L14.06,9.88L13,10.94L14.06,12L15.12,10.94L16.18,12L17.24,10.94L16.18,9.88L17.24,8.82L16.18,7.76M7.82,12L8.88,10.94L9.94,12L11,10.94L9.94,9.88L11,8.82L9.94,7.76L8.88,8.82L7.82,7.76L6.76,8.82L7.82,9.88L6.76,10.94L7.82,12M12,14C9.67,14 7.69,15.46 6.89,17.5H17.11C16.31,15.46 14.33,14 12,14Z" />
              </svg>
            </label>
          </div>
        </div>

        {/* Third Question */}
        <div className="mt-5 card">
          <p>
            3. How do you feel about donating back to this charity?
          </p>
          <div className="d-flex justify-content-center">
            <label htmlFor="super-happy2">
              <input
                type="radio"
                name="comebackRating"
                class="super-happy"
                id="super-happy2"
                value="5"
                checked={CRating == 5}
                onChange={(e) => { setCrating(e.target.value) }}
              />
              <svg viewBox="0 0 24 24">
                <path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
            </label>

            <label htmlFor="happy2">
              <input
                type="radio"
                name="comebackRating"
                class="happy"
                id="happy2"
                value="4"
                checked={CRating == 4}
                onChange={(e) => { setCrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
              </svg>
            </label>

            <label htmlFor="neutral2">
              <input
                type="radio"
                name="comebackRating"
                class="neutral"
                id="neutral2"
                value="3"
                checked={CRating == 3}
                onChange={(e) => { setCrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M9,14H15A1,1 0 0,1 16,15A1,1 0 0,1 15,16H9A1,1 0 0,1 8,15A1,1 0 0,1 9,14Z" />
              </svg>
            </label>

            <label htmlFor="sad2">
              <input type="radio"
                name="comebackRating"
                class="sad"
                id="sad2"
                value="2"
                checked={CRating == 2}
                onChange={(e) => { setCrating(e.target.value) }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" />
              </svg>
            </label>

            <label htmlFor="super-sad2">
              <input
                type="radio"
                name="comebackRating"
                class="super-sad"
                id="super-sad2"
                value="1"
                checked={CRating == 1}
                onChange={(e) => { setCrating(e.target.value) }}
              />
              <svg viewBox="0 0 24 24">
                <path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,8.82L14.06,7.76L13,8.82L14.06,9.88L13,10.94L14.06,12L15.12,10.94L16.18,12L17.24,10.94L16.18,9.88L17.24,8.82L16.18,7.76M7.82,12L8.88,10.94L9.94,12L11,10.94L9.94,9.88L11,8.82L9.94,7.76L8.88,8.82L7.82,7.76L6.76,8.82L7.82,9.88L6.76,10.94L7.82,12M12,14C9.67,14 7.69,15.46 6.89,17.5H17.11C16.31,15.46 14.33,14 12,14Z" />
              </svg>
            </label>
          </div>
        </div>
        <div className="mt-5 card">
          <label>Do you like to add more to the feedback:</label>
          <textarea id="text-area" name="textarea" rows="5" value={description} onChange={handleChange} /><br />
        </div >
        <input className="mt-3" type="submit" value="Submit Feedback" onClick={() => { setPressed(true) }} />
      </form >
    </div >
  );
};

export default Feedback;




{/* <form onSubmit={handleSubmit} aria-label="feedback">
        <div className="m-5 areas">
          <div className="area1">
          <label>
            Did you receive an email from the charity to tell you how your
            donation was used?</label><br/>
            <div className="radio-btn-cont">
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 1}
                    />
                     1
                </div>  
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 2}
                    />
                     2
                </div>  
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 3}
                    />
                     3
                </div> 
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 4}
                    />
                     4
                </div>  
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 5}
                    />
                     5
                </div>   
          </div>
        </div>
      
          
        </div>
      </form> */}
