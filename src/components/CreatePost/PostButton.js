import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import CreatePost from "./index"

const PostButton = () => {
  const [modalShow, setModalShow] = useState(false);
    return (
        <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Create Post
      </Button>
      <CreatePost show={modalShow}
        onHide={() => setModalShow(false)}></CreatePost>
        </>
    )
}

export default PostButton
