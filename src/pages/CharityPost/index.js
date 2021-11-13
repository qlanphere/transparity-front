import React,{useContext,useState} from 'react'
import axios from 'axios';
import {Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuthContext } from "../../contexts/auth";
const host = 'https://transparity.herokuapp.com'
const cors = require('cors')



const CharityPost = () => {
    const {currentUser} = useAuthContext()
    const charity_name = currentUser.sub.name
    const charity_id = currentUser.sub.id
    console.log("charity_id" , charity_id)
    const [formData,setFormData] = useState({
        title:"",
        description:"",
        goal:"",
        img:"",
        target_date:""
    })

    const handleChange = e => setFormData(data => ({ ...data, [e.target.name]: e.target.value }))
    console.log(formData)
    const handleSubmit = (formData, charity_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"},
                    mode: 'cors'
                }
                console.log(formData)
                const { data } = await axios.patch(`${host}/charity/${charity_id}`, formData, options)
                if (data.err){
                    throw Error(data.err)
                }
                resolve('New post successfuly created!')
            } catch (err) {
                reject(`Error while creating a new post ${err}`);
            }
        })
    }

    
    return (
        <div>
            
            <div id="heading" className="register-title">
                <h2 className="text-muted"> Please fill in the below form to add a new post</h2>
                <h3> {currentUser.sub.name}</h3>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
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
                <input type="file" name="img" value={formData.img} onChange={handleChange}/>
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
