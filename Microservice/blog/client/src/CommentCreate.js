import React, { useState } from "react";
import axios from "axios"

function CreateComment({postId}) { // the comment need to know the post id in order to render the right comments

    const [content, setContent] = useState("")

    function handleContent(event){
        const newValue = event.target.value;
        setContent(newValue)
    }

    const onSubmit = async (event) => {
        event.preventDefault(); // check the Post create to see why do this

        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        })

        setContent("")
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label> New Comment</label>
                    <input value={content} onChange={handleContent} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateComment;