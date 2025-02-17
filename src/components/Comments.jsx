import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments } from "../features/comments";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import "../styles/comments.css";
import "../styles/subreddits.css";

const Comments = ({ postId }) => {
    const dispatch = useDispatch();
    const { comments, status, error } = useSelector((state) => state.comments);

    useEffect(() => {
        if (status === "idle" && postId) {
            dispatch(fetchComments(postId));
        }
    }, [status, dispatch, postId]);

    if (status === "loading") return <p>Cargando comentarios...</p>;
    if (status === "failed") return <p>Error: {error}</p>;
    if (!comments.length) return <p>No hay comentarios aún.</p>;

    return (
        <div className="comments">
            <h3>Comments</h3>
           
            {comments.map((comment) => {
                const createdUtc = comment.data?.created_utc; 
                const timeAgo = createdUtc
                    ? formatDistanceToNow(new Date(createdUtc * 1000), {
                          addSuffix: true,
                          locale: es,
                      })
                    : "Unknown date"; 

                return (
                    <div key={comment.data.id} className="comment">
                        <h6 >{comment.data.author} • <span>{timeAgo}</span></h6>
                        <p className="comment-txt">{comment.data.body}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Comments;
