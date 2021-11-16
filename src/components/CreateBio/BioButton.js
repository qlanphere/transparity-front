import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import CreateBio from "./index"

const BioButton = () => {
  const [modalShow, setModalShow] = useState(false);
    return (
        <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Edit Bio
      </Button>
      <CreateBio show={modalShow}
        onHide={() => setModalShow(false)}></CreateBio>
        </>
    )
}

export default BioButton
