import React,{useContext,useState} from 'react'
import axios from 'axios';
import {Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuthContext } from "../../contexts/auth";
const host = 'https://transparity.herokuapp.com'
// const host = 'http://localhost:5000'
const cors = require('cors')



const CharityPost = () => {
    const {currentUser} = useAuthContext()
    const charity_name = currentUser.sub.name
    const charity_id = currentUser.sub.id
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        goal:"",
        img:"",
        target_date:""
    })

    const handleChange = e => setFormData(data => ({ ...data, [e.target.name]: e.target.value }))
    console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault()
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
                await fetch(`${host}/charity/${charity_id}`, options)

            }catch (err) {
                console.log(err)
            }
    }

    
    return (
        <div>
            
            <div id="heading" className="register-title">
                <h2 className="text-muted"> Please fill in the below form to add a new post</h2>
                <h3> {currentUser.sub.name}</h3>
            </div>
            <form className="register-form" onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-fields-container d-flex flex-column justify-content-start align-center">
                <div className="p-2">
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                </div>
                <div className="p-2">
                <label>Description:</label>
                <textarea name="description"  value={formData.description} onChange={handleChange}/>
                </div>
                <div className="p-2">
                <label>Goal:</label>
                <input type="text" name="goal" value={formData.goal} onChange={handleChange}/>
                </div>
                <div className="p-2">
                <label>Target Date:</label>
                <input type="date" name="target_date" value={formData.target_date} onChange={handleChange}/>
                </div>
                <div className="p-2">
                <label>Upload Image:</label>
                <input type="text" name="img" value={formData.img} onChange={handleChange}/>
                </div>
                <div className="p-2">
                <input className="submit-button btn btn-secondary" type="submit" value="Submit"/>
                </div>

                </div>
            </form>
          
        </div>
    )
}

export default CharityPost
