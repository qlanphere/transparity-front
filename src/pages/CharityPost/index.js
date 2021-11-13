import React,{useContext,useState} from 'react'

const index = () => {
    

    return (
        <div>
            <div id="heading">
                <h1> Please fill in the below form to add a new post</h1>
                <h2>Charity Name</h2>
            </div>
            <form>
                <label>Title</label>
                <input type="text" value={title}/>
                <label>Description</label>
                <textarea name="desc" value={description}/>
                <input type=""></input>
            </form>
        </div>
    )
}

export default index
