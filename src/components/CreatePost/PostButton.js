import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import CreatePost from "./index"
import './PostButton.css'

const PostButton = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button className="create-post-button" variant="primary" onClick={() => setModalShow(true)}>
        Create Post
      </Button>
      <CreatePost show={modalShow}
        onHide={() => setModalShow(false)}></CreatePost>
    </>
  )
}

export default PostButton
