import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useAuthContext } from "../../contexts/auth";
import './CreateBio.css'
import { usePostContext } from '../../contexts/postContext';
import Form from 'react-bootstrap/Form'
const cors = require('cors')

const host = 'https://transparity.herokuapp.com'

function CreateBio(props) {
    const { currentUser } = useAuthContext()
    const charity_name = currentUser.sub.name
    const charity_id = currentUser.sub.id
    const {updatedBio, setUpdatedBio} = usePostContext()
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        img: ""
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
            let data = await fetch(`${host}/update/charity/${charity_id}`, options)
            if (data.ok === true){
                setUpdatedBio(true)
                props.onHide(); props.notify()
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
            Create Bio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <div id="heading" className="register-title">
                <h2 className="text-muted"> Please fill in form below to create a bio</h2>
                <h3> {currentUser.sub.name}</h3>
            </div>
            <Form noValidate validated={validated} encType="multipart/form-data" className="register-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-fields-container d-flex flex-column justify-content-start align-center">
                    <Form.Group className="form-block">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="form-block">
                        <Form.Label className="space">Upload Image:</Form.Label>
                        <Form.Control className="custom-file-input" type="file" name="img" id="img" onChange={handleImg} />
                        {/* <input type="text" name="img" id="img" value={formData.img} onChange={handleChange}/> */}
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

export default CreateBio