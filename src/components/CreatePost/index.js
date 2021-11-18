import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useAuthContext } from "../../contexts/auth";
import './CharityPost.css'
import { usePostContext } from '../../contexts/postContext';
import Form from 'react-bootstrap/Form'
const cors = require('cors')

const host = 'https://transparity.herokuapp.com'

function CreatePost(props) {
    const { currentUser } = useAuthContext()
    const {posted, setPosted} = usePostContext()
    const charity_name = currentUser.sub.name
    const charity_id = currentUser.sub.id
    const [validated, setValidated] = useState(false);
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
    const submit = async (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        try {
            e.preventDefault()
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
            let data = await fetch(`${host}/charity/post/${charity_id}`, options)
            if (data.ok === true){
                setPosted(true)
                props.onHide(); props.notify()
                setFormData({
                    title: "",
                    description: "",
                    goal: "",
                    img: "",
                    target_date: ""
                })
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <div id="heading" className="register-title">
                <h3>{currentUser.sub.name}</h3>
            </div>
            <Form noValidate validated={validated} encType="multipart/form-data" className="register-form" onSubmit={(e) => { submit(e)}}>
                <div className="form-fields-container d-flex flex-column justify-content-start align-center">
                    <Form.Group className="form-block">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required minLength="5"/>
                        <Form.Control.Feedback type="invalid">
                        Please enter a valid title.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-block">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required minLength="5"/>
                        <Form.Control.Feedback type="invalid">
                        Please enter a valid description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-block">
                        <Form.Label>Goal:</Form.Label>
                        <Form.Control type="text" name="goal" value={formData.goal} onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">
                        Please enter a valid goal.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-block">
                        <Form.Label>Target Date:</Form.Label>
                        <Form.Control type="date" name="target_date" value={formData.target_date} onChange={handleChange} required/>
                        <Form.Control.Feedback type="invalid">
                        Please enter a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-block">
                        <Form.Label className="space">Upload Image:</Form.Label>
                        <Form.Control className="custom-file-input" type="file" name="img" id="img" onChange={handleImg} required/>
                        <Form.Control.Feedback type="invalid">
                        Please upload a valid image.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="form-button">
                        <input className="submit-button btn btn-secondary" type="submit" value="Submit" />
                    </div>

                </div>
            </Form>

        </div>
        </Modal.Body>
      </Modal>
    );
  }

export default CreatePost