import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import CreateBio from "./index"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BioButton = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button className="bio-button" variant="primary" onClick={() => setModalShow(true)}>
        Edit Bio
      </Button>
      <CreateBio show={modalShow}
        onHide={() => setModalShow(false)} notify={() => toast.success('Succesfully posted')}></CreateBio>
      <ToastContainer />
    </>
  )
}

export default BioButton
