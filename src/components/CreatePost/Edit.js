import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useAuthContext } from "../../contexts/auth";
import {usePostContext} from '../../contexts/postContext'
import './CharityPost.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const cors = require('cors')

const host = 'https://transparity.herokuapp.com'

const EditPost = (props) => {
    const { currentUser } = useAuthContext()
    const {posted, setPosted} = usePostContext()
    const [validated, setValidated] = useState(false);
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
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                mode: 'cors'
            }
            await fetch(`${host}/delete/post/${postId}`, options)
            props.onHide(); 
        } catch (error) { 
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        e.preventDefault()
        setValidated(true)
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
            let data = await fetch(`${host}/post/${postId}`, options)
            if (data.ok === true) {
                props.onHide(); 
                props.notify();
                setPosted(true);
            }

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
            <Form encType="multipart/form-data" className="register-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-fields-container d-flex flex-column justify-content-start align-center">
                    <Form.Group className="form-block">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">
                        Both fields cannot be empty.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-block">
                        <Form.Label className="space">Upload PDF:</Form.Label>
                        <Form.Control className="custom-file-input" type="file" name="pdf" id="img" onChange={handlePDF} />
                    <Form.Control.Feedback type="invalid">
                        Both fields cannot be empty.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex">
                    <div className="form-button">
                        <input className="submit-button btn btn-secondary" type="submit" value="Submit" />
                    </div>
                    <div className="form-button">
                        <input className="submit-button btn btn-primary" type="button" value="Delete" onClick={handleDelete}/>
                    </div>
                    </div>
                </div>
            </Form>

        </div>
        </Modal.Body>
      </Modal>
        </>
    )
}

export default EditPost;