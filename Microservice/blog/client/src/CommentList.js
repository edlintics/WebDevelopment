import React, {useState, useEffect}  from "react";
import axios from "axios";

function CommentList({postId}) {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data)
    }

    useEffect(()=>{
        fetchData();
    }, [])

    const renderedComments = comments.map(comment => {
        return (
            <li key={comments.id}>
                {comment.content}
            </li>
        )
    })
    return(
        <div>
            {renderedComments}
        </div>
    )
}

export default CommentList;