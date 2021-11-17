import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Edit from "./Edit"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PostButton.css'

const EditButton = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button className="create-post-button" variant="primary" onClick={() => setModalShow(true)}>
        ...
      </Button>
      <Edit show={modalShow}
        onHide={() => setModalShow(false)} postId = {props.postId} notify = {() => toast.success('Succesfully Edited')}/>
    </>
  )
}

export default EditButton