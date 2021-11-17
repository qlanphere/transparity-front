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
      <button className="edit-post-button" variant="primary" onClick={() => setModalShow(true)}>
        ...
      </button>
      <Edit show={modalShow}
        onHide={() => setModalShow(false)} postId={props.postId} notify={() => toast.success('Succesfully Edited')} />
    </>
  )
}

export default EditButton