import React, { useState, useContext } from 'react'

const PostContext = React.createContext();
export function PostProvider({ children }) {
    const [postId, setPostId] = useState("");
    const [emailP, setEmailP] = useState("")


    return (
        <PostContext.Provider value={{ postId, setPostId, emailP, setEmailP }}>
            {children}
        </PostContext.Provider>

    )
}
export function usePostContext() {
    return useContext(PostContext)
}
