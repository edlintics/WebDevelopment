import React, {useState} from "react";
import axios from "axios";



function PostCreate() {
    const [title, setTitle] = useState("");

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    const onSubmit = async function (event) { // return a promise, this have to be wait in order to do other things
        event.preventDefault(); // prevent fron the action of Submit, the form will reload the hall page

        await axios.post('http://localhost:4000/posts', {
            title
        }) // we have to wait for the promise to be submitted to server, in this case is the post data from user
        // create post request to them and send the conent of title

        setTitle("") // set the input back to empty
    }
 

    return (
    <div>
    <form onSubmit={onSubmit}>
        <div className = "form-group">
            <label> Title</label>
            <input value={title} onChange={handleTitleChange} className="form-control"></input>
        </div>
        <button className="btn btn-primary">Submit</button>
    </form>
    </div>
    )
}

export default PostCreate;