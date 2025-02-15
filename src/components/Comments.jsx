import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments } from "../features/comments";


const Comments = ({ postId }) => {
    const dispatch = useDispatch();
    const { comments, status, error } = useSelector((state) => state.comments); 

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchComments(postId));
        }
    }, [status, dispatch, postId]);

    if (status === 'loading') return <p>Cargando...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <>
            {comments.map((comment) => {
                return (
                    <div key={comment.data.id}>
                        <p>{comment.data.author}</p>
                        <p>{comment.data.body}</p>
                    </div>
                );
            })}
        </>
    );
};

export default Comments;
