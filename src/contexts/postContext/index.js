import React, { useState, useContext } from 'react'

const PostContext = React.createContext();
export function PostProvider({ children }) {
    const [postId, setPostId] = useState("");
    const [emailP, setEmailP] = useState("");
    const [posted, setPosted] = useState(false)
    const [updatedBio, setUpdatedBio] = useState(false)

    return (
        <PostContext.Provider value={{ postId, setPostId, emailP, setEmailP, posted, setPosted, setUpdatedBio, updatedBio }}>
            {children}
        </PostContext.Provider>

    )
}
export function usePostContext() {
    return useContext(PostContext)
}
