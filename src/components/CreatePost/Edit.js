import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useAuthContext } from "../../contexts/auth";
import {usePostContext} from '../../contexts/postContext'
import './CharityPost.css'
import Button from 'react-bootstrap/Button'
const cors = require('cors')

const host = 'https://transparity.herokuapp.com'
// const host = 'http://localhost:5000'

const EditPost = (props) => {
    const { currentUser } = useAuthContext()
    const {posted, setPosted} = usePostContext()
    const [formData, setFormData] = useState({
        "description": '',
        "pdf": ''
    })
    const postId = props.postId

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

    const handleChange = e => setFormData(data => ({ ...data, [e.target.name]: e.target.value }))

    const handlePDF = async e => {
        const file = e.target.files[0];
        console.log(file)
        const base64 = await convertToBase64(file);
        setFormData(data => ({ ...data, "pdf": base64 }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(postId)
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
            await fetch(`${host}/post/${postId}`, options)
            setPosted(true)

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
             <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <div id="heading" className="register-title">
                {/* <h2 className="text-muted"> Please fill in form below to edit your post</h2> */}
                <h3> {props.name}</h3>
            </div>
            <form encType="multipart/form-data" className="register-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-fields-container d-flex flex-column justify-content-start align-center">
                    <div className="form-block">
                        <label>Description:</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="form-block">
                        <label className="space">Upload PDF:</label>
                        <input className="custom-file-input" type="file" name="pdf" id="img" onChange={handlePDF} />
                        {/* <input type="text" name="img" id="img" value={formData.img} onChange={handleChange}/> */}
                    </div>
                    <div className="form-button">
                        <input className="submit-button btn btn-secondary" type="submit" value="Submit" onClick={() => {props.onHide(); props.notify()}}/>
                    </div>
                </div>
            </form>

        </div>
        </Modal.Body>
      </Modal>
        </>
    )
}

export default EditPost;