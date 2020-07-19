import React, {useState, useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate"
import CommentList from "./CommentList"

function PostList() {
    const [posts, setPosts] = useState({}); // the data type is fetched as json object since we see them in the post express routes

    const fetchPost = async () => {
        const res = await axios.get("http://localhost:4000/posts");
        setPosts(res.data)
    }

    useEffect(()=>{
        fetchPost();
    },[]) // the empty square rbracket is used in order for the app to only run the fetchPost one time

    // Objects.value convert the json parsed in to an array of certain objects
    // From this array, we mapp out each element to certain component in the array
    const renderPosts = Object.values(posts).map(post => {
        return (
            <div
            className = "card"
            style={{width: "30%", marginBottom: "20px"}}
            key={post.id}
            >
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentCreate postId={post.id} /> 
                {/* This create the comment section and pased in the post id from maping components, use props for this */}
                <CommentList postId={post.id}/>
            </div>
            </div>
        )
    }) 

    // then we call the function above in the one as render Posts
    return(
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts}
        </div>
    )
}

export default PostList;