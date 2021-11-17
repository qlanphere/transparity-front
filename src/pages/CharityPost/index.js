import React, { useContext, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuthContext } from "../../contexts/auth";
import './CharityPost.css'
const host = 'https://transparity.herokuapp.com'
const cors = require('cors')

const CharityPost = () => {
    const { currentUser } = useAuthContext()
    const charity_name = currentUser.sub.name
    const charity_id = currentUser.sub.id
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goal: "",
        img: "",
        target_date: ""
    })
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImg = async e => {
        const file = e.target.files[0];
        console.log(file)
        const base64 = await convertToBase64(file);
        setFormData(data => ({ ...data, "img": base64 }))
    }

    const handleChange = e => setFormData(data => ({ ...data, [e.target.name]: e.target.value }))
    console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault()
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
            await fetch(`${host}/charity/post/${charity_id}`, options)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <div id="heading" className="register-title">
                <h2 className="text-muted"> Please fill in form below to add a new post</h2>
                <h3> {currentUser.sub.name}</h3>
            </div>
            <form encType="multipart/form-data" className="register-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-fields-container d-flex flex-column justify-content-start align-center">
                    <div className="form-block">
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-block">
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="form-block">
                        <label>Goal:</label>
                        <input type="text" name="goal" value={formData.goal} onChange={handleChange} />
                    </div>
                    <div className="form-block">
                        <label>Target Date:</label>
                        <input type="date" name="target_date" value={formData.target_date} onChange={handleChange} />
                    </div>
                    <div className="form-block">
                        <label className="space">Upload Image:</label>
                        <input className="custom-file-input" type="file" name="img" id="img" onChange={handleImg} />
                        {/* <input type="text" name="img" id="img" value={formData.img} onChange={handleChange}/> */}
                    </div>
                    <div className="form-button">
                        <input className="submit-button btn btn-secondary" type="submit" value="Submit" />
                    </div>

                </div>
            </form>

        </div>
    )
}

export default CharityPost
